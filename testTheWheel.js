const puppeteer = require("puppeteer");
const fs = require("fs");

const sleep = ms => new Promise(r => setTimeout(r, ms));


const singleRun = async () => {
  const browser = await puppeteer.launch({ headless: true }); // set to true for headless
  const page = await browser.newPage();

  console.log("Navigating to page…");
  await page.goto("https://wheelofnames.com/rxp-f8j", {
    waitUntil: "networkidle2",
  });

  // Wait a bit to make sure everything renders
  sleep(500);

  // Click the first canvas
  const canvas = await page.$("canvas");
  if (canvas) {
    await canvas.click();
    console.log("Clicked first canvas.");
  } else {
    console.error("No canvas found.");
    await browser.close();
    return;
  }

  await sleep(16000); // Wait for 16 seconds to allow the wheel to spin

  const winnerEl = await page.waitForSelector('.winner-text.text-h3'); // winner is populated after this select appears
  const winnerText = await winnerEl.evaluate(el => el.textContent.trim())

  if (winnerText) {
    console.log("Captured winner text:", winnerText);
  } else {
    await page.evaluate(() => { debugger; });
    console.log("No winner text found.");
    
  }

  await browser.close();
  return winnerText;
};

function arrayToCSV(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
        return "";
    }

    // Get headers from keys of the first object
    const headers = Object.keys(arr[0]);
    const csvRows = [headers.join(",")];

    for (const obj of arr) {
        const row = headers.map(header => {
            const val = obj[header];
            // Escape quotes if needed
            if (typeof val === "string" && val.includes(",")) {
                return `"${val.replace(/"/g, '""')}"`;
            }
            return val;
        });
        csvRows.push(row.join(","));
    }

    return csvRows.join("\n");
}

function writeCSVToFile(filename, arr) {
      const csv = arrayToCSV(arr);
      fs.writeFileSync(filename, csv, "utf8");
  }

const runTheTest = async () => {
  const runSize = parseInt(process.argv[2]);
  const arg3 = process.argv[3];
  let file = process.argv?.[4] || process?.argv[3] || 'output.csv';
  const batchSize = parseInt(process.argv[3]) || 1;
  let results = [];
  for (let i = 0; i < Math.ceil(runSize / batchSize); i++) {
    let testBatch = [];
    for (let j = 0; j < batchSize; j++) {
      testBatch.push(singleRun());
    }
    const resolvedBatch = await Promise.all(testBatch);
    results = results.concat(resolvedBatch);
  }
  const resultsObj = {};
  results.forEach((result) => {
    if (resultsObj[result]) {
      resultsObj[result] += 1;
    } else {
      resultsObj[result] = 1;
    }
  });
  const arr = Object.keys(resultsObj).map(key => {
    return { name: key, count: resultsObj[key] };
  });
  writeCSVToFile(file, arr);

};
runTheTest();

