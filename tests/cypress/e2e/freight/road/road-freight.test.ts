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

function replaceNumberById(selector: string, value: string): void {
  cy.get(selector).clear();

  cy.get(selector).type(value);

  cy.get(selector).should("have.value", value);
}

Given("I access the freight calculator", () => {
  cy.intercept("POST", "/api/road-distance", (request) => {
    request.reply({
      statusCode: 200,
      body: {
        distanceKm: 100,
        origin: {
          latitude: -23.5505,
          longitude: -46.6333,
          countryCode: "BR",
        },
        destination: {
          latitude: -22.9056,
          longitude: -47.0608,
          countryCode: "BR",
        },
      },
    });
  }).as("roadDistance");

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

  /*
   * Aguarda a aplicação cliente assumir o DOM.
   * O formulário deve existir e estar fora do estado de loading.
   */
  getFreightForm().should("be.visible");

  /*
   * O navegador Cypress é iniciado explicitamente em inglês.
   * A aplicação utiliza navigator.languages para determinar
   * o idioma inicial da interface.
   */
  cy.window().then((win) => {
    expect(win.navigator.language).to.eq("en-US");
    expect(win.navigator.languages).to.deep.eq(["en-US", "en"]);
  });

  /*
   * Não começa o teste enquanto a versão inglesa final
   * da interface não estiver efetivamente renderizada.
   */
  cy.contains("h2", "Freight calculator", {
    timeout: 10000,
  }).should("be.visible");

  cy.contains("Origin").should("be.visible");
  cy.contains("Destination").should("be.visible");

  getFreightForm()
    .should("be.visible")
    .and("have.attr", "aria-busy", "false");
});

When("I enter the origin {string}", (origin: string) => {
  replaceText(getOriginInput, origin);
});

When("I enter the destination {string}", (destination: string) => {
  replaceText(getDestinationInput, destination);
});

When("I select the transport mode {string}", () => {
  getMainSelect(0).select("road");

  getMainSelect(0).should("have.value", "road");
});

When("I enter the quantity {string}", (quantity: string) => {
  getUnidentifiedNumberInput(0).clear();

  getUnidentifiedNumberInput(0).type(quantity);

  getUnidentifiedNumberInput(0)
    .should("have.value", quantity);
});

When("I enter the weight {string}", (weight: string) => {
  replaceNumberById("#freight-weight", weight);
});

When("I enter the length {string}", (length: string) => {
  replaceNumberById("#freight-length", length);
});

When("I enter the width {string}", (width: string) => {
  replaceNumberById("#freight-width", width);
});

When("I enter the height {string}", (height: string) => {
  replaceNumberById("#freight-height", height);
});

When("I select the tariff basis {string}", (basis: string) => {
  const values: Record<string, string> = {
    Weight: "weight",
    Volume: "volume",
    Unit: "unit",
    Flat: "flat",
  };

  const value = values[basis];

  if (!value) {
    throw new Error(
      `Unsupported road tariff basis "${basis}".`,
    );
  }

  getMainSelect(1).select(value);

  getMainSelect(1).should("have.value", value);
});

When("I enter the tariff rate {string}", (rate: string) => {
  getUnidentifiedNumberInput(1).clear();

  getUnidentifiedNumberInput(1).type(rate);

  getUnidentifiedNumberInput(1)
    .should("have.value", rate);
});

When("I calculate the freight", () => {
  getFreightForm()
    .find('button[type="submit"]')
    .should("be.visible")
    .and("be.enabled")
    .click();

  cy.wait("@roadDistance")
    .its("response.statusCode")
    .should("eq", 200);

  cy.get('[aria-label="Freight simulation result"]', {
    timeout: 10000,
  }).should("be.visible");
});

Then(
  "the estimated freight should be {string}",
  (expected: string) => {
    cy.get('[aria-label="Freight simulation result"]')
      .should("contain.text", expected);
  },
);

Then(
  "the base freight should be {string}",
  (expected: string) => {
    cy.get('[aria-label="Freight simulation result"]')
      .should("contain.text", expected);
  },
);

Then("the operation should be {string}", (operation: string) => {
  cy.get('[aria-label="Freight simulation result"]')
    .should("contain.text", operation);
});