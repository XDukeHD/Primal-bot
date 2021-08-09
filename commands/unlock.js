const Discord = require('discord.js');
exports.run = async (client, message, args) => {
		let avatar = message.author.avatarURL({ dynamic: true, format: "png", size: 1024 });
    if(!message.member.hasPermission('MANAGE_CHANNELS')) {
				const emb = new Discord.MessageEmbed();
		  emb.setTitle('<:erro:874306461134635029> ****|**** Ação negada!');
			emb.setColor('#FFFFFF')
			emb.setFooter(`${message.author.username}`, avatar)
			emb.setTimestamp()
        return message.reply(emb)
    }
    
    const embedlock = new Discord.MessageEmbed()
    .setTitle('<:yes:874305717228671068> - Canal desbloqueado com sucesso!')
		.setDescription('par bloquear reaja com 🔓')
    .setColor('FFFFFF')
    .setTimestamp()
    .setFooter(`${message.author.username}`, avatar)

    try {
      message.channel.updateOverwrite(message.guild.roles.cache.find(r => r.name === "@everyone"), {
				SEND_MESSAGES: true
		})
    }catch(e){
        message.message.inlineReply(`${e}`)
    }
    message.message.inlineReply(embedlock).then(msg => {
		const finish = msg.createReactionCollector((reaction, user) => reaction.emoji.name == `🔓` && user.id == message.author.id, {time: 60000 * 2})
		msg.react('🔓')

		finish.on('collect', r => {
		message.channel.updateOverwrite(message.guild.roles.cache.find(r => r.name === "@everyone"), {
				SEND_MESSAGES: false
		})
		embedlock.setTitle('<:yes:874305717228671068> - Canal bloqueado com sucesso')
		message.inlineReply(embedlock)
		})
		})
}

exports.config = {
	name: 'unlock',
	aliases: ['unlockchat'],
	category: 'moderação'
}