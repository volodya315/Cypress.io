import Authorization from './AuthorizationSelectors'

class Setup {
    RandomInteger(max, min) {
        let rnd = min + Math.random() * (max + 1 - min)
        return Math.floor(rnd)
    }

    RandomEmail() {
        let usernames = ['username', 'qwerty', 'test', 'ivan', 'IvanIvanov', 'sample']
        let mailProvider = ['@yandex.ru', '@mail.ru', '@google.com', '@yahoo.com', '@inbox.ru']
        return usernames[this.RandomInteger(0, usernames.length)] + mailProvider[this.RandomInteger(0, mailProvider.length)]
    }

    AssertResponseCode200(request){
        cy.wait(request).then((response) => {
            expect(response.status).to.eq(200)
        })
    }

    Authorize(urlAssert) {
        cy.server()
        cy.route('POST', Authorization.xhrValidation).as('accounts')
        cy.get(Authorization.loginField).type(Authorization.login)
        cy.get(Authorization.submitButton).click()
        cy.get(Authorization.passwordField).type(Authorization.password)
        cy.get(Authorization.submitButton).click()
        cy.url().should('include', urlAssert)
        this.AssertResponseCode200('@accounts')
    }
}

export default Setup