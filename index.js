require("dotenv").config();
const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const navigationPromise = page.waitForNavigation();

  await page.setViewport({ width: 1440, height: 767 });

  // Login page
  await page.goto(
    `https://secure2.convio.net/${
      process.env.ORG
    }/admin/AdminLogin?NEXTURL=https%3A%2F%2Fsecure2.convio.net%2Fsfaf%2Fadmin%2FAdminReports`
  );
  await navigationPromise;

  // @todo - record login process here
  // ...
  // ...

  //Navigate to Reports page
  await page.goto(
    `https://secure2.convio.net/${process.env.ORG}/admin/AdminReports`
  );
  await navigationPromise;

  // COLLAPSE all report folders on the Report Selection Screen
  await page.waitForSelector(
    "tbody > tr > td > .treeButtons > #ReportTreeCloseAll"
  );
  await page.click("tbody > tr > td > .treeButtons > #ReportTreeCloseAll");
  await navigationPromise;

  // EXPAND all report folders on the Report Selection Screen
  await page.waitForSelector(
    "tbody > tr > td > .treeButtons > #ReportTreeOpenAll"
  );
  await page.click("tbody > tr > td > .treeButtons > #ReportTreeOpenAll");
  await navigationPromise;

  // Click on 'Participant Performance Report'
  await page.waitForSelector(
    "tr:nth-child(35) > .ListItem0 > .backed > tbody > tr > .TreeViewName > a"
  );
  await page.click(
    "tr:nth-child(35) > .ListItem0 > .backed > tbody > tr > .TreeViewName > a"
  );
  await navigationPromise;

  await browser.close();
})();
