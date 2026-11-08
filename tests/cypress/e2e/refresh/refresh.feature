Feature: Page refresh

  Scenario: Refresh the landing page
    Given the refresh test opens the landing page
    When the refresh test reloads the landing page
    Then the refresh test must remain on the landing route
    And the landing content must remain visible after refresh

  Scenario: Refresh the calculator page
    Given the refresh test opens the calculator page
    When the refresh test reloads the calculator page
    Then the refresh test must remain on the calculator route
    And the calculator workspace must remain visible after refresh