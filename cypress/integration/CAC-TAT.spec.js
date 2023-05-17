/// <reference types="Cypress" />

// Exercícios realizados com os comandos .visit/ .get/ .type/ .should/ .contains/.

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
        cy.get('#open-text-area').type(longTest, {delay: 25})

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

    it('utilizando comando cy.contains', function() {        // Exercício extra 08
        cy.contains('button', 'Enviar').click()
    })

// Exercícios utlilizando comando Select utilizando valores, índice e texto.

    it('selecionando um produto youtube', function() {          // Exercício 00
        cy.get('#product')
        .select("YouTube")
        .should('have.value', 'youtube')
    })

    it('selecionando um produto mentoria', function() {         // Exercício extra 01
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('selecionando um produto Blog', function() {        // Exercício extra 02
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

// Exercício realizado com o comando .check em campos RADIO's

    it('marca o tipo de atendimento "Feedback"', function() {       // Exercício 00
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {       // Exercício extra 01
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){         // Exercício 00
        cy.get('input[type="checkbox"]')
        .check().should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário com comando CHECK', function() {      // Exercício extra 01
        cy.get('input[type="checkbox"][value="phone"]')
        .check()
        .should('be.checked')
    })

// Upload de Arquivo Cypress

    it('selecione um arquivo da pasta fixtures', function() {      // Exercício 00
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {         // Exercício extra 01
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',function() {     // Exercício extra 02
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

// Lidando com links que abrem em outra aba

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {         // Exercício 00
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {      // Exercício extra 01
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')
    })
})