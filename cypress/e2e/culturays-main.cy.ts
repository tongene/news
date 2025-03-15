describe('Culturays Main Test', () => {
  it('passes', () => {
    cy.visit('https://culturays.com')
  });

  it('passes', () => {
    cy.visit('https://culturays.com/naija-wiki')
  });

   it('passes', () => {
    cy.visit('https://culturays.com/naija-events')
  });

  it('passes', () => {
    cy.visit('https://culturays.com/forum')
  })
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })
})