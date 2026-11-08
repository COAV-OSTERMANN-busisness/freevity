import {
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";

function getFreightForm() {
  return cy.get('form[aria-busy="false"]');
}

function getOriginInput() {
  return getFreightForm()
    .find('input[type="text"]')
    .eq(0);
}

function getDestinationInput() {
  return getFreightForm()
    .find('input[type="text"]')
    .eq(1);
}

function getMainSelect(index: number) {
  return getFreightForm()
    .find("select:not([aria-label])")
    .eq(index);
}

function getUnidentifiedNumberInput(index: number) {
  return getFreightForm()
    .find('input[type="number"]:not([id])')
    .eq(index);
}

function replaceText(
  getElement: () => Cypress.Chainable<JQuery<HTMLElement>>,
  value: string,
): void {
  getElement().clear();
  getElement().type(value);
  getElement().should("have.value", value);
}

function replaceNumberById(
  selector: string,
  value: string,
): void {
  cy.get(selector).clear();
  cy.get(selector).type(value);
  cy.get(selector).should("have.value", value);
}

function mockGeocode(): void {
  cy.intercept("POST", "/api/geocode", (request) => {
    const body = request.body as {
      location?: string;
    };

    const location = body.location ?? "";

    if (
      location.includes("Tokyo") ||
      location.includes("Osaka") ||
      location.includes("Japan")
    ) {
      request.reply({
        statusCode: 200,
        body: {
          latitude: 35.6762,
          longitude: 139.6503,
          countryCode: "JP",
        },
      });

      return;
    }

    request.reply({
      statusCode: 200,
      body: {
        latitude: 34.0522,
        longitude: -118.2437,
        countryCode: "US",
      },
    });
  }).as("geocode");
}

function visitCalculatorInEnglish(): void {
  cy.visit("/calculator", {
    onBeforeLoad(win) {
      Object.defineProperty(win.navigator, "language", {
        configurable: true,
        value: "en-US",
      });

      Object.defineProperty(win.navigator, "languages", {
        configurable: true,
        value: ["en-US", "en"],
      });
    },
  });

  cy.contains("h2", "Freight calculator", {
    timeout: 10000,
  }).should("be.visible");

  cy.contains("Origin").should("be.visible");
  cy.contains("Destination").should("be.visible");

  getFreightForm()
    .should("be.visible")
    .and("have.attr", "aria-busy", "false");
}

Given("I access the maritime freight calculator", () => {
  mockGeocode();
  visitCalculatorInEnglish();
});

When(
  "I enter the maritime origin {string}",
  (origin: string) => {
    replaceText(getOriginInput, origin);
  },
);

When(
  "I enter the maritime destination {string}",
  (destination: string) => {
    replaceText(getDestinationInput, destination);
  },
);

When("I select maritime transport mode", () => {
  getMainSelect(0).select("maritime");
  getMainSelect(0).should("have.value", "maritime");
});

When(
  "I select maritime type {string}",
  (type: string) => {
    const value = type === "FCL" ? "fcl" : "lcl";

    getMainSelect(1).select(value);
    getMainSelect(1).should("have.value", value);
  },
);

When(
  "I enter the container quantity {string}",
  (quantity: string) => {
    getUnidentifiedNumberInput(1).clear();
    getUnidentifiedNumberInput(1).type(quantity);

    getUnidentifiedNumberInput(1)
      .should("have.value", quantity);
  },
);

When(
  "I enter the maritime quantity {string}",
  (quantity: string) => {
    getUnidentifiedNumberInput(0).clear();
    getUnidentifiedNumberInput(0).type(quantity);

    getUnidentifiedNumberInput(0)
      .should("have.value", quantity);
  },
);

When(
  "I enter the maritime weight {string}",
  (weight: string) => {
    replaceNumberById("#freight-weight", weight);
  },
);

When(
  "I enter the maritime length {string}",
  (length: string) => {
    replaceNumberById("#freight-length", length);
  },
);

When(
  "I enter the maritime width {string}",
  (width: string) => {
    replaceNumberById("#freight-width", width);
  },
);

When(
  "I enter the maritime height {string}",
  (height: string) => {
    replaceNumberById("#freight-height", height);
  },
);

When(
  "I select the maritime tariff basis {string}",
  (basis: string) => {
    const values: Record<string, string> = {
      Unit: "unit",
      Flat: "flat",
      Weight: "weight",
      Volume: "volume",
      "Weight or measurement (W/M)": "chargeableWeight",
    };

    const value = values[basis];

    if (!value) {
      throw new Error(
        `Unsupported maritime tariff basis "${basis}".`,
      );
    }

    getMainSelect(2).select(value);
    getMainSelect(2).should("have.value", value);
  },
);

When(
  "I enter the maritime tariff rate {string}",
  (rate: string) => {
    cy.contains("label", "Tariff rate")
      .find('input[type="number"]')
      .clear()
      .type(rate)
      .should("have.value", rate);
  },
);

When(
  "I enter the minimum freight {string}",
  (minimum: string) => {
    cy.contains("label", "Minimum freight")
      .find('input[type="number"]')
      .clear()
      .type(minimum)
      .should("have.value", minimum);
  },
);

When(
  "I add the maritime charge {string} with amount {string}",
  (label: string, amount: string) => {
    getFreightForm()
      .find('input[type="text"]')
      .last()
      .clear()
      .type(label)
      .should("have.value", label);

    getFreightForm()
      .find('input[type="text"]')
      .last()
      .closest("div")
      .find('button[type="button"]')
      .should("be.enabled")
      .click();

    getFreightForm()
      .find(`input[type="number"][aria-label^="${label} - "]`)
      .should("be.visible")
      .should("have.value", "0")
      .type(`{selectall}${amount}`)
      .should("have.value", amount);
  },
);

When("I calculate the maritime freight", () => {
  getFreightForm()
    .find('button[type="submit"]')
    .should("be.visible")
    .and("be.enabled")
    .click();

  cy.wait("@geocode");
  cy.wait("@geocode");

  cy.get('[aria-label="Freight simulation result"]', {
    timeout: 10000,
  }).should("be.visible");
});

Then(
  "the maritime estimated freight should be {string}",
  (expected: string) => {
    cy.get('[aria-label="Freight simulation result"]')
      .should("contain.text", expected);
  },
);

Then(
  "the maritime base freight should be {string}",
  (expected: string) => {
    cy.get('[aria-label="Freight simulation result"]')
      .should("contain.text", expected);
  },
);

Then(
  "the maritime operation should be {string}",
  (operation: string) => {
    cy.get('[aria-label="Freight simulation result"]')
      .should("contain.text", operation);
  },
);