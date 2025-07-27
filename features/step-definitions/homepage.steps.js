const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { expect } = require('chai');

let browser, page;

Given('the user navigates to {string}', async function (url) {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto(url);
  await page.getByRole('button', { name: 'Accept all' }).click();
});

When('the user types {string} in the search box', async function (query) {
  await page.getByRole('button', { name: 'Search' }).click();
  await page.fill('input[id="searchInput"]', query);
  await page.press('input[id="searchInput"]', 'Enter');
});

Then('the user should see search results', async function () {
  await page.waitForSelector('#row-hub_flexible');
  const resultsVisible = await page.isVisible('#row-hub_flexible');
  expect(resultsVisible).to.be.true;
  await browser.close();
});

When('the user hovers over {string}', async function (menuName) {
 await page.getByRole('button', { name: menuName }).hover();
});

Then('return all the options from {string} in a list', async function (listName) {
  const dynamicSelector =`#${listName}AccountsMenu li`
  const homepageList = await page.locator(dynamicSelector)
  const count = await homepageList.count();
  const optionlist = [];

  for (let i=0 ; i< count ; i++){
    optionlist.push(await homepageList.nth(i).innerText());

  }
console.log('isa list', optionlist);
await browser.close();
});