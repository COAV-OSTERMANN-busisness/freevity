Feature: Application language

  Scenario: Change the landing page language manually
    Given I open the landing page
    When I manually select Portuguese
    Then Portuguese must remain selected
    And the landing page interface must change to Portuguese

  Scenario: Change the calculator language manually
    Given I open the calculator page
    When I manually select Portuguese
    Then Portuguese must remain selected
    And the calculator interface must change to Portuguese