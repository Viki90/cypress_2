class AllGalleriesPage {
    get allGalleriesHeding() {
        return cy.get("h1");
    }

    get searchInput() {
        return cy.get("input");
    }

    get fillterButton() {
        return cy.get("button");
    }

    get singleGallery() {
        return cy.get(".cell");
    }

    get galleriesGrid() {
        return cy.get(".grid");
    }

    get galleryHeading() {
        return this.singleGallery.find("h2");
    }

    get galleryAuthor() {
        return this.singleGallery.find("p");
    }

    get galleryCreation() {
        return this.singleGallery.find("small");
    }

    get loadingMoreButton() {
        return cy.get("button.btn.btn-custom");
    }

    get galleryImage() {
        return cy.get("img");
    }

    serach(searchTerm) {
        this.searchInput.type(searchTerm);
        this.fillterButton.click();
    }
}

export const allGalleriesPage = new AllGalleriesPage();