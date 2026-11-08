# language: en

Feature: Maritime freight calculation
  As a freight calculator user
  I want to calculate valid maritime freight shipments
  So that I can validate the results displayed by the application

  Background:
    Given I access the maritime freight calculator

  Scenario: Calculate domestic USA FCL freight with minimum freight
    When I enter the maritime origin "Los Angeles, California, USA"
    And I enter the maritime destination "New York, New York, USA"
    And I select maritime transport mode
    And I select maritime type "FCL"
    And I enter the container quantity "2"
    And I enter the maritime quantity "1"
    And I enter the maritime weight "1000"
    And I enter the maritime length "100"
    And I enter the maritime width "100"
    And I enter the maritime height "100"
    And I select the maritime tariff basis "Unit"
    And I enter the maritime tariff rate "1800"
    And I enter the minimum freight "4000"
    And I add the maritime charge "THC" with amount "150"
    And I calculate the maritime freight
    Then the maritime estimated freight should be "$4,150.00"
    And the maritime base freight should be "$4,000.00"
    And the maritime operation should be "National"

  Scenario: Calculate domestic Japan LCL freight with minimum freight
    When I enter the maritime origin "Tokyo, Japan"
    And I enter the maritime destination "Osaka, Japan"
    And I select maritime transport mode
    And I select maritime type "LCL"
    And I enter the maritime quantity "2"
    And I enter the maritime weight "500"
    And I enter the maritime length "100"
    And I enter the maritime width "80"
    And I enter the maritime height "50"
    And I select the maritime tariff basis "Weight or measurement (W/M)"
    And I enter the maritime tariff rate "120"
    And I enter the minimum freight "150"
    And I add the maritime charge "Handling" with amount "55"
    And I calculate the maritime freight
    Then the maritime estimated freight should be "¥205"
    And the maritime base freight should be "¥150"
    And the maritime operation should be "National"

  Scenario: Calculate international FCL freight
    When I enter the maritime origin "Tokyo, Japan"
    And I enter the maritime destination "Los Angeles, California, USA"
    And I select maritime transport mode
    And I select maritime type "FCL"
    And I enter the container quantity "2"
    And I enter the maritime quantity "1"
    And I enter the maritime weight "1000"
    And I enter the maritime length "100"
    And I enter the maritime width "100"
    And I enter the maritime height "100"
    And I select the maritime tariff basis "Unit"
    And I enter the maritime tariff rate "1875"
    And I enter the minimum freight "3000"
    And I add the maritime charge "Handling" with amount "175"
    And I calculate the maritime freight
    Then the maritime estimated freight should be "$3,925.00"
    And the maritime base freight should be "$3,750.00"
    And the maritime operation should be "International"

  Scenario: Calculate international LCL freight by W/M
    When I enter the maritime origin "Tokyo, Japan"
    And I enter the maritime destination "Los Angeles, California, USA"
    And I select maritime transport mode
    And I select maritime type "LCL"
    And I enter the maritime quantity "4"
    And I enter the maritime weight "1500"
    And I enter the maritime length "100"
    And I enter the maritime width "80"
    And I enter the maritime height "75"
    And I select the maritime tariff basis "Weight or measurement (W/M)"
    And I enter the maritime tariff rate "120"
    And I enter the minimum freight "200"
    And I add the maritime charge "Handling" with amount "45"
    And I calculate the maritime freight
    Then the maritime estimated freight should be "$333.00"
    And the maritime base freight should be "$288.00"
    And the maritime operation should be "International"