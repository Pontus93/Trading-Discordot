// Simple DiscordBot named Borat.
require("dotenv").config()
const Discord = require('discord.js')
const client = new Discord.Client()
const fetch = require("node-fetch");
const boratsGirls = ["nikki", "angelique", "filippa", "jessica", "Emily", "Hannah", "Madison", "Ashley", "Sarah", "Alexis", "Samantha", "Jessica", "Elizabeth", "Taylor", "Lauren", "Alyssa", "Kayla", "Abigail", "Brianna", "Olivia", "Emma", "Megan", "Grace", "Victoria", "Rachel", "Anna", "Sydney", "Destiny", "Morgan", "Jennifer", "Jasmine", "Haley", "Julia", "Kaitlyn", "Nicole", "Amanda", "Katherine", "Natalie", "Hailey", "Alexandra", "Savannah", "Chloe", "Rebecca", "Stephanie", "Maria", "Sophia", "Mackenzie", "Allison", "Isabella", "Amber", "Mary", "Danielle", "Gabrielle", "Jordan", "Brooke", "Michelle", "Sierra", "Katelyn", "Andrea", "Madeline", "Sara", "Kimberly", "Courtney", "Erin", "Brittany", "Vanessa", "Jenna", "Jacqueline", "Caroline", "Faith", "Makayla", "Bailey", "Paige", "Shelby", "Melissa", "Kaylee", "Christina", "Trinity", "Mariah", "Caitlin", "Autumn", "Marissa", "Breanna", "Angela", "Catherine", "Zoe", "Briana", "Jada", "Laura", "Claire", "Alexa", "Kelsey", "Kathryn", "Leslie", "Alexandria", "Sabrina", "Mia", "Isabel", "Molly", "Leah", "Katie", "Gabriella", "Cheyenne", "Cassandra", "Tiffany", "Erica", "Lindsey", "Kylie", "Amy", "Diana", "Cassidy", "Mikayla", "Ariana", "Margaret", "Kelly", "Miranda", "Maya", "Melanie", "Audrey", "Jade", "Gabriela", "Caitlyn", "Angel", "Jillian", "Alicia", "Jocelyn", "Erika", "Lily", "Heather", "Madelyn", "Adriana", "Arianna", "Lillian", "Kiara", "Riley", "Crystal", "Mckenzie", "Meghan", "Skylar", "Ana", "Britney", "Angelica", "Kennedy", "Chelsea", "Daisy", "Kristen", "Veronica", "Isabelle", "Summer", "Hope", "Brittney", "Lydia", "Hayley", "Evelyn", "Bethany", "Shannon", "Michaela", "Karen", "Jamie", "Daniela", "Angelina", "Kaitlin", "Karina", "Sophie", "Sofia", "Diamond", "Payton", "Cynthia", "Alexia", "Valerie", "Monica", "Peyton", "Carly", "Bianca", "Hanna", "Brenda", "Rebekah", "Alejandra", "Mya", "Avery", "Brooklyn", "Ashlyn", "Lindsay", "Ava", "Desiree", "Alondra", "Camryn", "Ariel", "Naomi", "Jordyn", "Kendra", "Mckenna", "Holly", "Julie", "Kendall", "Kara", "Jasmin", "Selena", "Esmeralda", "Amaya", "Kylee", "Maggie", "Makenzie", "Claudia", "Kyra", "Cameron", "Karla", "Kathleen", "Abby", "Delaney", "Amelia", "Casey", "Serena", "Savanna", "Aaliyah", "Giselle", "Mallory", "April", "Raven", "Adrianna", "Christine", "Kristina", "Nina", "Asia", "Natalia", "Valeria", "Aubrey", "Lauryn", "Kate", "Patricia", "Jazmin", "Rachael", "Katelynn", "Cierra", "Alison", "Macy", "Nancy", "Elena", "Kyla", "Katrina", "Jazmine", "Joanna", "Tara", "Gianna", "Juliana", "Fatima", "Allyson", "Gracie", "Sadie", "Guadalupe", "Genesis", "Yesenia", "Julianna", "Skyler", "Tatiana", "Alexus", "Alana", "Elise", "Kirsten", "Nadia", "Sandra", "Dominique", "Ruby", "Haylee", "Jayla", "Tori", "Cindy", "Sidney", "Ella", "Tessa", "Carolina", "Camille", "Jaqueline", "Whitney", "Carmen", "Vivian", "Priscilla", "Bridget", "Celeste", "Kiana", "Makenna", "Alissa", "Madeleine", "Miriam", "Natasha", "Ciara", "Cecilia", "Mercedes", "Kassandra", "Reagan", "Aliyah", "Josephine", "Charlotte", "Rylee", "Shania", "Kira", "Meredith", "Eva", "Lisa", "Dakota", "Hallie", "Anne", "Rose", "Liliana", "Kristin", "Deanna", "Imani", "Marisa", "Kailey", "Annie", "Nia", "Carolyn", "Anastasia", "Brenna", "Dana", "Shayla", "Ashlee", "Kassidy", "Alaina", "Rosa", "Wendy", "Logan", "Tabitha", "Paola", "Callie", "Addison", "Lucy", "Gillian", "Clarissa", "Destinee", "Josie", "Esther", "Denise", "Katlyn", "Mariana", "Bryanna", "Emilee", "Georgia", "Deja", "Kamryn", "Ashleigh", "Cristina", "Baylee", "Heaven", "Ruth", "Raquel", "Monique", "Teresa", "Helen", "Krystal", "Tiana", "Cassie", "Kayleigh", "Marina", "Heidi", "Ivy", "Ashton", "Clara", "Meagan", "Gina", "Linda", "Gloria", "Jacquelyn", "Ellie", "Jenny"];
const bullBear = ["Bear-cert!", "Bull-cert!"]

client.on("ready", () => {
    console.log("The bot is up & running");
})

// Chuck Norris joke api. 
/*client.on('message', async msg => {
    if (msg.content === '?joke') {
        const response = await fetch("https://api.chucknorris.io/jokes/random");
        const fact = await response.json();
        let chuck = fact.value;
        msg.channel.send(chuck)
    }
});
*/

// Btn api.
client.on('message', async msg => {
    if (msg.content === "bitcoin") {
        const response = await fetch("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD");
        const currency = await response.json();
        let btn = currency.value;
        msg.channel.send(btn)
    }
});

// bitcoin api https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR

// Random silly msgs for friends.
client.on('message', msg => {
    if (msg.content === "bitcoin") {
        msg.channel.send("failure");
    }
    if (msg.content === "!dejt") {
        let specialGirl = boratsGirls[Math.floor(Math.random() * boratsGirls.length)];
        msg.channel.send("Klart man har tjej, hon heter " + specialGirl + " och gillar åka i min fiat uno")
    }
    if (msg.content === "!aktie") {
        let stockRandom = bullBear[Math.floor(Math.random() * bullBear.length)];
        msg.channel.send("köp " + stockRandom + ", den sitter 100%")
    }
    if (msg.content === "borat") {
        msg.channel.send("Va? vad säger du mitt namn för? jag är inte så intressant!")
    }
    /*if (msg.content === "?chucknorris") {
        var joke = JSON.parse(request.response).value.joke;
        document.getElementById("joke").innerHTML = joke;
        msg.channel.send(joke)
    }
*/
})

client.login(process.env.BOT_TOKEN)