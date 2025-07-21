describe('Assertions', () => {
    
    it('implicit assertion', () => {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        
        cy.url().should('include', 'orangehrmlive.com')
        .and('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        .and('contain', 'orangehrm')

        cy.title().should('include','OrangeHRM')

        
    })
})