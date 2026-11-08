import {
    Given,
    When,
    Then,
  } from "@badeball/cypress-cucumber-preprocessor";
  
  function getFreightForm() {
    return cy.get("form").filter(":visible").first();
  }
  
  Given("the input validation test opens the freight calculator", () => {
    cy.visit("/calculator");
  
    cy.location("pathname").should("eq", "/calculator");
  
    cy.get('section[aria-label="Calculator"]')
      .should("exist")
      .and("be.visible");
  
    getFreightForm().should("exist").and("be.visible");
  });
  
  When("the input validation test submits the empty freight form", () => {
    getFreightForm().within(() => {
      cy.get('button[type="submit"]')
        .should("exist")
        .and("be.visible")
        .click();
    });
  });
  
  Then("the freight form must contain an invalid required field", () => {
    getFreightForm()
      .find(":invalid")
      .should("have.length.greaterThan", 0);
  });
  
  Then("no freight calculation result must be displayed", () => {
    cy.get('section[aria-label="Calculator"]')
      .find('[role="status"]')
      .should("not.exist");
  });
  
  When("the input validation test enters a negative weight", () => {
    getFreightForm()
      .find("#freight-weight")
      .should("exist")
      .and("be.visible")
      .clear()
      .type("-1")
      .should("have.value", "-1");
  });
  
  When("the input validation test attempts to submit the freight form", () => {
    getFreightForm().within(() => {
      cy.get('button[type="submit"]')
        .should("exist")
        .and("be.visible")
        .click();
    });
  });
  
  Then("the freight weight field must be invalid", () => {
    getFreightForm()
      .find("#freight-weight")
      .should("match", ":invalid");
  });