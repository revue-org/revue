Feature: Authentication

    Scenario: User login
      Given I have a valid username and password
      When I login
      Then I should receive a JWT token

    Scenario: User logout
      Given I am logged in
      When I logout
      Then I should no longer have access to the system