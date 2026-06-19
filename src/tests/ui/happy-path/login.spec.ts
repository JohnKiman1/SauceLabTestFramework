import { test, expect } from '../../../fixtures/customFixtures';
import testData from '../../../fixtures/test-data.json';

test.describe('Happy Path - Login', () => {
    
    test('HP-001: Standard user can login successfully @smoke', 
        async ({ loginPage, inventoryPage, testUser }) => {
        
        await loginPage.open();
        await loginPage.login(testUser.username, testUser.password);
        await inventoryPage.verifyPage();
        
        expect(await inventoryPage.getItemCount()).toBeGreaterThan(0);
        console.log('✅ Standard user logged in successfully');
    });

    test('HP-002: Problem user can login successfully @smoke', 
        async ({ loginPage, inventoryPage }) => {
        
        await loginPage.open();
        await loginPage.login(
            testData.users.problem.username,
            testData.users.problem.password
        );
        await inventoryPage.verifyPage();
        console.log('✅ Problem user logged in successfully');
    });

    test('HP-003: Performance glitch user can login @smoke', 
        async ({ loginPage, inventoryPage }) => {
        
        await loginPage.open();
        await loginPage.login(
            testData.users.performance_glitch.username,
            testData.users.performance_glitch.password
        );
        await inventoryPage.verifyPage();
        console.log('✅ Performance glitch user logged in successfully');
    });
});