# Background Removal Bot
## Overview

- The Background Removal Bot is a Telegram bot that allows users to remove the background from images. It utilizes the remove.bg API for background removal and is built using the Telegraf framework for Telegram bots and the Axios library for HTTP requests.
Prerequisites

Make sure you have Node.js installed on your system. You can install the required Node.js packages using the following command:

    npm install telegraf axios

- Configuration

      Obtain API keys:
          Telegram Bot Token: Create a new bot on Telegram and obtain the bot token.
          remove.bg API Key: Sign up on remove.bg to get your API key.

      Set up your environment:
          Replace '631**********************************Pk' with your Telegram bot token.
          Replace 'kD****************************ZE' with your remove.bg API key.

- Usage

  Start the bot:

      node your-bot-script.js

  Open Telegram and start a chat with your bot.

  Send an image to the bot to initiate the background removal process.

  To stop an ongoing background removal process, use the /stop command.

- Commands

      /start: Displays a welcome message.
      /stop: Stops the ongoing background removal process.

- How it works

      The user sends an image to the bot.
      The bot fetches the image file from Telegram.
      The image is processed using the remove.bg API to remove the background.
      The edited image is sent back to the user as a document.

- Note

      Make sure to handle your API keys securely.
      If there are issues, check your network connection and the remove.bg API status.

Enjoy using the Background Removal Bot!
