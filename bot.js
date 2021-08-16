// Simple tradingBot named.
require("dotenv").config()
const Discord = require('discord.js')
const client = new Discord.Client()
const fetch = require("node-fetch");

// WEB Scraping.
const puppeteer = require('puppeteer');

// Console.log when up and & running (npm start).
client.on("ready", () => {
    console.log("The bot is up & running");
})

// Bot listen & answer.
if (msg.content === "avanzarobot" || msg.content === "Avanzarobot") {
    msg.channel.send("Hej! Jag har tagit lite semester och väntar PM.. Men ni kan kolla kursen genom att skriva prolight");
}

// Fetch api/stockValue/bitcoinValue & prints message.
client.on('message', async msg => {

    // The bot will write liveBitcoinPrice in US$.
    if (msg.content === "bitcoin") {
        const response = await fetch("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,SEK");
        const currency = await response.json();
        let btnUS = currency.USD;
        msg.channel.send("Its a wild ride, " + btnUS + "$ right now!");
    }

    // The bot will write brentOilPrice in US$.
    if (msg.content === "oilprice") {
        ScrapeOil('https://www.avanza.se/index/om-indexet.html/155722/olja')
    };

    // The bot will throw a ChuckNorris joke upon us.
    if (msg.content === "joke") {
        const response = await fetch("https://api.chucknorris.io/jokes/random");
        const fact = await response.json();
        let chuck = fact.value;
        msg.channel.send(chuck)
    }

    // Swedish stocks.
    if (msg.content === "prolight") {
        scrapeProduct('http://mdweb.ngm.se/MDWebFront/detailview.html?locale=sv_SE&orderBookId=3NT5&isEquity=true');
    }

    // Test message.
    if (msg.content === "test") {
        msg.channel.send("message from local machine.");
    }

    // ScrapingFunction for oilPrice.
    async function ScrapeOil(url) {
        try {
            const browser = await puppeteer.launch({
                headless: true,
                defaultViewport: null,
                args: ["--no-sandbox"]
            });
            const page = await browser.newPage();
            await page.goto(url);

            // Select by Xpath.
            const [currentValueLive] = await page.$x('//*[@id="surface"]/div[2]/div/div/div/ul/li[3]/span[2]/span');
            const [yearlyProgressLive] = await page.$x('//*[@id="surface"]/div[3]/div[2]/div/div/div/table/tbody/tr[4]/td[3]');

            const currentValue = await currentValueLive.getProperty('textContent');
            const yearlyProgress = await yearlyProgressLive.getProperty('textContent');

            StockValue = await currentValue.jsonValue();
            yearlyProgressValue = await yearlyProgress.jsonValue();

            msg.channel.send("Nuvarande Pris: " + StockValue + "$");
            msg.channel.send("Utveckling i år: " + yearlyProgressValue + "%");
            msg.channel.send("-----------------------------------------");
            browser.close();
        } catch (error) {
            console.log(error);
            msg.channel.send("something wrong with the WebScraper please contact my creator.");
        }
    }

    // The scrapingFunction for stocks.
    async function scrapeProduct(url) {
        try {
            const browser = await puppeteer.launch({
                headless: true,
                defaultViewport: null,
                args: ["--no-sandbox"]
            });
            const page = await browser.newPage();
            await page.goto(url);

            // Select by Xpath.
            const [currentValueLive] = await page.$x('//*[@id="detailviewDiv"]/table/tbody/tr[2]/td/div/div[1]/div/table/tbody/tr[1]/td/div/div[2]/table/tbody/tr[1]/td/table/tbody/tr/td[6]/div');
            const currentValue = await currentValueLive.getProperty('textContent');
            StockValue = await currentValue.jsonValue();
            msg.channel.send("Nuvarande kurs: " + StockValue + "kr");

            browser.close();
        } catch (error) {
            console.log(error);
            msg.channel.send("something wrong with the WebScraper please contact my creator.");
        }
    }


    // Start scrapingInsiderBuissnes with interval of 1minute.
    if (msg.content === "insider") {
        setInterval(function () {
            scrapeInsiderBuy('https://marknadssok.fi.se/Publiceringsklient/sv-SE/Search/Search?SearchFunctionType=Insyn&Utgivare=prolight&PersonILedandeSt%C3%A4llningNamn=&Transaktionsdatum.From=&Transaktionsdatum.To=&Publiceringsdatum.From=&Publiceringsdatum.To=&button=search&Page=1', '2019-09-30');
            scrapeInsiderBuy('https://marknadssok.fi.se/Publiceringsklient/sv-SE/Search/Search?SearchFunctionType=Insyn&Utgivare=spectracure&PersonILedandeSt%C3%A4llningNamn=&Transaktionsdatum.From=&Transaktionsdatum.To=&Publiceringsdatum.From=&Publiceringsdatum.To=&button=search&Page=1', '2020-06-25');
        }, 60 * 1000);
    }

    // The scrapingFunction for insiderBuy.
    async function scrapeInsiderBuy(url, date) {
        try {
            const browser = await puppeteer.launch({
                headless: true,
                defaultViewport: null,
                args: ["--no-sandbox"]
            });
            const page = await browser.newPage();
            await page.goto(url);

            // Select by Xpath.
            const [currentDateLive] = await page.$x('//*[@id="grid-list"]/div[1]/div/table/tbody/tr[1]/td[1]');
            const [currentInsider] = await page.$x('//*[@id="grid-list"]/div[1]/div/table/tbody/tr[1]/td[3]');
            const [buyorSellOption] = await page.$x('//*[@id="grid-list"]/div[1]/div/table/tbody/tr[1]/td[6]');
            const [amountOfShares] = await page.$x('//*[@id="grid-list"]/div[1]/div/table/tbody/tr[1]/td[10]');
            const [companyNameLive] = await page.$x('//*[@id="grid-list"]/div[1]/div/table/tbody/tr[1]/td[2]');

            const currentDate = await currentDateLive.getProperty('textContent');
            const currentInsiderPerson = await currentInsider.getProperty('textContent');
            const buyorSellData = await buyorSellOption.getProperty('textContent');
            const shareAmount = await amountOfShares.getProperty('textContent');
            const companyName = await companyNameLive.getProperty('textContent');

            dateValue = await currentDate.jsonValue();
            insiderPersonValue = await currentInsiderPerson.jsonValue();
            buyorSellValue = await buyorSellData.jsonValue();
            shareAmountValue = await shareAmount.jsonValue();
            companyNameValue = await companyName.jsonValue();

            if (dateValue !== date) {
                msg.channel.send("Bolag: " + companyNameValue);
                msg.channel.send("Typ av Köp: " + buyorSellValue);
                msg.channel.send("Datum: " + StockValue);
                msg.channel.send("Insiderperson: " + insiderPersonValue);
                msg.channel.send("Antal aktier: " + shareAmountValue);
                msg.channel.send("-----------------------------------------");
                browser.close();
            } else {
                var date = new Date();
                let hour = date.getHours();
                let minute = date.getMinutes();
                console.log("Inga insiderköp: " + companyNameValue + " klockan: " + hour + ":" + minute);

            }
        } catch (error) {
            console.log(error);
            msg.channel.send("something wrong with the WebScraper please contact my creator.");
        }
    }
});

client.login(process.env.BOT_TOKEN);