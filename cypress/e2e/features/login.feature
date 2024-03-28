Feature: login functionality

  Rule: Happy paths

  Background: Empty login page
    Given I am on empty home page
    Then I should be redirected to the login page

  Scenario: Fill login form
    When I type email "mohammad.jafariyan7@gmail.com"
    And I type password "d1r3%$#SVctu5"
    Then I should be redirected to the dashboard

  Scenario: Creating a <listName> list within a board
    When I type in "<boardName>" and submit
    And Create a list with the name "<listName>"
    Then I should be redirected to the board detail

  Examples:
    | boardName | listName |
    | Shopping list | Groceries |
    | Rocket launch | Preflight checks |
