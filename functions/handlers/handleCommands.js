const fs = require('fs')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v10')
const { GUILD_ID, CLIENT_ID, TOKEN } = process.env

module.exports = (client) => {
  client.handleCommands = async () => {
      const commandFolders = fs.
        readdirSync('./commands')
      for ( const folder of commandFolders) {
        const commandFiles = fs.
          readdirSync(`./commands/${folder}`)
          .filter(file => file.endsWith('.js'))

          const { commands, commandArray } = client
          for ( const file of commandFiles ) {
            const command = require(`../../commands/${folder}/${file}`)
            if ('data' in command && 'execute' in command) {
              commands.set(command.data.name, command)
              commandArray.push(command.data.toJSON())
            }
          }
      }
      const rest = new REST({ version: '10'}).setToken(TOKEN)

      try {
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
          body: client.commandArray
        })

        console.log("Successfully reloaded application (/) commands.");
      } catch(err) {
        console.error(err);
      }
  }
}
