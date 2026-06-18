import { test, expect } from '../../../fixtures/customFixtures';

test.describe('Happy Path - Inventory', () => {
    
    test.beforeEach(async ({ loginPage, inventoryPage, testUser }) => {
        await loginPage.open();
        await loginPage.login(testUser.username, testUser.password);
        await inventoryPage.verifyPage();
    });

    test('HP-004: Display all inventory items @smoke', 
        async ({ inventoryPage }) => {
        
        const count = await inventoryPage.getItemCount();
        expect(count).toBe(6);
        console.log(`✅ Displayed ${count} items`);
    });

    test('HP-005: Sort items by Name (A-Z) @smoke', 
        async ({ inventoryPage }) => {
        
        await inventoryPage.sortItems('az');
        const names = await inventoryPage.getItemNames();
        const sorted = [...names].sort();
        expect(names).toEqual(sorted);
        console.log('✅ Sorted A-Z correctly');
    });

    test('HP-006: Sort items by Name (Z-A)', 
        async ({ inventoryPage }) => {
        
        await inventoryPage.sortItems('za');
        const names = await inventoryPage.getItemNames();
        const sorted = [...names].sort().reverse();
        expect(names).toEqual(sorted);
        console.log('✅ Sorted Z-A correctly');
    });

    test('HP-007: Sort items by Price (Low to High)', 
        async ({ page, inventoryPage }) => {
        
        await inventoryPage.sortItems('lohi');
        const prices = await page.locator('[data-test="inventory-item-price"]').allTextContents();
        const priceValues = prices.map(p => parseFloat(p.replace('$', '')));
        const sorted = [...priceValues].sort((a, b) => a - b);
        expect(priceValues).toEqual(sorted);
        console.log('✅ Sorted by price Low to High correctly');
    });

    test('HP-008: Sort items by Price (High to Low)', 
        async ({ page, inventoryPage }) => {
        
        await inventoryPage.sortItems('hilo');
        const prices = await page.locator('[data-test="inventory-item-price"]').allTextContents();
        const priceValues = prices.map(p => parseFloat(p.replace('$', '')));
        const sorted = [...priceValues].sort((a, b) => b - a);
        expect(priceValues).toEqual(sorted);
        console.log('✅ Sorted by price High to Low correctly');
    });

    test('HP-009: View product details', 
        async ({ page, inventoryPage }) => {
        
        const names = await inventoryPage.getItemNames();
        expect(names.length).toBeGreaterThan(0);
        const name = names[0];
        
        await inventoryPage.clickItemByName(name);
        await expect(page).toHaveURL(/inventory-item.html/);
        console.log(`✅ Viewed details for: ${name}`);
    });
});