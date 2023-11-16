const axios = require('axios');
const { Telegraf } = require('telegraf');
const { InputFile } = require('telegraf/typings/telegram-types');

const REMOVE_BG_API_KEY = 'kD****************************ZE';
const TOKEN = '631**********************************Pk';

// Dictionary to keep track of ongoing background removal processes
const ongoingProcesses = {};

const bot = new Telegraf(TOKEN);

bot.start((ctx) => {
  const userName = ctx.message.from.first_name;
  const welcomeMessage = `Hello, ${userName}! Welcome to the Background Removal Bot. Send an image to remove its background.`;
  ctx.reply(welcomeMessage);
});

bot.command('stop', (ctx) => {
  const userId = ctx.message.from.id;
  if (ongoingProcesses[userId]) {
    ongoingProcesses[userId].terminate();
    ctx.reply("Background removal process has been stopped.");
  } else {
    ctx.reply("No ongoing background removal process to stop.");
  }
});

bot.on('photo', async (ctx) => {
  const userId = ctx.message.from.id;

  if (ongoingProcesses[userId]) {
    ctx.reply("There is already an ongoing background removal process. Use /stop to stop it.");
    return;
  }

  const photo = ctx.message.photo.slice(-1)[0];
  const fileId = photo.file_id;
  const photoFile = await ctx.telegram.getFile(fileId);
  const photoUrl = `https://api.telegram.org/file/bot${TOKEN}/${photoFile.file_path}`;
  const response = await axios.get(photoUrl, { responseType: 'arraybuffer' });

  // Send a processing message
  const processingMessage = await ctx.reply("Processing the image...");

  ongoingProcesses[userId] = processingMessage;

  const removeBgResponse = await axios.post(
    'https://api.remove.bg/v1.0/removebg',
    response.data,
    {
      headers: { 'X-Api-Key': REMOVE_BG_API_KEY },
      responseType: 'arraybuffer',
    }
  );

  if (removeBgResponse.status === 200) {
    const editedImage = Buffer.from(removeBgResponse.data);

    // Send the edited image as a document
    await ctx.replyWithDocument({ source: editedImage, filename: 'edited_image.png' });

    // Send a completion message
    await processingMessage.delete();  // Remove the processing message
    ctx.reply("Background removal completed!");
  } else {
    await processingMessage.delete();  // Remove the processing message
    ctx.reply("Sorry, there was an error removing the background.");
  }

  // Remove the ongoing process reference
  delete ongoingProcesses[userId];
});

bot.launch();


// Note that you should install the required Node.js packages using:
//npm install telegraf axios
