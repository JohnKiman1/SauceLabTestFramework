// ✅ Correct import for tests in src/tests/ui/negative/
import { test, expect } from '../../../fixtures/customFixtures';

test.describe('Negative - Login', () => {
    
    test('NEG-001: Login with invalid credentials @smoke', 
        async ({ loginPage }) => {
        
        await loginPage.open();
        await loginPage.login('invalid_user', 'wrong_password');
        
        const errorMsg = await loginPage.getErrorMessage();
        expect(errorMsg).toContain('Username and password do not match');
        console.log('✅ Invalid login error displayed');
    });

    test('NEG-002: Login with empty username', 
        async ({ loginPage }) => {
        
        await loginPage.open();
        await loginPage.login('', 'secret_sauce');
        
        const errorMsg = await loginPage.getErrorMessage();
        expect(errorMsg).toContain('Username is required');
        console.log('✅ Empty username error displayed');
    });

    test('NEG-003: Login with empty password', 
        async ({ loginPage }) => {
        
        await loginPage.open();
        await loginPage.login('standard_user', '');
        
        const errorMsg = await loginPage.getErrorMessage();
        expect(errorMsg).toContain('Password is required');
        console.log('✅ Empty password error displayed');
    });

    test('NEG-004: Login with empty credentials', 
        async ({ loginPage }) => {
        
        await loginPage.open();
        await loginPage.login('', '');
        
        const errorMsg = await loginPage.getErrorMessage();
        expect(errorMsg).toContain('Username is required');
        console.log('✅ Empty credentials error displayed');
    });

    test('NEG-005: Login with locked out user @smoke', 
        async ({ loginPage }) => {
        
        await loginPage.open();
        await loginPage.login('locked_out_user', 'secret_sauce');
        
        const errorMsg = await loginPage.getErrorMessage();
        expect(errorMsg).toContain('locked out');
        console.log('✅ Locked out user error displayed');
    });

    test('NEG-006: Error message clears on next attempt', 
        async ({ loginPage }) => {
        
        await loginPage.open();
        
        // First attempt - invalid credentials
        await loginPage.login('invalid', 'invalid');
        
        // Verify error is displayed
        const isErrorDisplayed = await loginPage.isErrorDisplayed();
        expect(isErrorDisplayed).toBe(true);
        console.log('✅ Error is displayed');
        
        // Clear and try again with valid credentials
        await loginPage.clearUsername();
        await loginPage.clearPassword();
        await loginPage.login('standard_user', 'secret_sauce');
        
        // ✅ FIXED: Use the helper method instead of accessing page directly
        await loginPage.waitForLoginComplete();
        
        // Error should be gone
        const isErrorStillDisplayed = await loginPage.isErrorDisplayed();
        expect(isErrorStillDisplayed).toBe(false);
        console.log('✅ Error cleared successfully');
    });
});