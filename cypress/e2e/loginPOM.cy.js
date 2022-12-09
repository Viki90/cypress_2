/// <reference types="Cypress" />

import { loginPage } from "../page_objects/loginPOM";

describe("login test", () => {
    before("visit gallery app", () => {
        cy.visit("/");
        loginPage.loginButton.click();
        loginPage.loginHeading.should('be.visible').and('have.text', 'Please login');
    });

    it.only("login with valid credentials", () => {
        cy.intercept(
            "POST",
            "https://gallery-api.vivifyideas.com/api/auth/login",
        ).as("successfullLogin");

        loginPage.login(Cypress.env("userEmail"), Cypress.env("userPassword"));
        cy.wait("@successfullLogin").then(interception => {
            console.log("interception", interception);
            expect(interception.response.statusCode).eq(200);
            expect(interception.response.body.access_token).to.exist;
        });
         cy.url().should("not.include", "/login");
    });

    // it("login with invalid credentials", () => {
    //     loginPage.login("viki.verebes90@gmail.com", "12341234");
    //     loginPage.alertMessage.should("be.visible")
    //         .and("have.text", "Bad Credentials")
    //         .and("have.css", "background-color", "rgb(248, 215, 218)");
    //     cy.url().should("include", "/login");
    // });

    it("login via BE", () => {
        cy.loginViaBE();
        cy.visit("/create");
    });
});