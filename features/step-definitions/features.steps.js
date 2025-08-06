const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { expect } = require('chai');

let browser, page;

Given('the user navigates to {string}',{timeout: 30000}, async function (url) {
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

Then('return all the options from {string} in a menu', async function (listName) {
  const dynamicSelector =`#${listName}Menu li`
  const homepageList = await page.locator(dynamicSelector)
  const count = await homepageList.count();
  const optionlist = [];

  for (let i=0 ; i< count ; i++){
    optionlist.push(await homepageList.nth(i).innerText());

  }
console.log('isa list', optionlist);
await browser.close();
});

When('I select {string}', {timeout: 30000},async function (portfolio) {
  await page.getByRole('button', { name: portfolio }).click();
});

Then('the popup should be displayed and the contents of the popup should be correct', async function () {
  await page.getByRole('heading', { name: 'Portfolio Description' }).isVisible();
  });

When ('I enter investment amount as {string}', async function(invest){
 await page.getByPlaceholder('£1,000').fill(invest)
});

Then('verify the split in weight and amount in the table', async function () {
  let totalWeight=0;
  let totalAmount=0;
  for(let i=1; i<6 ; i++){
    const xpath = `//*[@id="starter-portfolios-app"]/div/div/div/div[2]/div[2]/div[1]/div[2]/section/div/div/div[1]/table/tbody/tr[${i}]/td[2]`;
    const weightText = await page.locator(xpath).innerText();
    const weightNumber = parseFloat(weightText.replace('%','').trim());
    totalWeight += weightNumber;
   // console.log(`Column ${i} value: ${weightNumber}%`);
  }
   //console.log(`Total Weight: ${totalWeight}%`);
   expect(totalWeight).to.equal(100);

  for(j=1; j<6; j++){
    const amountXpath = `//*[@id="starter-portfolios-app"]/div/div/div/div[2]/div[2]/div[1]/div[2]/section/div/div/div[1]/table/tbody/tr[${j}]/td[3]`;
    const amountText = await page.locator(amountXpath).innerText();
    const amountNumber = parseFloat(amountText.replace('£','').trim());
    totalAmount += amountNumber;
    //console.log(`Column ${j} value: ${amountNumber}`);
  }
  //console.log(`Total amount: ${totalAmount}`);
  expect(totalAmount).to.equal(1000);
});

  When('I click the {string} tab', async function (assetAllocation) {
    await page.getByRole('button', { name: assetAllocation }).click();
});

 Then('the pie chart and Risk level rating should be displayed', async function () {
   await page.getByRole('heading', { name: 'portfolio asset allocation' }).isVisible();
 });

 When('I click the {string} button in the popup', async function (buttonName) {
   await page.getByRole('button', { name: buttonName+' modal' }).click();
 });