/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {     // Exercicio 00
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {   
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {     // Exercício extra 01
        const longTest = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'

        cy.get('#firstName').type('Lucas')
        cy.get('#lastName').type('Barros')
        cy.get('#email').type('Lucasgbarros@gmail.com')
        cy.get('#open-text-area').type(longTest, {delay: 10})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {     // Exercício extra 02
        cy.get('#firstName').type('Lucas')
        cy.get('#lastName').type('Barros')
        cy.get('#email').type('Lucasgbarros@gmail,com')
        cy.get('#open-text-area').type('TESTE')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('Inserindo valores nao-numéricos no campo telefone', function() {        // Exercicio extra 03   
        cy.get('#phone')
          .type('abcdefghijklmnopqrstuvwyz')
          .should('have.value', '')       
        cy.get('button[type="submit"]').click()
    })
})