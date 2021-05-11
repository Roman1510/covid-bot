require("dotenv").config();
const TelegramApi = require("node-telegram-bot-api");
const token = process.env.API_KEY;
const covidApi = require("covid19-api");
const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();

//this is just the code to keep the server alive
app.put("/", (req, res) => {
  return res.send("Received a PUT HTTP method");
});
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}}!`));

const bot = new TelegramApi(token, { polling: true });
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
      "Welcome to covid19 monitoring bot, just type the country name. For example us, poland, germany etc."
    );
  }
  if (text === "/info") {
    await bot.sendMessage(
      chatId,
      `You are ${msg.chat.first_name} ${msg.chat.last_name || ""}`
    );
  }
  if (text) {
    try {
      const covidData = await covidApi.getReportsByCountries(text);
      const countryData = covidData[0][0];
      const formatData = `
            Country: ${countryData.country},
            Cases: ${countryData.cases},
            Deaths: ${countryData.deaths},
            Cured: ${countryData.recovered}
            ${countryData.flag}`;
      await bot.sendMessage(chatId, formatData)  
    } catch(e) {
      await bot.sendMessage(chatId, "This country doesn't exist, please try again")  
    }
    
  }
});


