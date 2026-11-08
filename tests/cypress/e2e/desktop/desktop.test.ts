import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

const DESKTOP_WIDTH = 1280;
const DESKTOP_HEIGHT = 720;

function visitInEnglish(path: string): void {
  cy.visit(path, {
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
}

function assertNoHorizontalOverflow(): void {
  cy.document().then((document) => {
    const documentElement = document.documentElement;

    expect(
      documentElement.scrollWidth,
      "document scroll width",
    ).to.be.at.most(documentElement.clientWidth);
  });
}

Given("I open the application on a desktop viewport", () => {
  cy.viewport(DESKTOP_WIDTH, DESKTOP_HEIGHT);
  visitInEnglish("/");
});

Given("I open the calculator on a desktop viewport", () => {
  cy.viewport(DESKTOP_WIDTH, DESKTOP_HEIGHT);
  visitInEnglish("/calculator");
});

Then("the page must not have horizontal overflow", () => {
  assertNoHorizontalOverflow();
});

Then("the desktop primary navigation must be visible", () => {
  cy.get('nav[aria-label="Primary navigation"]')
    .should("exist")
    .and("be.visible");
});

Then("the mobile navigation must be hidden", () => {
  cy.get('nav[aria-label="Mobile navigation"]')
    .should("exist")
    .and("not.be.visible");
});

Then("the landing page main content must be visible", () => {
  cy.get("main").should("exist").and("be.visible");
});

Then("the page footer must be visible", () => {
  cy.get("footer").should("exist").and("be.visible");
});

Then("the calculator selector must be visible", () => {
  cy.get('section[aria-label="Calculator selector"]')
    .should("exist")
    .and("be.visible");
});

Then("the calculator content must be visible", () => {
  cy.get('section[aria-label="Calculator"]')
    .should("exist")
    .and("be.visible");
});

Then("the freight calculator must be selected", () => {
  cy.get('section[aria-label="Calculator selector"]')
    .find('button[aria-pressed="true"]')
    .should("exist")
    .and("be.visible");
});