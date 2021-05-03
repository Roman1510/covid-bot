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

bot.command('quit', (ctx) => {
  // Explicit usage
  ctx.telegram.leaveChat(ctx.message.chat.id)

  // Using context shortcut
  ctx.leaveChat()
})

bot.on('text', (ctx) => {
  // Explicit usage
  ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`)

  // Using context shortcut
  ctx.reply(`Hello ${ctx.state.role}`)
})

bot.on('callback_query', (ctx) => {
  // Explicit usage
  ctx.telegram.answerCbQuery(ctx.callbackQuery.id)

  // Using context shortcut
  ctx.answerCbQuery()
})

bot.on('inline_query', (ctx) => {
  const result = []
  // Explicit usage
  ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result)

  // Using context shortcut
  ctx.answerInlineQuery(result)
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))