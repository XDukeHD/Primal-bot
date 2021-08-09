const Discord = require('discord.js')

module.exports = {
    name: "unban",
//desbane umm user (by ferinha)

    run: async(client, message, args) => {

 if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`<a:xnao:870835284911206451> | ${message.author} Você precisa da permissão **BANIR MEMBROS** para utilizar este comando!`);
        let usu = args[0];

         if (!usu) return message.channel.send(`<a:xnao:870835284911206451> | ${message.author} Utilize o ID de alguém para desbanir!`);

        message.guild.members.unban(usu);

        message.channel.send(`<a:xyes:870835474049142815> | ${message.author} o usuário ${usu.user}> (\`${usu.user.id}\`) foi desbanido com sucesso!`)
    }
}