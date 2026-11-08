Feature: Mobile responsive layout

  Scenario: Landing page remains usable on mobile
    Given I open the application on a mobile viewport
    Then the mobile page must not have horizontal overflow
    And the desktop primary navigation must be hidden on mobile
    And the mobile navigation control must be visible
    And the landing page main content must be visible on mobile
    And the page footer must be visible on mobile

  Scenario: Calculator remains usable on mobile
    Given I open the calculator on a mobile viewport
    Then the mobile page must not have horizontal overflow
    And the desktop primary navigation must be hidden on mobile
    And the mobile navigation control must be visible
    And the calculator selector must be visible on mobile
    And the calculator content must be visible on mobile
    And the freight calculator must be selected on mobile
    And the page footer must be visible on mobile