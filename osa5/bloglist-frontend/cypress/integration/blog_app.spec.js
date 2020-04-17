describe('Blog app ', function() {
  const url = 'http://localhost:3000'
  this.beforeEach(function() {
    cy.request('POST', `${url}/api/testing/reset`)
    cy.visit(url)
  })
  it('Login is shown', function() {
    cy.contains('login')
    cy.contains('username')
    cy.contains('username')
  })
})