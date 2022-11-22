const { SlashCommandBuilder } = require('discord.js')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('start')
    .setDescription("Starts the Exaroton Server"),
  async execute(interaction, client, server) {
    const message = await interaction.deferReply({
      fetchReply: true
    })

    try {
      await server.start()
      const newMessage = `Server Successfully Started`
      await interaction.editReply({
        content: newMessage,
        ephemeral: true
      })
    } catch(err) {
      console.error(err);
      await interaction.editReply({
        content: 'An error ocurred while Starting the Server'
      })
    }
  }
}
