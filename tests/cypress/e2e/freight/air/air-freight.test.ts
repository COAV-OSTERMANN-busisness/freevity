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

    if (location.includes("Japan")) {
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

    if (
      location.includes("USA") ||
      location.includes("United States")
    ) {
      request.reply({
        statusCode: 200,
        body: {
          latitude: 34.0522,
          longitude: -118.2437,
          countryCode: "US",
        },
      });

      return;
    }

    request.reply({
      statusCode: 200,
      body: {
        latitude: -23.5505,
        longitude: -46.6333,
        countryCode: "BR",
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

Given("I access the air freight calculator", () => {
  mockGeocode();
  visitCalculatorInEnglish();
});

When("I enter the air origin {string}", (origin: string) => {
  replaceText(getOriginInput, origin);
});

When(
  "I enter the air destination {string}",
  (destination: string) => {
    replaceText(getDestinationInput, destination);
  },
);

When("I select air transport mode", () => {
  getMainSelect(0).select("air");
  getMainSelect(0).should("have.value", "air");
});

When("I enter the air quantity {string}", (quantity: string) => {
  getUnidentifiedNumberInput(0).clear();
  getUnidentifiedNumberInput(0).type(quantity);

  getUnidentifiedNumberInput(0)
    .should("have.value", quantity);
});

When("I enter the air weight {string}", (weight: string) => {
  replaceNumberById("#freight-weight", weight);
});

When("I enter the air length {string}", (length: string) => {
  replaceNumberById("#freight-length", length);
});

When("I enter the air width {string}", (width: string) => {
  replaceNumberById("#freight-width", width);
});

When("I enter the air height {string}", (height: string) => {
  replaceNumberById("#freight-height", height);
});

When(
  "I enter the volumetric divisor {string}",
  (divisor: string) => {
    getUnidentifiedNumberInput(1).clear();
    getUnidentifiedNumberInput(1).type(divisor);

    getUnidentifiedNumberInput(1)
      .should("have.value", divisor);
  },
);

When(
  "I select the air tariff basis {string}",
  (basis: string) => {
    const values: Record<string, string> = {
      "Chargeable weight": "chargeableWeight",
      Weight: "weight",
      Flat: "flat",
    };

    const value = values[basis];

    if (!value) {
      throw new Error(
        `Unsupported air tariff basis "${basis}".`,
      );
    }

    getMainSelect(1).select(value);
    getMainSelect(1).should("have.value", value);
  },
);

When(
  "I enter the air tariff rate {string}",
  (rate: string) => {
    getUnidentifiedNumberInput(2).clear();
    getUnidentifiedNumberInput(2).type(rate);

    getUnidentifiedNumberInput(2)
      .should("have.value", rate);
  },
);

When("I calculate the air freight", () => {
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
  "the air estimated freight should be {string}",
  (expected: string) => {
    cy.get('[aria-label="Freight simulation result"]')
      .should("contain.text", expected);
  },
);

Then(
  "the air base freight should be {string}",
  (expected: string) => {
    cy.get('[aria-label="Freight simulation result"]')
      .should("contain.text", expected);
  },
);

Then(
  "the air operation should be {string}",
  (operation: string) => {
    cy.get('[aria-label="Freight simulation result"]')
      .should("contain.text", operation);
  },
);