import { dataTestSelector } from '@/utils/DataTestSelector';

describe('Essentials', () => {
  beforeEach(() => {
    cy.visit('/essentials');
    cy.intercept('**/services/essentials', { body: [{ code: 'paper-towels', type: 'Paper Towels' }] }).as('essentials');
  });

  it('display basic essentials', () => {
    cy.contains(dataTestSelector('essential-paper-towels'), 'Paper Towels');
    cy.contains(dataTestSelector('add-essential-button'), 'Add');
  });

  it('add an essential', () => {
    cy.get(dataTestSelector('add-essential')).type('Hand Soap');
    cy.get(dataTestSelector('add-essential-button')).click();
    cy.contains(dataTestSelector('essential-hand-soap'), 'Hand Soap');
  });
});
