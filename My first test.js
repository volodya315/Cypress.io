import 'cypress-file-upload';

describe('My first cypress test', () => {
    it('Navigate to card editor', () => {
        cy.visit('https://vc-test.quirco.com/admin/cards/create')
    })

    function UploadImage(Value) {
        cy.fixture('images/test.png', 'base64').then(cyPng => {
            const files = [
                { fileName: 'test1-1.png', fileContent: cyPng, mimeType: 'image/png' },
            ];

            cy.get('.q-uploader__input').upload(files, { subjectType: 'input' })
            cy.get(Value).should('exist')
        })
    }

    it('Fill card\'s main inputs', () => {
        cy.get("input.q-field__native.q-placeholder[id^='qf_'][placeholder='Заголовок карточки']").type("CYPRESS TEST TOOL")
        cy.get(".vue-treeselect__input").type("1{enter}")
        cy.get('.q-checkbox').click()
        cy.get("input.q-field__native.q-placeholder[id^='qf_'][placeholder='Введите адрес для поиска на карте']").type("Пятигорск")
        cy.get(".map > :nth-child(1) > :nth-child(2)").click()
    })

    it('Upload wrapper image', () => {
        UploadImage('.del > .material-icons')
    })

    it('Fill card\'s secondary inputs', () => {
        cy.get('.controls > :nth-child(1)').click()
        cy.get('.controls > :nth-child(2)').click()
        cy.get('.controls > :nth-child(3)').click()
        cy.get('.controls > :nth-child(4)').click()
        cy.get('.vtitle').type("CYPRESS TEST TOOL")
        cy.get(':nth-child(2) > .vcontent').type("CYPRESS TEST TOOL")
        UploadImage('.vimage > .q-uploader > .q-uploader__list > .wrap');
        cy.get('.vvideo > .vcontent').type("https://youtu.be/2RC1vW6EIyA")
    })

    it('Save', () => {
        cy.get('.fill_edit > .bg-primary').click()
        cy.get('.noty_body').should('contain', 'Сохранено успешно!')
    })

})
