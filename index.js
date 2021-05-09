require('dotenv').config();
const { Telegraf } = require("telegraf");
const covidApi = require("covid19-api");
const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();

//this is just the code to keep the server alive

app.put("/", (req, res) => {
  return res.send("Received a PUT HTTP method");
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}}!`));

//here it starts the Telegram-API
const token = process.env.API_KEY;
const bot = new Telegraf(token);
bot.on("text", async (ctx) => {
  try {
    const userText = ctx.message.text;
    const covidData = await covidApi.getReportsByCountries(userText);
    const countryData = covidData[0][0];
    const formatData = `
          Country: ${countryData.country},
          Cases: ${countryData.cases},
          Deaths: ${countryData.deaths},
          Cured: ${countryData.recovered}
          ${countryData.flag}`;

    ctx.reply(formatData);
  } catch (e) {
    ctx.reply("This country doesn't exist, please use  /help");
  }
});

bot.command("help", (ctx) =>
  ctx.reply(
    "Please just message me the name of the country, for example: us, germany, china etc..."
  )
);
bot.launch();
