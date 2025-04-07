Cypress.Commands.add('login', (email, password) => {
  cy.visit('https://qauto.forstudy.space/')
  cy.contains('Sign In').click()
  cy.get('#email').type(email)
  cy.get('#password').type(password, { sensitive: true })
  cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('createExpense', (carId) => {
  return cy.request({
    method: 'POST',
    url: 'https://qauto.forstudy.space/api/expenses',
    body: {
      carId: carId,
      type: "Refuel",
      amount: 50,
      mileage: 123456,
      price: 1200,
      date: new Date().toISOString().split('T')[0]
    },
    headers: {
      accept: 'application/json'
    }
  })
})

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
    if (options && options.sensitive) {
        options.log = false
        Cypress.log({
            $el: element,
            name: 'type',
            message: '*'.repeat(text.length),
        })
    }
    return originalFn(element, text, options)
})
