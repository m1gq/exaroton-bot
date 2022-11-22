const { SlashCommandBuilder } = require('discord.js')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('restart')
    .setDescription("Restarts the Exaroton Server"),
  async execute(interaction, client, server) {
    const message = await interaction.deferReply({
      fetchReply: true
    })

    try {
      await server.restart()
      const newMessage = `Server Successfully Restarted`
      await interaction.editReply({
        content: newMessage,
        ephemeral: true
      })
    } catch(err) {
      console.error(err);
      await interaction.editReply({
        content: 'An error ocurred while Restarting the Server'
      })
    }
  }
}
