import Setup from '../YandexAssets/Setup'
import letterSelectors from '../YandexAssets/LetterCompositionInputs'

describe('Simple letter compose testcase', () => {
    const Actions = new Setup()

    before(function () {
        cy.visit('https://mail.yandex.ru/compose')
        cy.get(letterSelectors.authorizeButton).contains('Войти').click({ force: true })
        Actions.Authorize('#compose')
    })

    beforeEach(function () {
        Cypress.Cookies.preserveOnce('yandexuid', 'yuidss')
    })

    it('Compose letter', () => {
        cy.server()
        cy.route('POST', 'https://mail.yandex.ru/web-api/do-send/liza1?_send=true').as('sendLetter')
        cy.get(letterSelectors.recepientInput).type(Actions.RandomEmail())
        cy.get(letterSelectors.topicInput).type('Automatically created letter')
        cy.get(letterSelectors.letterBody).type('Cypress test tool')
        cy.get(letterSelectors.sendButton).click()
        Actions.AssertResponseCode200('@sendLetter')
        cy.url().should('include', '#done')
        cy.wait(15000)
        cy.url().should('include', '#inbox')
    })
})