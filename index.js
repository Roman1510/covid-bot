require("dotenv").config();
const TelegramApi = require("node-telegram-bot-api");
const token = process.env.API_KEY;
const covidApi = require("covid19-api");
const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const {flag, code, name, countries} = require('country-emoji');
//just have to implement the flags emoji, and the bot is complete

//this is just the code to keep the server alive
app.put("/", (req, res) => {
  return res.send("Received a PUT HTTP method");
});
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}}!`));

const bot = new TelegramApi(token, { polling: true });
bot.setMyCommands([
  {command:'/start',description:'Initializing'},
  {command:'/info',description:'Info'}
])
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;

  if (text === "/start") {
    await bot.sendSticker(
      chatId,
      "https://tlgrm.eu/_/stickers/393/4ef/3934efb0-bf26-4bd9-b826-08dea746eaf3/1.webp"
    );
    await bot.sendMessage(
      chatId,
      `Welcome to covid19 monitoring bot, just type the country name. For example: US, Poland, Germany etc.`
    );
  }
  if (text === "/info") {
    await bot.sendMessage(
      chatId,
      `${msg.chat.first_name} ${msg.chat.last_name || ""} just type the name of any country :)`
    );
  }
  if (text!=="/start"&&text!="/info") { //if text is not a command, this is a country
    try {
      const covidData = await covidApi.getReportsByCountries(text);
      const countryData = covidData[0][0];
      const countryName = countryData.country;
      const formatData = `
            Country: ${countryName.charAt(0).toUpperCase()+countryName.slice(1)} ${flag(countryName)}
            Cases: ${numberWithCommas(countryData.cases)}
            Deaths: ${numberWithCommas(countryData.deaths)}
            Cured: ${numberWithCommas(countryData.recovered)}`;
      await bot.sendMessage(chatId, formatData)  
    } catch(e) {
      await bot.sendMessage(chatId, "This country doesn't exist, please try again")  
    }
    
  }
});


