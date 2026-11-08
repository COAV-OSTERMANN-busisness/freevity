# language: en

Feature: Air freight calculation
  As a freight calculator user
  I want to calculate valid air freight shipments
  So that I can validate the results displayed by the application

  Background:
    Given I access the air freight calculator

  Scenario: Calculate domestic air freight by chargeable weight with actual weight dominant
    When I enter the air origin "São Paulo, São Paulo, Brazil"
    And I enter the air destination "Campinas, São Paulo, Brazil"
    And I select air transport mode
    And I enter the air quantity "1"
    And I enter the air weight "100"
    And I enter the air length "100"
    And I enter the air width "100"
    And I enter the air height "30"
    And I enter the volumetric divisor "6000"
    And I select the air tariff basis "Chargeable weight"
    And I enter the air tariff rate "2"
    And I calculate the air freight
    Then the air estimated freight should be "R$200.00"
    And the air base freight should be "R$200.00"
    And the air operation should be "National"

  Scenario: Calculate international air freight by chargeable weight with volumetric weight dominant
    When I enter the air origin "Tokyo, Japan"
    And I enter the air destination "Los Angeles, California, USA"
    And I select air transport mode
    And I enter the air quantity "1"
    And I enter the air weight "20"
    And I enter the air length "100"
    And I enter the air width "100"
    And I enter the air height "60"
    And I enter the volumetric divisor "6000"
    And I select the air tariff basis "Chargeable weight"
    And I enter the air tariff rate "3"
    And I calculate the air freight
    Then the air estimated freight should be "$300.00"
    And the air base freight should be "$300.00"
    And the air operation should be "International"

  Scenario: Calculate domestic air freight by weight
    When I enter the air origin "São Paulo, São Paulo, Brazil"
    And I enter the air destination "Campinas, São Paulo, Brazil"
    And I select air transport mode
    And I enter the air quantity "1"
    And I enter the air weight "150"
    And I enter the air length "100"
    And I enter the air width "100"
    And I enter the air height "30"
    And I enter the volumetric divisor "6000"
    And I select the air tariff basis "Weight"
    And I enter the air tariff rate "2"
    And I calculate the air freight
    Then the air estimated freight should be "R$300.00"
    And the air base freight should be "R$300.00"
    And the air operation should be "National"

  Scenario: Calculate international air freight by flat rate
    When I enter the air origin "Tokyo, Japan"
    And I enter the air destination "Los Angeles, California, USA"
    And I select air transport mode
    And I enter the air quantity "1"
    And I enter the air weight "100"
    And I enter the air length "100"
    And I enter the air width "100"
    And I enter the air height "30"
    And I enter the volumetric divisor "6000"
    And I select the air tariff basis "Flat"
    And I enter the air tariff rate "750"
    And I calculate the air freight
    Then the air estimated freight should be "$750.00"
    And the air base freight should be "$750.00"
    And the air operation should be "International"