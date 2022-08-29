describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', '/api/testing/reset');
    cy.visit('http://localhost:3000');
  });

  describe('Before logging in', function () {
    it('Login form is shown per default', function () {
      cy.get('html').contains('login');
      cy.get('#login__input__username');
    });
  });

  describe('Logging in', function () {
    beforeEach(function () {
      const user = {
        username: 'testuser',
        name: 'Test User',
        password: 'password',
      };
      cy.request('POST', '/api/users', user);
    });

    it('succeeds with correct credentials', function () {
      cy.get('#login__input__username').type('testuser');
      cy.get('#login__input__password').type('password');
      cy.get('#login__button').click();

      cy.get('html').contains('Test User logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#login__input__username').type('testuser');
      cy.get('#login__input__password').type('wrongpassword');
      cy.get('#login__button').click();

      cy.get('html')
        .contains('wrong credentials')
        .parent()
        .should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      const user = {
        username: 'testuser',
        name: 'Test User',
        password: 'password',
      };
      const blog = {
        title: 'Test blog #1',
        author: 'Cypress',
        url: 'www.cypress.com',
      };
      cy.request('POST', '/api/users', user);
      cy.request('POST', '/api/login', {
        username: 'testuser',
        password: 'password',
      }).then((res) => {
        localStorage.setItem('loggedUser', JSON.stringify(res.body));
        cy.request({
          method: 'POST',
          url: '/api/blogs',
          auth: {
            bearer: JSON.parse(localStorage.getItem('loggedUser')).token,
          },
          body: blog,
        });
      });

      cy.visit('http://localhost:3000');
    });

    it('A blog can be created', function () {
      cy.get('html').contains('add blog').click();
      cy.get('#blog__form__input__title').type('Blog from Cypress');
      cy.get('#blog__form__input__author').type('Cypress');
      cy.get('#blog__form__input__url').type('www.cypress.com');
      cy.get('#blog__form__submit').click();
      cy.get('html').contains('Created');
      cy.request('GET', '/api/blogs').then(({ body }) => {
        cy.wrap(body).should('have.length', '2');
      });
    });

    it('The user can like a blog', function () {
      cy.get('#blog__view').click();
      cy.get('#blog__like').click();
    });

    it('The user can delete a blog', function () {
      cy.get('#blog__view').click();
      cy.get('#blog__like').click();
      cy.get('#blog__remove').click();
    });

    it.only('Another user cannot delete the blog', function () {
      cy.get('#user__logout').click();

      const user = {
        username: 'testuser2',
        name: 'Test User 2',
        password: 'password',
      };

      cy.request('POST', '/api/users', user);
      cy.request('POST', '/api/login', {
        username: 'testuser2',
        password: 'password',
      }).then((res) => {
        localStorage.setItem('loggedUser', JSON.stringify(res.body));
      });
      cy.get('#blog__view').click();
      cy.get('#blog__like').click();
      cy.get('#blog__remove').should('not.exist');
    });
  });
});
