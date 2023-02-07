require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');
const birthdays = require('./birthdays.json');
const holidays = require('./holidays.json');
const token="5921202727:AAF_c7OE8W_TjJf1r_srYAn0au_Dz8CJrB0"
const bot = new TelegramBot(token, { polling: { interval: 2000 } });
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
const today = new Date().toISOString();
let currentDate = today.substring(5,10);
  const upcomingBirthdays = birthdays.filter((birthday) => {
    const bd = birthday.date.substring(5,10)
    console.log("Bdate:"+bd,"Todat:"+currentDate)
    return bd == currentDate;
  });

  return upcomingBirthdays;
};

const gatComingFeast=()=>{
  const today = new Date().toISOString();
let currentDate = today.substring(5,10);
  const comingFeast = holidays.filter((holiday) => {
    const bd = holiday.date.substring(5,10)
    console.log("Bdate:"+bd,"Todat:"+currentDate)
    return bd == currentDate;
  });

  return comingFeast;
}

setInterval(() => {
    const upcomingBirthdays = getUpcomingBirthdays();
    const comingFeast=gatComingFeast();
    comingFeast.forEach((holiday)=>{
      bot.sendMessage(-1001434326296, `Happy ${holiday.name} `)
    })
    upcomingBirthdays.forEach((birthday) => {
      bot.sendMessage(-1001434326296, `Hey, today is ${birthday.name}'s Birthday! 🎂 `);
    });
  }, 24 * 60 * 60 * 1000);