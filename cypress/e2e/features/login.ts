import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on empty home page", () => {
  cy.visit("/");
});

When("I type email {string}", (boardName) => {
    cy.get("[id=email]").type('{selectall}').type(`${boardName}{enter}`);
  });

  
When("I type password {string}", (boardName) => {
    cy.get("[id=password]").type('{selectall}').type(`${boardName}{enter}`);
  });

Then("I should be redirected to the board detail", () => {
  cy.location("pathname").should('match', /\/board\/\d/);
});

Then("I should be redirected to the login page", () => {
  cy.location("pathname").should('match', /\/login\/\d/);
});


Then("I should be redirected to the dashboard", () => {
  cy.location("pathname").should('match', /\/dashboard\/\d/);
});
