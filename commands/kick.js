const Discord = require("discord.js");
module.exports = {
  name: "kick",
  //cmd por ferinha (esse cmd bane alg)

  run: async(client, message, args) => {
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`<:erro:874306461134635029> | ${message.author} Você precisa da permissão para **KICKAR MEMBROS** para utilizar este comando!`)

        const usu = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let reason = args.slice(1).join(" ");
        if (!reason) reason = "Nenhum motivo foi inserido!";


//-----------------------------------------|
const embed = new Discord.MessageEmbed()
        .setTitle(`🔨 Você foi kickado!`)
        .setThumbnail(message.guild.iconURL({dynamic : true}))
        .setDescription(`🔨 Servidor: \`${message.guild.name}\`
🔨 Motivo: ${reason}`)
        .setColor("FFFFFF")
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL({dynamic : true}));
//envia msg no pv da pessoa----------------|



        if (!args[0]) return message.channel.send(`<:erro:874306461134635029> | ${message.author} Menciona alguém ou utilize o ID de  alguém para kickar!`);

        if(!usu) return message.channel.send(`<:erro:874306461134635029> | ${message.author} Você não mencionou e nem utilizou um ID válido!`);

        if(!usu.bannable) return message.channel.send(`<:erro:874306461134635029> | ${message.author} Ops! Eu não tenho permissão para kickar este membro!`);

        const ferinha = new Discord.MessageEmbed()
        .setTitle(`🔨 Kick!`)
        .setThumbnail(usu.user.displayAvatarURL())
        .setDescription(`🔨 Kickado: ${usu.user} (\`${usu.user.id}\`)
🔨 Motivo: \`${reason}\`
🔨 Por: ${message.author} (\`${message.author.id}\`) `)
        .setColor("FFFFFF")
        .setTimestamp()
        .setFooter(message.author.tag, message.author.displayAvatarURL());

        await usu.send(embed);
        await usu.kick({
            reason: reason
        });
        
        
        message.channel.send(ferinha);
    }
}