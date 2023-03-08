const { Telegraf } = require('telegraf')
const fetch = require('node-fetch')
let token = '6185140982:AAGSqdrDGMl_1h2LMkoeKMICWZKbd8LbGu5M'
const bot = new Telegraf(token)

async function downloadFile(fileUrl) {
  const response = await fetch(fileUrl);
  const buffer = await response.buffer();
  return buffer;
}
function filter_cards(text) {
  const regex = /[0-9a-zA-Z]{16}[|][0-9a-zA-Z]{1,2}[|][A-ZA-Z0-9a-z]{2,4}[|][0-9a-z]{3}/g
  const matches = text.match(regex)
  return matches.join('\n')
}
bot.command('start', async (ctx) => {
  await ctx.reply('Reply /filter to message / document to filter.')
})

bot.command('filter', async (ctx) => {
  let text = ctx.message.text
  msglen = text.length
  if (msglen < 10) {
    text = ctx.message.reply_to_message.text
  }
  if (!text) {
    const document = ctx.message.reply_to_message.document
    const fileId = document.file_id;
    const file = await bot.telegram.getFile(fileId);
    const filePath = file.file_path;
    const fileUrl = `https://api.telegram.org/file/bot${token}/${filePath}`;
    const buffer = await downloadFile(fileUrl);
    text = buffer.toString('utf-8')
  }
  cards = filter_cards(text)
  const lines = cards.split('\n').length
  if (lines > 20) {
    const buffer = Buffer.from(cards, 'utf-8')
    const document = {
      source: buffer,
      filename: 'x' + lines + ' Filtered.txt'
    }
    await ctx.replyWithDocument(document,
      {
        caption: '<b>Total Filtered : ' + lines + '</b>',
        parse_mode: 'HTML'
      }
    )
  } else {
    await ctx.replyWithHTML('<code>' + cards + '</code>\n<b>Total Filtered : ' + lines + '</b>')
  }
})

bot.launch();
console.log('Bot Started.')
