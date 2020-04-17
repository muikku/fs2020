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
  describe('When logged in', function(){
    beforeEach(function(){
      cy.login({ username: 'Markku', password:'todellahyvä' })
    })
    it('A blog can be created', function(){
      cy.contains('new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#blogSubmitButton').click()
      cy.contains('a new blog test title by test author added')
    })

    describe('...and a blog is made', function(){
      beforeEach(function(){
        cy.createBlog({ title: 'test_title', author:'test_author', url:'test_url' })
      })
      it('A can be liked', function(){
        cy.contains('test_title').click()
        cy.contains('test_title').parent().find('#blogLikeButton').click()
        cy.contains('likes 1')
      })
    })

    describe('...and many blogs are posted', function(){
      beforeEach(function(){
        for (let a = 0; a < 4; a++) {
          cy.createBlog({
            title: `test_title_${a}`,
            author:`test_author_${a}`,
            url: `test_url_${a}`
          })
        }
      })
      it('Blogs are ordered by likes', function(){
        for (let a = 0; a < 4; a++) {
          cy.contains(`test_author_${a}`).click()
        }
        for (let a = 0; a < 4; a++) {
          for (let b = 0; b < a; b++) {
            cy.contains(`test_author_${a}`).parent().find('#blogLikeButton').click()
            cy.wait(500)
            ///there is some flakyness here...
          }
        }
        for (let a = 0; a < 4; a++) {
          cy.get('#blogs').find('.blog').eq(a).contains(`likes ${3 - a}`)
        }
      })
    })
  })
})