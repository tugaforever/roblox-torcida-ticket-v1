const Discord = require("discord.js")
const config = require("./config.json")

const client = new Discord.Client({ intents: [1, 512, 32768, 2, 128] })

module.exports = client

client.on('interactionCreate', (interaction) => {

  if(interaction.type === Discord.InteractionType.ApplicationCommand){

      const cmd = client.slashCommands.get(interaction.commandName);

      if (!cmd) return interaction.reply(`Error`);

      interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

      cmd.run(client, interaction)

   }
})

client.on('ready', () => {
  console.log(`🔥 Estou online em ${client.user.username}!`)
})


client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(config.token)

/*------------------------- ENTROU/SAIU ---------------------------------*/

client.on("guildMemberAdd", (member) => {
    let canal_logs = "932324915137364080";
    if (!canal_logs) return;

    let setado = member.guild.roles.cache.get("932348283425271870")

    if (!setado) return console.log("Cargo não existe no servidor!")
        try {
            member.roles.add(setado.id)
        } catch (e) {
            console.log("AutoRole:\n"+e)
        }
  
    let embed = new Discord.EmbedBuilder()
    .setColor("Green")
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setTitle("👋 Boas Vindas!")
    .setDescription(`> Olá ${member}!\nSeja Bem-Vindo(a) ao servidor \`${member.guild.name}\`!\nAtualmente estamos com \`${member.guild.memberCount}\` membros.`);
  
    member.guild.channels.cache.get(canal_logs).send({ embeds: [embed], content: `${member}` }) // Caso queira que o usuário não seja mencionado, retire a parte do "content".
})

client.on("guildMemberRemove", (member) => {
    let canal_logs = "973017074202996778"; // Coloque o ID do canal de texto
    if (!canal_logs) return;
  
    let embed = new Discord.EmbedBuilder()
    .setColor("Red")
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setTitle(`Adeus ${member.user.username}....`)
    .setDescription(`> O usuário ${member} saiu do servidor!\n> 😄 Volte sempre!.\n> Nos sobrou apenas \`${member.guild.memberCount}\` membros.`);
  
    member.guild.channels.cache.get(canal_logs).send({ embeds: [embed], content: `${member}` }) // Caso queira que o usuário não seja mencionado, retire a parte do "content". 
})

/*---------------------------------------------------------------*/

/*------------------------- TICKET ------------------------------*/

client.on("interactionCreate", (interaction, member) => {
    if (interaction.isSelectMenu()) {
      if (interaction.customId === "painel_ticket") {
        let member = "||<@458751434909941772>||"
        let opc = interaction.values[0]
        if (opc === "t1") {
  
          let nome = `📨-${interaction.user.id}`;
          let categoria = "1005608812369166408" // Coloque o ID da categoria
  
          if (!interaction.guild.channels.cache.get(categoria)) categoria = null;
  
          if (interaction.guild.channels.cache.find(c => c.name === nome)) {
            interaction.reply({ content: `❌ Você já possui um ticket aberto --> ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
          } else {
            interaction.guild.channels.create({
            name: nome,
            type: Discord.ChannelType.GuildText,
            parent: categoria,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [
                  Discord.PermissionFlagsBits.ViewChannel
                ]
              },
              {
                id: interaction.user.id,
                allow: [
                  Discord.PermissionFlagsBits.ViewChannel,
                  Discord.PermissionFlagsBits.SendMessages,
                  Discord.PermissionFlagsBits.AttachFiles,
                  Discord.PermissionFlagsBits.EmbedLinks,
                  Discord.PermissionFlagsBits.AddReactions
                ]
              }
            ]
          }).then( (ch) => {
            interaction.reply({ content: `✅ Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
            let embed = new Discord.EmbedBuilder()
            .setColor("#a40000")
            .setDescription(`Olá ${interaction.user}, Você solicitou um ticket de **Compras**, Entraremos em contato o mais rápido possível, aguarde. Clique no botão vermelho para encerrar o ticket.`);
            let botao = new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
            .setCustomId("fechar_ticket")
            .setEmoji("🔒")
            .setStyle(Discord.ButtonStyle.Danger)
            );
  
            ch.send({ embeds: [embed], components: [botao], content: `${member}` })
          })
          }
          

          /*---------------------------- Orçamento ------------------------------------*/

        } else if (opc === "t2") {
          let nome = `📨-${interaction.user.id}`;
          let categoria = "1005608812369166408" // Coloque o ID da categoria
  
          if (!interaction.guild.channels.cache.get(categoria)) categoria = null;
  
          if (interaction.guild.channels.cache.find(c => c.name === nome)) {
            interaction.reply({ content: `❌ Você já possui um ticket aberto --> ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
          } else {
            interaction.guild.channels.create({
            name: nome,
            type: Discord.ChannelType.GuildText,
            parent: categoria,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [
                  Discord.PermissionFlagsBits.ViewChannel
                ]
              },
              {
                id: interaction.user.id,
                allow: [
                  Discord.PermissionFlagsBits.ViewChannel,
                  Discord.PermissionFlagsBits.SendMessages,
                  Discord.PermissionFlagsBits.AttachFiles,
                  Discord.PermissionFlagsBits.EmbedLinks,
                  Discord.PermissionFlagsBits.AddReactions
                ]
              }
            ]
          }).then( (ch) => {
            interaction.reply({ content: `✅ Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
            let embed = new Discord.EmbedBuilder()
            .setColor("#a40000")
            .setDescription(`Olá ${interaction.user}, Você solicitou um ticket de **Orçamento**, Entraremos em contato o mais rápido possível, aguarde. Clique no botão vermelho para encerrar o ticket.`);
            let botao = new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
            .setCustomId("fechar_ticket")
            .setEmoji("🔒")
            .setStyle(Discord.ButtonStyle.Danger)
            );
  
            ch.send({ embeds: [embed], components: [botao], content: `${member}` })
          })
          }
          

          /*---------------------------- Duvidas ------------------------------------*/

        } else if (opc === "t3") {
  
          let nome = `📨-${interaction.user.id}`;
          let categoria = "1005608812369166408" // Coloque o ID da categoria
  
          if (!interaction.guild.channels.cache.get(categoria)) categoria = null;
  
          if (interaction.guild.channels.cache.find(c => c.name === nome)) {
            interaction.reply({ content: `❌ Você já possui um ticket aberto --> ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
          } else {
            interaction.guild.channels.create({
            name: nome,
            type: Discord.ChannelType.GuildText,
            parent: categoria,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [
                  Discord.PermissionFlagsBits.ViewChannel
                ]
              },
              {
                id: interaction.user.id,
                allow: [
                  Discord.PermissionFlagsBits.ViewChannel,
                  Discord.PermissionFlagsBits.SendMessages,
                  Discord.PermissionFlagsBits.AttachFiles,
                  Discord.PermissionFlagsBits.EmbedLinks,
                  Discord.PermissionFlagsBits.AddReactions
                ]
              }
            ]
          }).then( (ch) => {
            interaction.reply({ content: `✅ Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
            let embed = new Discord.EmbedBuilder()
            .setColor("#a40000")
            .setDescription(`Olá ${interaction.user}, Você solicitou um ticket de **Duvidas**, Entraremos em contato o mais rápido possível, aguarde. Clique no botão vermelho para encerrar o ticket.`);
            let botao = new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
            .setCustomId("fechar_ticket")
            .setEmoji("🔒")
            .setStyle(Discord.ButtonStyle.Danger)
            );
  
            ch.send({ embeds: [embed], components: [botao], content: `${member}` })
          })
          }
          

          /*---------------------------- Parcerias ------------------------------------*/

        } else if (opc === "t4") {
    
            let nome = `📨-${interaction.user.id}`;
            let categoria = "1005608812369166408" // Coloque o ID da categoria
    
            if (!interaction.guild.channels.cache.get(categoria)) categoria = null;
    
            if (interaction.guild.channels.cache.find(c => c.name === nome)) {
              interaction.reply({ content: `❌ Você já possui um ticket aberto --> ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
            } else {
              interaction.guild.channels.create({
              name: nome,
              type: Discord.ChannelType.GuildText,
              parent: categoria,
              permissionOverwrites: [
                {
                  id: interaction.guild.id,
                  deny: [
                    Discord.PermissionFlagsBits.ViewChannel
                  ]
                },
                {
                  id: interaction.user.id,
                  allow: [
                    Discord.PermissionFlagsBits.ViewChannel,
                    Discord.PermissionFlagsBits.SendMessages,
                    Discord.PermissionFlagsBits.AttachFiles,
                    Discord.PermissionFlagsBits.EmbedLinks,
                    Discord.PermissionFlagsBits.AddReactions
                  ]
                }
              ]
            }).then( (ch) => {
              interaction.reply({ content: `✅ Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
              let embed = new Discord.EmbedBuilder()
              .setColor("#a40000")
              .setDescription(`Olá ${interaction.user}, Você solicitou um ticket de **Parcerias**, Entraremos em contato o mais rápido possível, aguarde. Clique no botão vermelho para encerrar o ticket.`);
              let botao = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
              .setCustomId("fechar_ticket")
              .setEmoji("🔒")
              .setStyle(Discord.ButtonStyle.Danger)
              );
    
              ch.send({ embeds: [embed], components: [botao], content: `${member}` })
            })
            }
            
        }
      }
    } else if (interaction.isButton()) {
      if (interaction.customId === "fechar_ticket") {
        interaction.reply(`Olá ${interaction.user}, este ticket será excluído em 5 segundos...`)
        setTimeout ( () => {
          try { 
            interaction.channel.delete()
          } catch (e) {
            return;
          }
        }, 5000)
      }
    }
})

/*---------------------------------------------------------------*/

/*------------------------- Anti-Link ---------------------------*/

const { QuickDB } = require("quick.db")
const db = new QuickDB(); // npm i quick.db better-sqlite3

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  let confirm = await db.get(`antilink_${message.guild.id}`);
  if (confirm === false || confirm === null) {
    return;
  } else if (confirm === true) {
    if (message.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return; // Caso o usuário tenha permissão de ADM, o bot vai permitir que o mesmo envie links
    if (message.content.toLocaleLowerCase().includes("http")) {
      message.delete()
      message.channel.send(`${message.author} Não envie links no servidor!`)
    }

  }
})

/*---------------------------------------------------------------*/