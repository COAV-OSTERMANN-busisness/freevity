import {
    Given,
    When,
    Then,
  } from "@badeball/cypress-cucumber-preprocessor";
  
  let englishContent = "";
  
  Given("I open the landing page", () => {
    cy.visit("/");
  
    cy.get('select[aria-label="Language"]')
      .should("exist")
      .and("be.visible");
  
    cy.get("main")
      .invoke("text")
      .then((text) => {
        englishContent = text.trim();
        expect(englishContent).not.to.equal("");
      });
  });
  
  Given("I open the calculator page", () => {
    cy.visit("/calculator");
  
    cy.get('select[aria-label="Language"]')
      .should("exist")
      .and("be.visible");
  
    cy.get('section[aria-label="Calculator"]')
      .invoke("text")
      .then((text) => {
        englishContent = text.trim();
        expect(englishContent).not.to.equal("");
      });
  });
  
  When("I manually select Portuguese", () => {
    cy.get('select[aria-label="Language"]')
      .select("pt");
  });
  
  Then("Portuguese must remain selected", () => {
    cy.get('select[aria-label="Language"]')
      .should("have.value", "pt");
  });
  
  Then("the landing page interface must change to Portuguese", () => {
    cy.get("main")
      .invoke("text")
      .should((text) => {
        const portugueseContent = text.trim();
  
        expect(portugueseContent).not.to.equal("");
        expect(portugueseContent).not.to.equal(englishContent);
      });
  });
  
  Then("the calculator interface must change to Portuguese", () => {
    cy.get('section[aria-label="Calculator"]')
      .invoke("text")
      .should((text) => {
        const portugueseContent = text.trim();
  
        expect(portugueseContent).not.to.equal("");
        expect(portugueseContent).not.to.equal(englishContent);
      });
  });