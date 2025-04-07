describe('Registration Form', () => {
    beforeEach(() => {
        cy.visit('https://qauto.forstudy.space/')
        cy.contains('Registration').click()
    })

    it('Empty fields - all required messages appear', () => {
        cy.get('button[type="submit"]').click()
        cy.contains('Name is required')
        cy.contains('Last name is required')
        cy.contains('Email required')
        cy.contains('Password required')
        cy.contains('Re-enter password required')
    })

    it('Invalid name and last name', () => {
        cy.get('#name').type('A')
        cy.get('#lastName').type('B')
        cy.get('button[type="submit"]').click()
        cy.contains('Name is invalid')
        cy.contains('Last name is invalid')
    })

    it('Invalid email format', () => {
        cy.get('#email').type('invalid-email')
        cy.get('button[type="submit"]').click()
        cy.contains('Email is incorrect')
    })

    it('Invalid password format', () => {
        cy.get('#password').type('abc', { sensitive: true })
        cy.get('button[type="submit"]').click()
        cy.contains('Password has to be from 8 to 15 characters long')
    })

    it('Passwords do not match', () => {
        cy.get('#password').type('Qwerty123!', { sensitive: true })
        cy.get('#repeatPassword').type('Different123!')
        cy.get('button[type="submit"]').click()
        cy.contains('Passwords do not match')
    })

    it('Successful registration', () => {
        const email = `test_${Date.now()}@mail.com`
        cy.get('#name').type('Test')
        cy.get('#lastName').type('User')
        cy.get('#email').type(email)
        cy.get('#password').type('Qwerty123!', { sensitive: true })
        cy.get('#repeatPassword').type('Qwerty123!')
        cy.get('button[type="submit"]').click()
        cy.url().should('include', '/panel')
    })
})