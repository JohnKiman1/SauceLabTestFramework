// ✅ Correct import path
import { test, expect } from '../../../fixtures/customFixtures';

test.describe('Happy Path - Login', () => {
    
    test('HP-001: Standard user can login successfully @smoke', 
        async ({ loginPage, inventoryPage, testUser }) => {
        
        await loginPage.open();
        await loginPage.login(testUser.username, testUser.password);
        await inventoryPage.verifyPage();
        
        expect(await inventoryPage.getItemCount()).toBeGreaterThan(0);
    });

    test('HP-002: Problem user can login successfully @smoke', 
        async ({ loginPage, inventoryPage }) => {
        
        await loginPage.open();
        await loginPage.login('problem_user', 'secret_sauce');
        await inventoryPage.verifyPage();
    });

    test('HP-003: Performance glitch user can login @smoke', 
        async ({ loginPage, inventoryPage }) => {
        
        await loginPage.open();
        await loginPage.login('performance_glitch_user', 'secret_sauce');
        await inventoryPage.verifyPage();
    });
});