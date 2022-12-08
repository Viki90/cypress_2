/// <reference types="Cypress" />

import { faker } from "@faker-js/faker";
import { registerPage } from "../page_objects/registerPage";

describe("register POM", () => {
  let randomUser = {
    randomEmail: faker.internet.email(),
    randomFirstName: faker.name.firstName(),
    randomLastName: faker.name.lastName(),
    randomPassword: faker.internet.password(),
    invalidRandomEmailAddress: faker.internet.domainSuffix(),
    existingEmail: "viki.verebes90@gmail.com"
  };

  beforeEach("visit register page", () => {
    cy.visit("/register");
  });

  it("register with existing email", () => {
    registerPage.register(
      randomUser.randomFirstName,
      randomUser.randomLastName,
      randomUser.existingEmail,
      randomUser.randomPassword
    );
    registerPage.alertMessage.should("be.visible")
      .and("exist")
      .and("have.length", 1)
      .and("have.text", "The email has already been taken.");
    cy.url().should("include", "/register");
  });

  it("register with invalid email", () => {
    registerPage.register(
      randomUser.randomFirstName,
      randomUser.randomLastName,
      randomUser.invalidRandomEmailAddress,
      randomUser.randomPassword
    );
    cy.url().should("include", "/register");
  });

  it("register with valid data", () => {
    registerPage.register(
      randomUser.randomFirstName,
      randomUser.randomLastName,
      randomUser.randomEmail,
      randomUser.randomPassword
    );
    cy.url().should("not.include", "/register");
  });
  
 
});