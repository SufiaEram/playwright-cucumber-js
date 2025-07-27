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
  await page.waitForSelector('#row-article > div > div > div.result-list-items');
  const resultsVisible = await page.isVisible('#row-article > div > div > div.result-list-items');
  expect(resultsVisible).to.be.true;
  await browser.close();
});

When('the user hover over ISA', async function () {
  await page.getByRole('button', { name: 'ISAs' }).hover();
});

Then('return all the options in a list', async function () {

  const isalist = await page.locator('#isaAccountsMenu').getByRole('list')
  const count = await isalist.count();
  const optionlist = [];

  for (let i=0 ; i< count ; i++){
    optionlist.push(await isalist.nth(i).innerText());

  }
console.log('isa list', optionlist);
await browser.close();
});

