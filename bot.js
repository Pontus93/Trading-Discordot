// Simple DiscordBot named Borat.
require("dotenv").config()
const Discord = require('discord.js')
const client = new Discord.Client()
const fetch = require("node-fetch");

// WEB Scraping.
const puppeteer = require('puppeteer');

// Random bot msg.
const bullBear = ["tjäna", "förlora"]
// Console.log when up and & running.
client.on("ready", () => {
    console.log("The bot is up & running");
})

// Bot listen & answer.
client.on('message', msg => {
    if (msg.content === "borat") {
        msg.channel.send("Testa skriv bitcoin,trading eller joke.");
        msg.channel.send("Du kan även skriva spectracure,prolight eller sinch.");
        msg.channel.send("Vill du lägga till fler? skriv till raketpontan.");
    }
    if (msg.content === "trading") {
        let stockRandom = bullBear[Math.floor(Math.random() * bullBear.length)];
        msg.channel.send("Idag kommer du " + stockRandom + " pengar på börsen.")
    }
    // WebScraper for Stocks.

})

// Fetch api/stockValue/bitcoinValue & prints message.
client.on('message', async msg => {
    if (msg.content === "bitcoin") {
        const response = await fetch("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,SEK");
        const currency = await response.json();
        let btnUS = currency.USD;
        msg.channel.send("Its a wild ride, " + btnUS + "$ right now!");
    }
    if (msg.content === "joke") {
        const response = await fetch("https://api.chucknorris.io/jokes/random");
        const fact = await response.json();
        let chuck = fact.value;
        msg.channel.send(chuck)
    }
    if (msg.content === "spectracure") {
        scrapeProduct('https://www.avanza.se/aktier/om-aktien.html/574898/spectracure');
    }
    if (msg.content === "sinch") {
        scrapeProduct('https://www.avanza.se/aktier/om-aktien.html/599956/sinch');
    }
    if (msg.content === "prolight") {
        scrapeProduct('https://www.avanza.se/aktier/om-aktien.html/741528/prolight-diagnostics')
    }
    if (msg.content === "aktie") {
    }
    async function scrapeProduct(url) {
        try {
            const browser = await puppeteer.launch({
                headless: true,
                defaultViewport: null,
                args: [
                    '--incognito',
                    '--no-sandbox',
                    '--single-process',
                    '--no-zygote',
                    '--disable-setuid-sandbox'
                ]
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

            browser.close();
        }
        catch (error) {
            console.log(error);
            msg.channel.send("something wrong with the WebScraper please contact my creator");
        }
        msg.channel.send("Nuvarande kurs: " + StockValue + "kr");
        msg.channel.send("Utveckling idag är: " + dailyProgressValue + "%");
        msg.channel.send("Omsättning idag: " + revenueValue + "kr");
        msg.channel.send("Utveckling i år: " + yearlyProgressValue + "%");
        msg.channel.send("-----------------------------------------");
    }
});

client.login(process.env.BOT_TOKEN)