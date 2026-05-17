# Discord Welcome Bot

A Discord bot that sends a rich embed welcome message whenever a new member joins the server.

## Features

- Listens for new members joining the server
- Sends an embed message in the server's system channel with:
  - Member's avatar
  - Username and tag
  - Member count (their position in the server)

## Setup

1. Create a Discord bot at https://discord.com/developers/applications
2. Enable the **Server Members Intent** under Bot > Privileged Gateway Intents
3. Add the bot token as the `TOKEN` secret in Replit
4. Invite the bot to your server with the `bot` scope and `Send Messages` + `Embed Links` permissions
5. Make sure the server has a **System Channel** configured (Server Settings > Overview > System Messages Channel)

## Running

The bot starts automatically via the "Start application" workflow using:

```
node index.js
```

## User Preferences

- Bot token is stored as the `TOKEN` environment secret
