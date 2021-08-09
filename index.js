const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log('Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}');
  response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online

const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client
const config = require("./config.json");//Pegando o prefixo do bot para respostas de comandos



client.on("ready", () => {
  let activities = [
      `Utilize ${config.prefix}help para obter ajuda`,
      `${client.guilds.cache.size} servidores!`,
      `${client.channels.cache.size} canais!`,
      `${client.users.cache.size} usuários!`
    ],
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "WATCHING"
      }), 1000 * 60); 
  client.user
      .setStatus("dnd")
      .catch(console.error);
console.log("Estou Online!")
}); 

client.on('message', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
    console.error('Erro:' + err);
  }
}); 

const { APIMessage, Structures } = require("discord.js");

class Message extends Structures.get("Message") {
    async inlineReply(content, options) {
        const mentionRepliedUser = typeof ((options || content || {}).allowedMentions || {}).repliedUser === "undefined" ? true : ((options || content).allowedMentions).repliedUser;
        delete ((options || content || {}).allowedMentions || {}).repliedUser;

        const apiMessage = content instanceof APIMessage ? content.resolveData() : APIMessage.create(this.channel, content, options).resolveData();
        Object.assign(apiMessage.data, { message_reference: { message_id: this.id } });
    
        if (!apiMessage.data.allowed_mentions || Object.keys(apiMessage.data.allowed_mentions).length === 0)
            apiMessage.data.allowed_mentions = { parse: ["users", "roles", "everyone"] };
        if (typeof apiMessage.data.allowed_mentions.replied_user === "undefined")
            Object.assign(apiMessage.data.allowed_mentions, { replied_user: mentionRepliedUser });

        if (Array.isArray(apiMessage.data.content)) {
            return Promise.all(apiMessage.split().map(x => {
                x.data.allowed_mentions = apiMessage.data.allowed_mentions;
                return x;
            }).map(this.inlineReply.bind(this)));
        }

        const { data, files } = await apiMessage.resolveFiles();
        return this.client.api.channels[this.channel.id].messages
            .post({ data, files })
            .then(d => this.client.actions.MessageCreate.handle(d).message);
    }
}

Structures.extend("Message", () => Message);



client.on("messageDelete", async (messageDelete) => {
    
    
  await Discord.Util.delayFor(900);
  const fetchedLogs = await messageDelete.guild.fetchAuditLogs({
    limit: 6,
    type: 'MESSAGE_DELETE'
  }).catch(() => ({
    entries: []
  }));

  const auditEntry = fetchedLogs.entries.find(a =>
    a.target.id === messageDelete.author.id &&
    a.extra.channel.id === messageDelete.channel.id &&
    Date.now() - a.createdTimestamp < 20000
  );
  if(messageDelete.author.id === '771448431092432906' || messageDelete.author.id === '297153970613387264' || messageDelete.author.id === '635610722994356275') return;
  const executor = auditEntry ? auditEntry.executor.tag : 'Unknown';
  const DeleteEmbed = new Discord.MessageEmbed()
     .setTitle("MENSAGEM APAGADA")
    .setColor("#FF0000")
    .setDescription(`****Canal de texto:**** ${messageDelete.channel}`)
    .addField("Usuário:", `<@${messageDelete.author.id}>`, false)
    .addField("Mensagem:", `\`\`\`${messageDelete.content}\`\`\`` || "menssagem embed/especial")
    

  const DeleteChannel = client.channels.cache.get('870451611066052660');

        if (messageDelete.author.bot) return;
        if (messageDelete.content.includes(`${config.prefix}`)) return;
  DeleteChannel.send(DeleteEmbed);
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
if(oldMessage.content === newMessage.content) return;

const embEditMessage = new Discord.MessageEmbed()
.setTitle('MENSAGEM EDITADA')
.setDescription(`****Canal de texto:**** <#${oldMessage.channel.id}>`)
.setColor('#FF0000')
.addField(`****Usuário:****`, `<@${oldMessage.author.id}>`, true)
.addField(`****Mensagem antiga:****`, `\`\`\`${oldMessage.content}\`\`\``, false)
.addField(`****Mensagem nova:****`, `\`\`\`${newMessage.content}\`\`\``, false)

const logChannel = client.channels.cache.get('870451611066052660')
logChannel.send(embEditMessage)
});


client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;


    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();


    if(comando === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! A Latência é de ${m.createdTimestamp - message.createdTimestamp} ms.`)
    }
 



})





client.login(config.token); //Ligando o Bot caso ele consiga acessar o token 