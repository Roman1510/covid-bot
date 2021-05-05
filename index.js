const { Telegraf } = require("telegraf");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const covidApi = require("covid19-api");

//const app = express(); yet to be used
const token = "1796374675:AAGaC0athyS7ofoDN8VtZunl_fHuxGL5JwA";


const bot = new Telegraf(token);
bot.on('text', async (ctx) => {
  try {
      const userText = ctx.message.text
      const covidData = await covidApi.getReportsByCountries(userText)
      console.log(covidData)
      const countryData = covidData[0][0]
      const formatData = `
          Country: ${countryData.country},
          Cases: ${countryData.cases},
          Deaths: ${countryData.deaths},
          Cured: ${countryData.recovered}
          ${countryData.flag}`
          
      ctx.reply(formatData)
  } catch(e) {
      ctx.reply('This country doesn\'t exist, please use  /help')
  }
})
bot.launch()