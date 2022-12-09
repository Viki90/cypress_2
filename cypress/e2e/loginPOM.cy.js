/// <reference types="Cypress" />

import { loginPage } from "../page_objects/loginPOM";

describe("login test", () => {
    before("visit gallery app", () => {
        cy.visit("/");
        loginPage.loginButton.click();
        loginPage.loginHeading.should('be.visible').and('have.text', 'Please login');
    });

    // it("login with invalid credentials", () => {
    //     loginPage.login("viki.verebes90@gmail.com", "12341234");
    //     loginPage.alertMessage.should("be.visible")
    //         .and("have.text", "Bad Credentials")
    //         .and("have.css", "background-color", "rgb(248, 215, 218)");
    //     cy.url().should("include", "/login");
    // });

    it("login via BE", () => {
        cy.request(
            "POST",
            "https://gallery-api.vivifyideas.com/api/auth/login",
            {
                email:"viki.verebes90@gmail.com",
                password:"12341234"
            }
        ).its('body').then(response => {
            console.log("RESPONSE", response);
            window.localStorage.setItem("token", response.access_token);
        });
        cy.visit("/create");
    });
});