exports.run = async(client, message, args) => {
   switch(['857582004412612628', '711245964303663135', '479107440391225344'].includes(message.author.id)){
    case true:
      message.reply(
        ` \`\`\`js\n${eval(args.join(" "))}\`\`\` `
      );
    break;
    case false:
      message.reply(
        'Comando privado a equipe de desenvolvimento!'
      );
    break;
 };
};