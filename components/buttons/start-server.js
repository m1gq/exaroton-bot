module.exports = {
  data: {
    name: 'start-server'
  },
  async execute(interaction, client, server) {
    server.start()
    await interaction.deferReply({
      fetchReply: true
    })

    await interaction.editReply({
      content: 'Server will be Up in a few seconds'
    })
  }
}
