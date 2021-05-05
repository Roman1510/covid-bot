const { Telegraf } = require("telegraf");
const covidApi = require("covid19-api");
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

app.post("/", (req, res) => {
  return res.send("Received a POST HTTP method");
});

app.put("/", (req, res) => {
  return res.send("Received a PUT HTTP method");
});

app.delete("/", (req, res) => {
  return res.send("Received a DELETE HTTP method");
});

app.listen(PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);

const token = "1796374675:AAGaC0athyS7ofoDN8VtZunl_fHuxGL5JwA";
const bot = new Telegraf(token);
bot.on("text", async (ctx) => {
  try {
    const userText = ctx.message.text;
    const covidData = await covidApi.getReportsByCountries(userText);
    console.log(covidData);
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
bot.launch();
