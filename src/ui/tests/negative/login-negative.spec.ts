import { test, expect } from '../../fixtures/customFixtures';
import testData from '../../fixtures/test-data.json';

test.describe('Negative - Login', () => {
    
    test('NEG-001: Login with invalid credentials @smoke', 
        async ({ loginPage }) => {
        
        await loginPage.open();
        await loginPage.login(
            testData.invalidUser.username,
            testData.invalidUser.password
        );
        
        const errorMsg = await loginPage.getErrorMessage();
        expect(errorMsg).toContain(testData.messages.error.invalid_credentials);
        console.log('✅ Invalid login error displayed');
    });

    test('NEG-002: Login with empty username', 
        async ({ loginPage }) => {
        
        await loginPage.open();
        await loginPage.login('', testData.users.standard.password);
        
        const errorMsg = await loginPage.getErrorMessage();
        expect(errorMsg).toContain(testData.messages.error.username_required);
        console.log('✅ Empty username error displayed');
    });

    test('NEG-003: Login with empty password', 
        async ({ loginPage }) => {
        
        await loginPage.open();
        await loginPage.login(testData.users.standard.username, '');
        
        const errorMsg = await loginPage.getErrorMessage();
        expect(errorMsg).toContain(testData.messages.error.password_required);
        console.log('✅ Empty password error displayed');
    });

    test('NEG-004: Login with empty credentials', 
        async ({ loginPage }) => {
        
        await loginPage.open();
        await loginPage.login('', '');
        
        const errorMsg = await loginPage.getErrorMessage();
        expect(errorMsg).toContain(testData.messages.error.username_required);
        console.log('✅ Empty credentials error displayed');
    });

    test('NEG-005: Login with locked out user @smoke', 
        async ({ loginPage }) => {
        
        await loginPage.open();
        await loginPage.login(
            testData.users.locked.username,
            testData.users.locked.password
        );
        
        const errorMsg = await loginPage.getErrorMessage();
        expect(errorMsg).toContain(testData.messages.error.locked_out);
        console.log('✅ Locked out user error displayed');
    });

    test('NEG-006: Error message clears on next attempt', 
        async ({ loginPage }) => {
        
        await loginPage.open();
        
        // First attempt - invalid credentials
        await loginPage.login(
            testData.invalidUser.username,
            testData.invalidUser.password
        );
        
        // Verify error is displayed
        const isErrorDisplayed = await loginPage.isErrorDisplayed();
        expect(isErrorDisplayed).toBe(true);
        console.log('✅ Error is displayed');
        
        // Clear and try again with valid credentials
        await loginPage.clearUsername();
        await loginPage.clearPassword();
        await loginPage.login(
            testData.users.standard.username,
            testData.users.standard.password
        );
        
        // Wait for navigation to inventory
        await loginPage.waitForLoginComplete();
        
        // Error should be gone
        const isErrorStillDisplayed = await loginPage.isErrorDisplayed();
        expect(isErrorStillDisplayed).toBe(false);
        console.log('✅ Error cleared successfully');
    });
});