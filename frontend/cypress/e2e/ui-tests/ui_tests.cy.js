/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('SignIn and LogIn UI tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  it('Signup - Happy Path', () => {
    const name = 'Nick Liu';
    const email = 'nicholas@gmail.com';
    const password = 'password';
    const passwordConf = 'password';

    cy.get('#user-menu-button')
      .click();
    
    cy.get('#signup-nav-button')
      .click();

    cy.get('input[name=register-name-input]')
      .focus()
      .type(name);

    cy.get('input[name=register-email-input]')
      .focus()
      .type(email);
    
    cy.get('input[name=register-password-input]')
      .focus()
      .type(password);

    cy.get('input[name=register-password-conf-input]')
      .focus()
      .type(passwordConf);

    cy.get('#register-button')
      .click();
  })

  it('Login and logout - Happy Path', () => {
    const email = 'nicholas@gmail.com';
    const password = 'password';

    cy.get('#user-menu-button')
      .click();
    
    cy.get('#login-nav-button')
      .click();
    
    cy.get('input[id=login-email-input]')
      .focus()
      .type(email);
    
    cy.get('input[id=login-password-input]')
      .focus()
      .type(password);

    cy.get('#log-in-button')
      .click();

    cy.get('#new-listing-button')
      .should('be.visible');

    cy.get('#user-menu-button')
      .click();

    cy.get('#logout-button')
      .click();

    cy.get('#new-listing-button')
      .should('not.be.visible');
  })

  it('Creating new listing and deleting it - Happy Path', () => {
    const email = 'nicholas@gmail.com';
    const password = 'password';

    cy.get('#user-menu-button')
      .click();
    
    cy.get('#login-nav-button')
      .click();
    
    cy.get('input[id=login-email-input]')
      .focus()
      .type(email);
    
    cy.get('input[id=login-password-input]')
      .focus()
      .type(password);

    cy.get('#log-in-button')
      .click();

    cy.get('#new-listing-button')
      .click();
    
    cy.get('input[id=title]')
      .focus()
      .type('A');

    cy.get('#create-listing-button')
      .click();

    cy.get('#deleteListing')
      .click();
    
    cy.get('#yesDelete')
      .click();
  })

  it('Searching for a listing and deleting it - Happy Path', () => {
    const email = 'nicholas@gmail.com';
    const password = 'password';

    cy.get('#user-menu-button')
      .click();
    
    cy.get('#login-nav-button')
      .click();
    
    cy.get('input[id=login-email-input]')
      .focus()
      .type(email);
    
    cy.get('input[id=login-password-input]')
      .focus()
      .type(password);

    cy.get('#log-in-button')
      .click();

    cy.get('#new-listing-button')
      .click();
    
    cy.get('input[id=title]')
      .focus()
      .type('A');

    cy.get('#create-listing-button')
      .click();

    cy.get('input[id=searchBar]')
      .focus()
      .type('A');

    cy.get('#searchButton')
      .click();
    
    cy.get('#deleteListing')
      .click();
    
    cy.get('#yesDelete')
      .click();
  })

  it('Searching for a listing, editing and deleting it - Happy Path', () => {
    const email = 'nicholas@gmail.com';
    const password = 'password';

    cy.get('#user-menu-button')
      .click();
    
    cy.get('#login-nav-button')
      .click();
    
    cy.get('input[id=login-email-input]')
      .focus()
      .type(email);
    
    cy.get('input[id=login-password-input]')
      .focus()
      .type(password);

    cy.get('#log-in-button')
      .click();

    cy.get('#new-listing-button')
      .click();
    
    cy.get('input[id=title]')
      .focus()
      .type('A');

    cy.get('#create-listing-button')
      .click();

    cy.get('input[id=searchBar]')
      .focus()
      .type('A');

    cy.get('#searchButton')
      .click();

    cy.get('#editListing')
      .click();

    cy.get('input[id=editTitle]')
      .focus()
      .type('{selectall}{backspace}')
      .type('B');

    cy.get('#updateListingButton')
      .click();

    cy.get('input[id=searchBar]')
      .focus()
      .type('{selectall}{backspace}')
      .type('B');

    cy.get('#searchButton')
      .click();
    
    cy.get('#deleteListing')
      .click();
    
    cy.get('#yesDelete')
      .click();
  })

  it('Finding Listing in My Listings, publishing, unpublishing it and deleting it - Happy Path', () => {
    const email = 'nicholas@gmail.com';
    const password = 'password';

    cy.get('#user-menu-button')
      .click();
    
    cy.get('#login-nav-button')
      .click();
    
    cy.get('input[id=login-email-input]')
      .focus()
      .type(email);
    
    cy.get('input[id=login-password-input]')
      .focus()
      .type(password);

    cy.get('#log-in-button')
      .click();

    cy.get('#new-listing-button')
      .click();
    
    cy.get('input[id=title]')
      .focus()
      .type('C');

    cy.get('#create-listing-button')
      .click();
  
    cy.get('#user-menu-button')
      .click();

    cy.get('#my-listing-nav-button')
      .click();

    cy.get('#publishListingBtn')
      .click();

    cy.get('input[id=startDate]')
      .focus()
      .type('2001-09-28');
    
    cy.get('input[id=endDate]')
      .focus()
      .type('2022-12-18');

    cy.get('#confirmPublishBtn')
      .click();

    cy.get('#unpublishListingBtn')
      .click();

    cy.get('#deleteListing')
      .click();
    
    cy.get('#yesDelete')
      .click();
  })

})