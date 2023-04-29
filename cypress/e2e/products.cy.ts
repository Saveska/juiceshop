import { LoginMethods } from "cypress/pageObjects/login/login.methods";
import { ProductMethods } from "cypress/pageObjects/products/products.methods";

describe('template spec', () => {
  var login = new LoginMethods();
  var products = new ProductMethods();

  beforeEach(function () {
    login.navigateToLoginAndCloseDialog('http://localhost:3000/login#/login');
    login.login('saveska.maria@gmail.com', '123456');
    login.verifySuccessfullLogin();
  })

  it('Add item into basket', () => {
    cy.get('.mat-search_icon-search').click();
    cy.get('#mat-input-0').type('apple juice');
    cy.get('#mat-input-0').type('{enter}');
    cy.get('[aria-label="Add to Basket"]').click();
    cy.get('.fa-3x.warn-notification').should('have.text', '1');
  })

  // it('User should be able to add item into basket with POM', () => {
  //   products.addItemToBasket('apple juice');
  //   products.verifyItemAddedToBasket('1');
  // })

  it('Delete item from basket', () => {
    cy.get('[aria-label="Show the shopping cart"]').click();
    cy.get('.fa-trash-alt').click();
    cy.get('#price').should('have.text', 'Total Price: 0¤');
  })


  it('Item not in stock', () => {
    cy.get('.mat-search_icon-search').click();
    cy.get('#mat-input-0').type('OWASP Juice Shop "King of the Hill" Facemask');
    cy.get('#mat-input-0').type('{enter}');
    cy.get('[aria-label="Add to Basket"]').click();
    cy.get('.mat-simple-snack-bar-content').should('have.text', 'We are out of stock! Sorry for the inconvenience.');
  })

  it('Item not in stock with POM', () => {
    products.addItemToBasket('OWASP Juice Shop "King of the Hill" Facemask');
    products.verifyItemAddedToBasket('0');
  })

})