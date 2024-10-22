import { Telegraf, Markup } from 'telegraf';
import { config } from 'dotenv';

config();

const token = process.env.TOKEN;
const webAppUrl = process.env.WEB_APP_URL;

const bot = new Telegraf(token);

const getReferralLink = chatId => `https://t.me/wild_clicker_bot?startapp=${chatId}`;

const generateWildWorldButtons = payload =>
  Markup.inlineKeyboard([
    [Markup.button.webApp('Get wild!', `${webAppUrl}?startapp=${payload}`)],
    [Markup.button.callback('Invite friends!', 'invite_friend')],
  ]);

bot.command('start', context => {
  context.reply('Enter the WILD world!', generateWildWorldButtons(context.payload));
});

const sendInvite = context => {
  const referralLink = getReferralLink(context.chat.id);
  context.reply(
    `Get rich with me in this WILD world \n\n${referralLink}`,
    Markup.inlineKeyboard([[Markup.button.webApp('Get wild!', `${webAppUrl}?startapp=${context.payload}`)]]),
  );
};

bot.action('invite_friend', sendInvite);

bot.command('invite_friend', sendInvite);

bot.launch();
