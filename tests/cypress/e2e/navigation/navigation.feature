Feature: Application navigation

  Scenario: Navigate from the landing page to the calculator
    Given the navigation test starts on the landing route
    When the navigation test follows the calculator destination
    Then the navigation test must reach the calculator route
    And the navigation test must display the calculator workspace

  Scenario: Navigate from the calculator back to the landing page
    Given the navigation test starts on the calculator route
    When the navigation test follows the home destination
    Then the navigation test must reach the landing route
    And the navigation test must display the landing content