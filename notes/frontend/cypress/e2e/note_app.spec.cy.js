describe('Note app', function () {
  it('front page can be opened', function () {
    cy.visit('http://localhost:3001');
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      username: 'norov',
      name: 'Norov',
      password: 'admin',
    };
    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.contains('Notes');
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2022'
    );
  });

  it.skip('login form can be opened', function () {
    cy.visit('http://localhost:3001');
    cy.contains('login').click();
    cy.get('#username').type('norov');
    cy.get('#password').type('pasword');
    cy.get('#login-button').click();
  });

  it.skip('login fails with wrong password', function () {
    cy.contains('login').click();
    cy.get('#username').type('norov');
    cy.get('#passowrd').type('wrong passowrd');
    cy.get('#login-button');

    cy.get('.error')
      .should('contain', 'wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)');

    cy.get('html').should('not.contain', 'logged in');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'norov', password: 'admin' });
      cy.createNote({ content: 'note from cypress', important: false });
      cy.createNote({ content: 'first note', important: false });
      cy.createNote({ content: 'second note', important: false });
      cy.createNote({ content: 'third note', important: false });
    });

    it.skip('a new note can be created', function () {
      cy.contains('add note').click();
      cy.get('input').type('note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });

    describe('and several notes exist', function () {
      it('one of those can be made important', function () {
        cy.contains('second note').parent().find('button').click();

        cy.contains('second note').parent().find('button').click();
      });
    });
  });
});
