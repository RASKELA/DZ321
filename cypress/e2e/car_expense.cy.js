describe('Create car and expense flow', () => {
  let carId

  before(() => {
    cy.login('your@mail.com', 'Qwerty123!') // использовать кастомную команду login()
  })

  it('Create a car and intercept response to get ID', () => {
    cy.intercept('POST', '**/api/cars').as('createCar')

    cy.contains('Add car').click()
    cy.get('#carBrandId').select('BMW')
    cy.get('#carModel').type('M5')
    cy.get('#mileage').type('123456')
    cy.get('button[type="submit"]').click()

    cy.wait('@createCar').its('response.statusCode').should('eq', 201)
      .then(({ response }) => {
        carId = response.body.data.id
        expect(carId).to.exist
      })
  })

  it('Validate car is listed via GET /api/cars', () => {
    cy.request('GET', 'https://qauto.forstudy.space/api/cars').then(res => {
      expect(res.status).to.eq(200)
      const found = res.body.data.find(car => car.id === carId)
      expect(found).to.exist
      expect(found.model).to.eq('M5')
    })
  })

  it('Create expense for car using API', () => {
    cy.createExpense(carId).then(response => {
      expect(response.status).to.eq(201)
      expect(response.body.data.carId).to.eq(carId)
    })
  })

  it('Validate expense via UI', () => {
    cy.visit('https://qauto.forstudy.space/panel/garage')

    cy.contains('M5').click()
    cy.contains('Expenses').click()

    cy.get('.expenses__row').should('contain', 'Refuel')
  })
})