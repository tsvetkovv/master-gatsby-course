const TelegramBot = require('node-telegram-bot-api');

function generateTgMessage({ order, total, ip, useragent, email, name }) {
  return `ip: ${ip}, useragent: <pre>${useragent}</pre>
${name} ${email} ordered for: 
${order
  .map((item) => `- ${item.size} <i>${item.name}</i> - ${item.price}`)
  .join('\n')}

Your total is <b>${total}</b>
  `;
}

function sendMessage(bot, { order, total, ip, useragent, email, name }) {
  const chatId = parseInt(process.env.TELEGRAM_CHAT_ID);
  return bot.sendMessage(
    chatId,
    generateTgMessage({
      order,
      total,
      email,
      name,
      ip,
      useragent,
    }),
    {
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }
  );
}

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);

  if (body.marpleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'boop beep bop ERR 23432',
      }),
    };
  }
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Missed the ${field} field`,
        }),
      };
    }
  }

  if (body.order.length < 1) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Add something`,
      }),
    };
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;

  const bot = new TelegramBot(token, { polling: false });
  const ipHeader = event.headers['client-ip'];
  const ip = ipHeader !== '::1' ? ipHeader : 'localhost';
  const useragent = event.headers['user-agent'];

  try {
    await sendMessage(bot, {
      order: body.order,
      total: body.total,
      ip,
      useragent,
      email: body.email,
      name: body.name,
    });
  } catch (e) {
    throw new Error(JSON.stringify(e.response.body));
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success!' }),
  };
};
