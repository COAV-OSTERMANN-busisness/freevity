Feature: Desktop responsive layout

  Scenario: Landing page remains usable on desktop
    Given I open the application on a desktop viewport
    Then the page must not have horizontal overflow
    And the desktop primary navigation must be visible
    And the mobile navigation must be hidden
    And the landing page main content must be visible
    And the page footer must be visible

  Scenario: Calculator remains usable on desktop
    Given I open the calculator on a desktop viewport
    Then the page must not have horizontal overflow
    And the desktop primary navigation must be visible
    And the mobile navigation must be hidden
    And the calculator selector must be visible
    And the calculator content must be visible
    And the freight calculator must be selected
    And the page footer must be visible