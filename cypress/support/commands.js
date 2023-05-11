Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){ 
    cy.get('#firstName').type('Lucas')
    cy.get('#lastName').type('Barros')
    cy.get('#email').type('cypress@gmail.com')
    cy.get('#open-text-area').type("Teste")

    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
})