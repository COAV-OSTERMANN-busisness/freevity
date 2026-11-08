import {
    Given,
    When,
    Then,
  } from "@badeball/cypress-cucumber-preprocessor";
  
  Given("the navigation test starts on the landing route", () => {
    cy.visit("/");
  
    cy.location("pathname").should("eq", "/");
  });
  
  When("the navigation test follows the calculator destination", () => {
    cy.get('a[href="/calculator"]')
      .filter(":visible")
      .first()
      .should("have.attr", "href", "/calculator")
      .click();
  });
  
  Then("the navigation test must reach the calculator route", () => {
    cy.location("pathname").should("eq", "/calculator");
  });
  
  Then("the navigation test must display the calculator workspace", () => {
    cy.get('section[aria-label="Calculator selector"]')
      .should("exist")
      .and("be.visible");
  
    cy.get('section[aria-label="Calculator"]')
      .should("exist")
      .and("be.visible");
  });
  
  Given("the navigation test starts on the calculator route", () => {
    cy.visit("/calculator");
  
    cy.location("pathname").should("eq", "/calculator");
  });
  
  When("the navigation test follows the home destination", () => {
    cy.get('a[href="/"]')
      .filter(":visible")
      .first()
      .should("have.attr", "href", "/")
      .click();
  });
  
  Then("the navigation test must reach the landing route", () => {
    cy.location("pathname").should("eq", "/");
  });
  
  Then("the navigation test must display the landing content", () => {
    cy.get("main")
      .should("exist")
      .and("be.visible");
  });