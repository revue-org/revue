Feature: Security Rule Management

  Scenario: Create a security rule
    Given I am logged in as a Guardian
    When I create a security rule in the system
    Then the alarm service should check the security rule
    And trigger an alarm if the conditions are satisfied

  Scenario: Update a security rule
    Given I am logged in as a Guardian
    When I create a security rule in the system
    When I update a security rule in the system
    Then the alarm service should check the updated security rule
    And trigger an alarm if the conditions are satisfied

  Scenario: Delete a security rule
    Given I am logged in as a Guardian
    When I delete a security rule from the system
    Then the alarm service should no longer check the deleted security rule