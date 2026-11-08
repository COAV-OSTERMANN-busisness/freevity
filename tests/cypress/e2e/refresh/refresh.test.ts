import {
    Given,
    When,
    Then,
  } from "@badeball/cypress-cucumber-preprocessor";
  
  Given("the refresh test opens the landing page", () => {
    cy.visit("/");
  
    cy.location("pathname").should("eq", "/");
    cy.get("main").should("be.visible");
  });
  
  When("the refresh test reloads the landing page", () => {
    cy.reload();
  });
  
  Then("the refresh test must remain on the landing route", () => {
    cy.location("pathname").should("eq", "/");
  });
  
  Then("the landing content must remain visible after refresh", () => {
    cy.get("main")
      .should("exist")
      .and("be.visible");
  });
  
  Given("the refresh test opens the calculator page", () => {
    cy.visit("/calculator");
  
    cy.location("pathname").should("eq", "/calculator");
  
    cy.get('section[aria-label="Calculator"]')
      .should("be.visible");
  });
  
  When("the refresh test reloads the calculator page", () => {
    cy.reload();
  });
  
  Then("the refresh test must remain on the calculator route", () => {
    cy.location("pathname").should("eq", "/calculator");
  });
  
  Then("the calculator workspace must remain visible after refresh", () => {
    cy.get('section[aria-label="Calculator selector"]')
      .should("exist")
      .and("be.visible");
  
    cy.get('section[aria-label="Calculator"]')
      .should("exist")
      .and("be.visible");
  });