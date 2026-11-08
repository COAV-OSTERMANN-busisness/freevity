import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

const MOBILE_WIDTH = 375;
const MOBILE_HEIGHT = 812;

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

Given("I open the application on a mobile viewport", () => {
  cy.viewport(MOBILE_WIDTH, MOBILE_HEIGHT);
  visitInEnglish("/");
});

Given("I open the calculator on a mobile viewport", () => {
  cy.viewport(MOBILE_WIDTH, MOBILE_HEIGHT);
  visitInEnglish("/calculator");
});

Then("the mobile page must not have horizontal overflow", () => {
  assertNoHorizontalOverflow();
});

Then("the desktop primary navigation must be hidden on mobile", () => {
  cy.get('nav[aria-label="Primary navigation"]')
    .should("exist")
    .and("not.be.visible");
});

Then("the mobile navigation control must be visible", () => {
  cy.get("header")
    .find("details")
    .should("exist")
    .and("be.visible")
    .find("summary")
    .should("be.visible");
});

Then("the landing page main content must be visible on mobile", () => {
  cy.get("main").should("exist").and("be.visible");
});

Then("the page footer must be visible on mobile", () => {
  cy.get("footer").should("exist").and("be.visible");
});

Then("the calculator selector must be visible on mobile", () => {
  cy.get('section[aria-label="Calculator selector"]')
    .should("exist")
    .and("be.visible");
});

Then("the calculator content must be visible on mobile", () => {
  cy.get('section[aria-label="Calculator"]')
    .should("exist")
    .and("be.visible");
});

Then("the freight calculator must be selected on mobile", () => {
  cy.get('section[aria-label="Calculator selector"]')
    .find('button[aria-pressed="true"]')
    .should("exist")
    .and("be.visible");
});