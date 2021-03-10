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
client.on('message', msg => {
    if (msg.content === "avanzarobot") {
        msg.channel.send("Testa skriv bitcoin,oilprice eller joke.");
        msg.channel.send("Du kan även skriva spectracure,sinch,tesla eller aktier för att kolla aktielistan.");
        msg.channel.send("Vill du lägga till fler? skriv till raketpontan.");
    }
})

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
    if (msg.content === "oilprice") { ScrapeOil('https://www.avanza.se/index/om-indexet.html/155722/olja') };
    // The bot will throw a ChuckNorris joke upon us.
    if (msg.content === "joke") {
        const response = await fetch("https://api.chucknorris.io/jokes/random");
        const fact = await response.json();
        let chuck = fact.value;
        msg.channel.send(chuck)
    }

    // The list of stocks available for scraping.
    if (msg.content === "aktier") {
        msg.channel.send("Svenska aktier redo att hämta data från");
        msg.channel.send("spectracure,hemcheck,nokia,sinch,prolight,shamaran,ericsson,mtg,kinnevik,thinfilm,topright");
        msg.channel.send("Amerikanska aktier redo att hämta data från");
        msg.channel.send("nio,tesla,fortinet,kla,airbnb");
    }

    // Swedish stocks.
    if (msg.content === "spectracure") { scrapeProduct('https://www.avanza.se/aktier/om-aktien.html/574898/spectracure'); }
    if (msg.content === "hemcheck") { scrapeProduct('https://www.avanza.se/aktier/om-aktien.html/739019/hemcheck-sweden'); }
    if (msg.content === "nokia") { scrapeProduct('https://www.avanza.se/aktier/om-aktien.html/82987/nokia-oyj'); }
    if (msg.content === "sinch") { scrapeProduct('https://www.avanza.se/aktier/om-aktien.html/599956/sinch'); }
    if (msg.content === "prolight") { scrapeProduct('https://www.avanza.se/aktier/om-aktien.html/741528/prolight-diagnostics'); }
    if (msg.content === "shamaran") { scrapeProduct('https://www.avanza.se/aktier/om-aktien.html/299178/shamaran-petroleum-corp'); }
    if (msg.content === "ericsson") { scrapeProduct('https://www.avanza.se/aktier/om-aktien.html/5240/ericsson-b'); }
    if (msg.content === "mtg") { scrapeProduct('https://www.avanza.se/aktier/om-aktien.html/5438/modern-times-group-b'); }
    if (msg.content === "kinnevik") { scrapeProduct('https://www.avanza.se/aktier/om-aktien.html/5369/kinnevik-b'); }
    if (msg.content === "thinfilm") { scrapeProduct('https://www.avanza.se/aktier/om-aktien.html/111916/thin-film-electronics'); }
    if (msg.content === "topright") { scrapeProduct('https://www.avanza.se/aktier/om-aktien.html/811372/topright-nordic'); }

    // American stocks.
    if (msg.content === "nio") { scrapeProduct('https://www.avanza.se/aktier/om-aktien.html/881354/nio-inc'); }
    if (msg.content === "tesla") { scrapeProduct('https://www.avanza.se/aktier/om-aktien.html/238449/tesla-inc'); }
    if (msg.content === "fortinet") { scrapeProduct('https://www.avanza.se/aktier/om-aktien.html/242850/fortinet-inc'); }
    if (msg.content === "kla") { scrapeProduct('https://www.avanza.se/aktier/om-aktien.html/3844/kla-corp'); }
    if (msg.content === "airbnb") { scrapeProduct('https://www.avanza.se/aktier/om-aktien.html/1163096/airbnb-inc'); }

    //

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
        }
        catch (error) {
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
            const [currentValueLive] = await page.$x('//*[@id="surface"]/div[3]/div/div/div/div/ul/li[6]/span[2]/span');
            const [currentRevenueLive] = await page.$x('//*[@id="surface"]/div[5]/div[2]/div[2]/div/div[2]/div[1]/span');
            const [yearlyProgressLive] = await page.$x('//*[@id="surface"]/div[5]/div[2]/div[6]/div/div/table/tbody/tr[4]/td[3]');
            const [dailyProgressLive] = await page.$x('//*[@id="surface"]/div[3]/div/div/div/div/ul/li[2]/div[2]/span[2]');

            const currentValue = await currentValueLive.getProperty('textContent');
            const currentRevenue = await currentRevenueLive.getProperty('textContent');
            const yearlyProgress = await yearlyProgressLive.getProperty('textContent');
            const dailyProgress = await dailyProgressLive.getProperty('textContent');

            StockValue = await currentValue.jsonValue();
            revenueValue = await currentRevenue.jsonValue();
            yearlyProgressValue = await yearlyProgress.jsonValue();
            dailyProgressValue = await dailyProgress.jsonValue();
            msg.channel.send("Nuvarande kurs: " + StockValue + "kr");
            msg.channel.send("Utveckling idag är: " + dailyProgressValue + "%");
            msg.channel.send("Omsättning idag: " + revenueValue + "kr");
            msg.channel.send("Utveckling i år: " + yearlyProgressValue + "%");
            msg.channel.send("-----------------------------------------");
            browser.close();
        }
        catch (error) {
            console.log(error);
            msg.channel.send("something wrong with the WebScraper please contact my creator.");
        }
    }
});

client.login(process.env.BOT_TOKEN);

