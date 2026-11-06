import { test as setup,expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";
import { standard } from "../data/users";
setup('authenticate', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    await login.goto();
    await login.login(standard.username,standard.password)
    await inventory.inventoryPageLoad();
    await page.context().storageState({path:"playwright/.auth/user.json"})
});
