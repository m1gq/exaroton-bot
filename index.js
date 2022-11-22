const dotenv = require('dotenv').config()
const { Client: ApiClient } = require('exaroton')
const fs = require('node:fs');
const wait = require('node:timers/promises').setTimeout;
const path = require('node:path');

const { Client, Collection, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
const apiClient = new ApiClient(process.env.API_TOKEN);

const server = apiClient.server('oQvGJv3o5v42RbvH')

client.commands = new Collection()
client.buttons = new Collection()
client.commandArray = []

const functionFolders = fs.readdirSync('./functions')
for ( const folder of functionFolders ) {
  const functionFiles = fs
    .readdirSync(`./functions/${folder}`)
    .filter(file => file.endsWith('.js'))
    for ( const file of functionFiles ) {
      require(`./functions/${folder}/${file}`)(client, server)
    }
}

client.handleEvents()
client.handleCommands()
client.handleComponents()
client.login(process.env.TOKEN)
