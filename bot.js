// Simple DiscordBot named Borat.
require("dotenv").config()
const Discord = require('discord.js')
const client = new Discord.Client()
const fetch = require("node-fetch");

// WEB Scraping.
const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Select by Xpath.
    const [el] = await page.$x('/html/body/div[2]/div/div[2]/div/div/div/div/div/div[2]/div/div[2]/div/div/div/div/div[2]/div/div/div[6]/span[2]');
    const txt = await el.getProperty('textContent');
    rawTxt = await txt.jsonValue();
    console.log(rawTxt);
    browser.close();
}
scrapeProduct('https://spectracure.se/');


// Random bot msg.
const bullBear = ["Bear-cert!", "Bull-cert!"]
// Console.log when up and & running.
client.on("ready", () => {
    console.log("The bot is up & running");
})

// Bot listen & answer.
client.on('message', msg => {
    if (msg.content === "borat") {
        msg.channel.send("Testa skriv bitcoin,cert eller joke")
    }
    if (msg.content === "cert") {
        let stockRandom = bullBear[Math.floor(Math.random() * bullBear.length)];
        msg.channel.send("köp " + stockRandom + ", den sitter 100%")
    }
})

// Fetch api & print message.
client.on('message', async msg => {
    if (msg.content === "bitcoin") {
        const response = await fetch("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,SEK");
        const currency = await response.json();
        let btnUS = currency.USD;
        msg.channel.send("Its booming man! " + btnUS + "$ right now!");
    }
    if (msg.content === "joke") {
        const response = await fetch("https://api.chucknorris.io/jokes/random");
        const fact = await response.json();
        let chuck = fact.value;
        msg.channel.send(chuck)
    }
    if (msg.content === "spectracure") {
        msg.channel.send("Hämtar data..");
        msg.channel.send("Spectracurs kurs är: " + rawTxt + "kr");
    }
});

client.login(process.env.BOT_TOKEN)