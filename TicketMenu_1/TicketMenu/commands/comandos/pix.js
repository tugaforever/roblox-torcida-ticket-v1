const Discord = require("discord.js")

module.exports = {
  name: "pix", // Coloque o nome do comando
  description: "Pix da loja.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    let embed = new Discord.EmbedBuilder()
    .setAuthor({ name: "Slim Arts | PIX", iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setTitle(`**PIX da Loja:**`)
    .setDescription(`・💸 PIX: `)
    .setFooter({ text: "All Copyright reserved for © Slim Arts" })
    .setColor("#a40000");

    interaction.reply({ embeds: [embed] })
  }
}