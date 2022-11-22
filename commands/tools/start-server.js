const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('start-server')
    .setDescription('Return a Button'),
  async execute(interaction, client) {
    const button = new ButtonBuilder()
      .setCustomId('start-server')
      .setLabel('Run Server')
      .setStyle(ButtonStyle.Primary)

      await interaction.reply({
        components: [new ActionRowBuilder().addComponents(button)]
      })
  }
}
