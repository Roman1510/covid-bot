const { Telegraf } = require("telegraf");
const covidApi = require("covid19-api");

const token = "1778739993:AAGEOJzxf8uULadGkTBZ2oVmS1VM0B7sRpM";


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