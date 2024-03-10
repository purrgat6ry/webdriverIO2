import { expect, browser, $ } from '@wdio/globals'

describe('Test Suite', () => {
    it('First test', async () => {
        await browser.url(`https://pastebin.com/`);

        const pageTitle = await browser.getTitle();
        expect(pageTitle).toEqual("Pastebin.com - #1 paste tool since 2002!")
    })
    
    it('Pastebin GIT', async () => {
        await $("#postform-text").setValue(`  
        git config --global user.name  "New Sheriff in Town"
        git reset $(git commit-tree HEAD^{tree} -m "Legacy code")
        git push origin master --force
        `);

        await $("#select2-postform-format-container").click();
        await browser.pause(1000);
        const optionBash = await $("//li[contains(text(), 'Bash')]");
        await optionBash.click();      

        await $("#select2-postform-expiration-container").click();
        await browser.pause(1000);
        const option10Minutes = await $("//li[contains(., '10 Minutes')]");
        await option10Minutes.click();
        
        await $("#postform-name").setValue("how to gain dominance among developers");
        await browser.pause(2000);

        await $("//button[normalize-space()='Create New Paste']").click();

        await browser.pause(3000);

    })

    it('Confirm Pastebin', async () => {
        const pageTitle = await browser.getTitle();
        expect(pageTitle).toExist("how to gain dominance among developers")

        const bashSyntax = await $("//a[@class='btn -small h_800']");
        expect(bashSyntax).toExist('Bash');

        const codeMatch = await $("//div[@class='content']//li[3]//div[1]");
        expect(codeMatch).toExist(`git reset $(git commit-tree HEAD^{tree} -m "Legacy code")`);

    })

})