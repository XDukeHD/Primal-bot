const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("../config.json");

module.exports.run = async (client,message,args) => {
let nome = new Discord.MessageEmbed()
        .setColor(0xFFFFFF)
        .setTitle("Ajuda")
        .setDescription(" <:seta:874304857182453770> **i!clear <quantidade>** \n <:seta:874304857182453770> **i!ban <Mencione o usuário> <Motivo>** \n <:seta:874304857182453770> **i!kick <Mencione o usuário> <Motivo>** \n <:seta:874304857182453770> **i!unban <ID do usuário>** \n <:seta:874304857182453770> **i!userinfo <Mencione o usuário>** \n <:seta:874304857182453770> **i!registro <Mencione o usuário>** \n <:seta:874304857182453770> **i!lock** \n <:seta:874304857182453770> **i!unlock** ")
        .setFooter("Primal™ - Credits: Patin™. Mikey_#0003")
        message.channel.send(nome)
}