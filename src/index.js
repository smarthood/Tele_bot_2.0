require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');
const birthdays = require('./birthdays.json');
const bot = new TelegramBot(process.env.token, { polling: { interval: 2000 } });
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userName= msg.chat.last_name;
  bot.sendMessage(chatId, "welcome  "+userName+"✨ ");
  bot.sendMessage(chatId, "Type /list to see your friends birthday!!");
});

  bot.onText(/\/list/, (msg) => {
  
    const chatId = msg.chat.id;
    birthdays.forEach(printlist);
    function printlist(item) {
      bot.sendMessage(chatId, item.name+" | "+item.date);
    }
  });

  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log("running...")
   
  });
const getUpcomingBirthdays = () => {
const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${day}-${month}`;
  const upcomingBirthdays = birthdays.filter((birthday) => {
    const bd = new Date(birthday.date);
    const bdd= `${bd.getDate()}-${bd.getMonth()}`
    return bdd == currentDate;
  });

  return upcomingBirthdays;
};

setInterval(() => {
    const upcomingBirthdays = getUpcomingBirthdays();
    upcomingBirthdays.forEach((birthday) => {
      bot.sendMessage(-1001434326296, `Hey, today is ${birthday.name}'s Birthday! 🎂 `);
    });
  }, 24 * 60 * 60 * 1000);