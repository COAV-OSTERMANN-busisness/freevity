Feature: Freight calculator input validation

  Scenario: Prevent freight calculation with required fields empty
    Given the input validation test opens the freight calculator
    When the input validation test submits the empty freight form
    Then the freight form must contain an invalid required field
    And no freight calculation result must be displayed

  Scenario: Prevent freight calculation with an invalid numeric value
    Given the input validation test opens the freight calculator
    When the input validation test enters a negative weight
    And the input validation test attempts to submit the freight form
    Then the freight weight field must be invalid
    And no freight calculation result must be displayed