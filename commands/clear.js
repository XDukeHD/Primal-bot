const Discord = require("discord.js");

exports.run = async (client, message, args) => {

if(!message.member.hasPermission("MANAGE_MESSAGES"))

   return message.reply(`<:erro:874306461134635029> | Você não tem permissão para executar esse comando!`);

 const deleteCount = parseInt(args[0], 10);

 if (!deleteCount || deleteCount <1 || deleteCount >100)

   return message.reply(`<:erro:874306461134635029> | Forneça um número de 1 a 100 para executar esse comando!`);

   const fetched = await message.channel.messages.fetch({ limit: deleteCount + 1});

  message.channel

   .bulkDelete(fetched)

   message.channel.send(`**<:wastebasket:870787984964870146> - Clear** \n **${args[0]} Mensagens foram limpas nesse chat!**`)

   .catch(error => console.log(`Não foi possível deletar messagens devido a: ${error}`)

)

}