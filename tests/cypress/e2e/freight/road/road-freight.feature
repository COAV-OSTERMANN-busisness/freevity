# language: en

Feature: Road freight calculation
  As a freight calculator user
  I want to calculate valid road freight shipments
  So that I can validate the results displayed by the application

  Background:
    Given I access the freight calculator

  Scenario: Calculate domestic road freight by weight
    When I enter the origin "São Paulo, São Paulo, Brazil"
    And I enter the destination "Campinas, São Paulo, Brazil"
    And I select the transport mode "Road"
    And I enter the quantity "2"
    And I enter the weight "1000"
    And I enter the length "100"
    And I enter the width "100"
    And I enter the height "100"
    And I select the tariff basis "Weight"
    And I enter the tariff rate "2"
    And I calculate the freight
    Then the estimated freight should be "R$2,000.00"
    And the base freight should be "R$2,000.00"
    And the operation should be "National"

  Scenario: Calculate domestic road freight by volume
    When I enter the origin "São Paulo, São Paulo, Brazil"
    And I enter the destination "Campinas, São Paulo, Brazil"
    And I select the transport mode "Road"
    And I enter the quantity "3"
    And I enter the weight "500"
    And I enter the length "100"
    And I enter the width "100"
    And I enter the height "100"
    And I select the tariff basis "Volume"
    And I enter the tariff rate "100"
    And I calculate the freight
    Then the estimated freight should be "R$300.00"
    And the base freight should be "R$300.00"
    And the operation should be "National"

  Scenario: Calculate domestic road freight by unit
    When I enter the origin "São Paulo, São Paulo, Brazil"
    And I enter the destination "Campinas, São Paulo, Brazil"
    And I select the transport mode "Road"
    And I enter the quantity "4"
    And I enter the weight "800"
    And I enter the length "100"
    And I enter the width "100"
    And I enter the height "100"
    And I select the tariff basis "Unit"
    And I enter the tariff rate "250"
    And I calculate the freight
    Then the estimated freight should be "R$1,000.00"
    And the base freight should be "R$1,000.00"
    And the operation should be "National"

  Scenario: Calculate domestic road freight by flat rate
    When I enter the origin "São Paulo, São Paulo, Brazil"
    And I enter the destination "Campinas, São Paulo, Brazil"
    And I select the transport mode "Road"
    And I enter the quantity "10"
    And I enter the weight "3000"
    And I enter the length "100"
    And I enter the width "100"
    And I enter the height "100"
    And I select the tariff basis "Flat"
    And I enter the tariff rate "750"
    And I calculate the freight
    Then the estimated freight should be "R$750.00"
    And the base freight should be "R$750.00"
    And the operation should be "National"