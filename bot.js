// Simple DiscordBot named Borat.
require("dotenv").config()
const Discord = require('discord.js')
const client = new Discord.Client()
const fetch = require("node-fetch");
const bullBear = ["Bear-cert!", "Bull-cert!"]

// Ready msg after Booting up the bot.
client.on("ready", () => {
    console.log("The bot is up & running");
})

// Fetch api.
client.on('message', async msg => {
    if (msg.content === "bitcoin") {
        const response = await fetch("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,SEK");
        const currency = await response.json();
        let btnUS = currency.USD;
        msg.channel.send("well, " + btnUS + " $ right now!");
    }
    if (msg.content === "joke") {
        const response = await fetch("https://api.chucknorris.io/jokes/random");
        const fact = await response.json();
        let chuck = fact.value;
        msg.channel.send(chuck)
    }

    // tsla api: http://api.marketstack.com/v1/eod?access_key=d92442c09f4f474761ef7fb5d99bb9eb&symbols=TSLA
    if (msg.content === "tesla") {
        const response = await fetch("http://api.marketstack.com/v1/eod?access_key=d92442c09f4f474761ef7fb5d99bb9eb&symbols=TSLA");
        const fact = await response.json();
        let tsla = fact.data;
        msg.channel.send(tsla)
    }
});

// Random msg
client.on('message', msg => {
    if (msg.content === "cert") {
        let stockRandom = bullBear[Math.floor(Math.random() * bullBear.length)];
        msg.channel.send("köp " + stockRandom + ", den sitter 100%")
    }
    if (msg.content === "borat") {
        msg.channel.send("Va? vad säger du mitt namn för? jag är inte så intressant!")
    }
    if (msg.content === "borat?") {
        msg.channel.send("Testa skriv bitcoin,cert eller joke")
    }
})

client.login(process.env.BOT_TOKEN)