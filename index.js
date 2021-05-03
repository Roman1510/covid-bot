import { Telegraf } from 'telegraf'
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const path = require('path');
const token = '1778739993:AAGEOJzxf8uULadGkTBZ2oVmS1VM0B7sRpM'


app.use(express.static(path.join(__dirname, 'public')));
var jsonParser = bodyParser.json()

app.get('/json', function(req, res) {
    console.log("GET the json");
    console.log(req.body)
    res
        .status(200)
        .json( {"jsonData" : true,
        "response": `${req.body}`
      });
});

app.get('/file', function(req, res) {
    console.log("GET the file");
    res
        .status(200)
        .sendFile(path.join(__dirname, 'test.txt'));
});


const server = app.listen(process.env.PORT || 5000, () => {
  const port = server.address().port;
  console.log(`Express is working on port ${port}`);
});




//everything about bot starts here:
//----------------------------------------------------------------------------------------------------------------
const bot = new Telegraf(token)

bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()

bot.launch()

