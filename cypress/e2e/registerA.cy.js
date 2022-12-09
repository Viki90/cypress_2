/// <reference types="Cypress" />

import { faker } from "@faker-js/faker";
import { registerPage } from "../page_objects/registerPage";
import { loginPage } from "../page_objects/loginPOM";

describe("register POM", () => {
  let randomUser = {
    randomEmail: faker.internet.email(),
    randomFirstName: faker.name.firstName(),
    randomLastName: faker.name.lastName(),
    randomPassword: faker.internet.password(),
  };

  beforeEach("visit register page", () => {
    cy.visit("/register");
  });

  it("register with existing email adress", () => {
    registerPage.register(
      randomUser.randomFirstName,
      randomUser.randomLastName,
      randomUser.randomEmail,
      randomUser.randomPassword
    );
    registerPage.alertMessage.should('be.visible');
    
    cy.url().should("not.include", "/register");
  });

 it.only("register via BE", () => {
    cy.request(
      "POST",
      "https://gallery-api.vivifyideas.com/api/auth/register",
      {
        email: randomUser.randomEmail,
        first_name: randomUser.randomFirstName,
        last_name: randomUser.randomLastName,
        password: randomUser.randomPassword,
        password_confirmation: randomUser.randomPassword,
        terms_and_conditions:true
      }
    );

    cy.visit("/login");
    loginPage.login(randomUser.randomEmail, randomUser.randomPassword);
 });
});