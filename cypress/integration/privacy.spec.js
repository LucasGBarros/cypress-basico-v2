it('testa a página da política de privacidade de forma independente', function() {     // Exercício extra 002 Desafio
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')
})