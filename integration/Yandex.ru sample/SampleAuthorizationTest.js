import Setup from '../YandexAssets/Setup'
import Authorization from '../YandexAssets/AuthorizationSelectors'

describe('Simple authorization testcase', () => {
    const Actions = new Setup()

    it('Navigate to main page', () => {
        cy.visit('https://yandex.ru/')
    })

    it('Authorize', () => {
        cy.get(Authorization.authorizeButton).click()
        Actions.Authorize('#inbox')
    })
})