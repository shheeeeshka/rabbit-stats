import puppeteer from "puppeteer";

import { config } from "dotenv";

config();

export const sleep = (sec = 0) => new Promise(resolve => setTimeout(resolve, sec * 1000));

export async function parseWB(url = "") {
    if (!url) return;
    const executablePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
    const browser = await puppeteer.launch({
        headless: process.env.SHOW_BROWSER === "1" ? false : true,
        defaultViewport: false,
        timeout: 0,
        protocolTimeout: 0,
        // userDataDir: "./tmp",
        // executablePath,
    });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle0", timeout: 61000 });
    await page.setViewport({ width: 1820, height: 1080 });

    await sleep(5);

    const stats = await page.evaluate(() => {
        const reviewsCount = document.querySelector("#catalog > div.catalog-page__seller-details > div.seller-details > div.seller-details__info-wrap > div.seller-details__info > div.seller-details__param > span.seller-details__review")?.textContent.trim().split("").reverse().slice(16).reverse().join("").trim() || 0;
        const soldProductCount = document.querySelector("#catalog > div.catalog-page__seller-details > div.seller-details > div.seller-details__parameter-wrap > div > div:nth-child(2) > p.seller-details__parameter-value.seller-details__parameter-value--delivered")?.textContent?.trim() || 0;
        const totalProductCount = document.querySelector("#catalog-seller > span > span")?.textContent?.trim() || 0;

        return {
            reviewsCount,
            soldProductCount,
            totalProductCount,
        };
    });

    console.log(stats);

    await browser.close();
    return stats;
}

// parseWB("https://www.wildberries.ru/seller/3975354");