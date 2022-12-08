/// <reference types="Cypress" />

import { loginPage } from "../page_objects/loginPOM";
import { allGalleriesPage } from "../page_objects/allGalleriesPage";

describe("all galleries test", () => {
    let existingUser = {
        validationEmail: "viki.verebes90@gmail.com",
        validPass: "12341234"
    }

    let searchTerm = "novi sad 3 slike";

  beforeEach("logn into the app", () => {
    cy.visit("/login");

    cy.url().should("include", "/login");
    loginPage.loginHeading.should("be.visible")
        .and("have.text", "Please login");

    loginPage.login(existingUser.validationEmail, existingUser.validPass);

    cy.url().should("include", "/login");
    allGalleriesPage.allGalleriesHeding
        .should("be.visible")
        .and("have.text", "All Galleries");
  });

  it("test pagination", () => {
    allGalleriesPage.singleGallery.should("have.length", 10);
    allGalleriesPage.loadingMoreButton.click();
    allGalleriesPage.singleGallery.should("have.length", 20);
  });

  it("all galleries loaded", () => {
    cy.url().should("include", "/")
    allGalleriesPage.singleGallery.should("have.length", 10);
    allGalleriesPage.galleryImage.should("have.length", 10);
  });

it("redirect to single gallery", () => {
    allGalleriesPage
        .singleGallery
        .first()
            .find("a")
            .first()
            .click();
    allGalleriesPage.allGalleriesHeding.should("be.visible");
    cy.url().should("include", "/galleries");
  });
  

/* it("search for existing gallery", () => {
   allGalleriesPage.serach(searchTerm);
   allGalleriesPage.singleGallery.should('have.length', 1);
   cy.contains(searchTerm);
}); */
 
});