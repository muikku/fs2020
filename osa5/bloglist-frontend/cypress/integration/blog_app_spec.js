describe('Blog app', function() {
  const url = 'http://localhost:3000'
  const api = 'http://localhost:3003/api'
  this.beforeEach(function() {
    cy.request('POST', `${api}/testing/reset`)
    cy.request('POST', `${api}/users/`, { username: 'Markku', name: 'Esa', password: 'todellahyvä' })
    cy.visit(url)
  })
  it('Login is shown', function() {
    cy.contains('login')
    cy.contains('username')
    cy.contains('username')
  })
  describe('Login', function(){
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Markku')
      cy.get('#password').type('todellahyvä')
      cy.get('#login-button').click()
      cy.contains('Esa logged in')
    })
    it('fails with wrong password', function() {
      cy.get('#username').type('Markku')
      cy.get('#password').type('todellaväärin')
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'wrong username or password')
    })
  })
})