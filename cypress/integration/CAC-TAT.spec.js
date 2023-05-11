/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {     // Exercício 00
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
        cy.get('#email').type('cypress@gmail.com')
        cy.get('#open-text-area').type(longTest, {delay: 0})

        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {     // Exercício extra 02
        cy.get('#firstName').type('Lucas')
        cy.get('#lastName').type('Barros')
        cy.get('#email').type('cypress@gmail,com')
        cy.get('#open-text-area').type('TESTE')
        
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Inserindo valores nao-numéricos no campo telefone', function() {        // Exercício extra 03   
        cy.get('#phone')
          .type('abcdefghijklmnopqrstuvwyz')
          .should('have.value', '')       
        
        cy.contains('button', 'Enviar').click()
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {      // Exercício extra 04
        cy.get('#firstName').type('Lucas')
        cy.get('#lastName').type('Barros')
        cy.get('#email').type('cypress@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#phone').type('Erro')
        
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {         // Exercíco extra 05
        cy.get('#firstName')
        .type('Lucas')
        .should('have.value', 'Lucas')
        .clear()
        .should('have.value', '')
        
        cy.get('#lastName')
        .type('Barros')
        .should('have.value', 'Barros')
        .clear()
        .should('have.value', '')

        
        cy.get('#email')
        .type('cypress@gmail.com')
        .should('have.value', 'cypress@gmail.com')
        .clear()
        .should('have.value', '')

        cy.get('#open-text-area')
        .type('TESTE')
        .should('have.value', 'TESTE')
        .clear()
        .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {         // Exercício extra 06
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
     })

    it('envia o formulário com sucesso usando um comando customizado', function() {         // Exercício extra 7
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('utilizando comando cy.contains', function(){        // Exercício extra 08
        cy.contains('button', 'Enviar').click()
    })
})