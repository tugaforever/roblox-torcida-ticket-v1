const Discord = require("discord.js")

module.exports = {
  name: "ticket", // Coloque o nome do comando
  description: "Abra o painel de tickets.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true })
    } else {
        let embed = new Discord.EmbedBuilder()
            .setAuthor({ name: "Slim Arts | Ticket", iconURL: client.user.displayAvatarURL() })
            .setDescription("• Para iniciar seu **Ticket** escolha uma **opção** abaixo.")
            .setFooter({ text: "Lembre-se não abra um ticket sem necessidade" })
            .setColor("#a40000")

        let painel = new Discord.ActionRowBuilder().addComponents(
            new Discord.SelectMenuBuilder()
            .setCustomId("painel_ticket")
            .setPlaceholder("Em que podemos te ajudar?")
            .addOptions(
                {
                    label: "💰 Comprar",
                    description: "Ticket para efetuar compras.",
                    value: "t1"
                },
                {
                    label: "📈 Fazer orçamento",
                    description: "Ticket para orçamento/preço.",
                    value: "t2"
                },
                {
                    label: "❓ Duvidas",
                    description: "Ticket para tirar duvidas de produtos.",
                    value: "t3"
                },
                {
                    label: "🤝 Parcerias",
                    description: "Ticket para fechar parcerias/divulgação.",
                    value: "t4"
                }
            )
        );

        interaction.reply({ content: `✅ Mensagem enviada!`, ephemeral: true })
        interaction.channel.send({ embeds: [embed], components: [painel] })
    }


  }
}