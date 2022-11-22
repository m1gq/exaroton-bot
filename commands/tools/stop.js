const { SlashCommandBuilder } = require('discord.js')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription("Stops the Exaroton Server"),
  async execute(interaction, client, server) {
    const message = await interaction.deferReply({
      fetchReply: true
    })

    try {
      await server.stop()
      const newMessage = `Server Successfully Stopped`
      await interaction.editReply({
        content: newMessage,
        ephemeral: true
      })
    } catch(err) {
      console.error(err);
      await interaction.editReply({
        content: 'An error ocurred while Stopping the Server'
      })
    }
  }
}
