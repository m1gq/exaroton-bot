const { SlashCommandBuilder, Embed, EmbedBuilder } = require('discord.js')
const statusCode = {
  0  : "OFFLINE",
  1  : "ONLINE",
  2  : "STARTING",
  3  : "STOPPING",
  4  : "RESTARTING",
  5  : "SAVING",
  6  : "LOADING",
  7  : "CRASHED",
  8  : "PENDING",
  10 : "PREPARING"
}
module.exports = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription("Returns Server Status"),
  async execute(interaction, client, server) {
    const message = await interaction.deferReply({
      fetchReply: true
    })
    const status = await server.get()
    const embedMessage = new EmbedBuilder()
      .setTitle(`${status.name} | server`)
      .setDescription(`${status.motd}`)
      .setColor(0x3875f0)
      .addFields([
        {
          name: `IP Address`,
          value: `${status.address}`,
          inline: true
        },
        {
          name: `Active Players`,
          value: `${status.players.count}`,
          inline: true
        },
        {
          name: `Status`,
          value: `${statusCode[status.status]}`
        }
      ])

      await interaction.editReply({
        embeds: [embedMessage]
      })

    // try {
    //   await server.restart()
    //   const newMessage = `Server Successfully Restarted`
    //   await interaction.editReply({
    //     content: newMessage,
    //     ephemeral: true
    //   })
    // } catch(err) {
    //   console.error(err);
    //   await interaction.editReply({
    //     content: 'An error ocurred while Restarting the Server'
    //   })
    // }
  }
}
