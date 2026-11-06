import { test as base, expect } from "@playwright/test";
import { InventoryPage } from "../pages/inventory.page";
import { CartPage } from "../pages/cart.page";
import { CheckoutPage } from "../pages/checkout.page";
export const test = base.extend({
    inventory: async({page},use)=>{
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage)
    },
    cart: async({page},use)=>{
        const cartPage = new CartPage(page);
        await use(cartPage)
    },
    checkout: async({page},use)=>{
        const checkoutPage = new CheckoutPage(page)
        await use(checkoutPage)
    },
    // Wraps test.step and attaches a full-page screenshot once the step completes
    step: async({page},use,testInfo)=>{
        await use(async(name, body)=>{
            return base.step(name, async()=>{
                const result = await body();
                await testInfo.attach(`${name} - screenshot`, {
                    body: await page.screenshot({ fullPage: true }),
                    contentType: 'image/png'
                });
                return result;
            });
        });
    }
})

export {expect}