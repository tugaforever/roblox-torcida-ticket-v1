const Discord = require("discord.js")

module.exports = {
    name: "clear", // Coloque o nome do comando
    description: "Limpe o canal de texto", // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'quantidade',
            description: 'Número de mensagens para serem apagadas.',
            type: Discord.ApplicationCommandOptionType.Number,
            required: true,
        }
    ],

    run: async (client, interaction) => {

        let numero = interaction.options.getNumber('quantidade')

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
        } else {

            if (parseInt(numero) > 99 || parseInt(numero) <= 0) {

                let embed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setDescription(`\`/clear [1 - 99]\``);

                interaction.reply({ embeds: [embed] })

            } else {

                interaction.channel.bulkDelete(parseInt(numero))

                let embed = new Discord.EmbedBuilder()
                    .setColor("#a40000")
                    .setAuthor({ name: "FAXINEIRO SLIM", iconURL: "https://cdn.discordapp.com/attachments/1033400992630321182/1035571818574131222/unknown.png" })
                    .setDescription(`Limpei \`${numero}\` mensagens do canal ${interaction.channel}`);

                interaction.reply({ embeds: [embed] })

                let apagar_mensagem = "nao" // sim ou nao

                if (apagar_mensagem === "sim") {
                    setTimeout(() => {
                        interaction.deleteReply()
                    }, 5000)
                } else if (apagar_mensagem === "nao") {
                    return;
                }

            }

        }

    }
}