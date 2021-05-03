const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const path = require('path');
const TelegramBot = require('node-telegram-bot-api')

const token = '1778739993:AAGEOJzxf8uULadGkTBZ2oVmS1VM0B7sRpM'
const bot = new TelegramBot(token, { polling: true })

bot.onText(/\/echo (.+)/, (msg, match) => {

	const chatId = msg.chat.id
	const resp = match[1]
  
  
	bot.sendMessage(chatId, resp)
})
bot.onText(/\/хуй (.+)/, (msg, match) => {

	const chatId = msg.chat.id
	// const resp = match[1]
  
  
	bot.sendMessage(chatId, 'ПОШЁЛ НАХУЙ, ДОЛБАЕБ ИЗ КЗ')
})

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
