const { MessageEmbed } = require('discord.js');

exports.run = async (bot, message, args) => {

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        let status;
        switch (user.presence.status) {
            case "online":
                status = "Online";
                break;
            case "dnd":
                status = "Não pertube";
                break;
            case "idle":
                status = "Ausente";
                break;
            case "offline":
                status = "Offline";
                break;
        }

        const embed = new MessageEmbed()
            .setTitle(`${user.user.username} Info`)
            .setColor(`#FFFFFF`)
            .setThumbnail(user.user.displayAvatarURL({dynamic : true}))
            .addFields(
                {
                    name: "Nick: ",
                    value: user.user.username,
                },
                {
                    name: "#️Hashtag: ",
                    value: `#${user.user.discriminator}`,
                },
                {
                    name: "ID: ",
                    value: user.user.id,
                },
                {
                    name: "Status: ",
                    value: status,
                },
                {
                    name: "Atividade: ",
                    value: user.presence.activities[0] ? user.presence.activities[0].name : `O usuário não está fazendo nada!`,
                },
                {
                    name: 'Avatar : ',
                    value: `[Clique Aqui!](${user.user.displayAvatarURL()})`
                },
                {
                    name: 'Conta criada em: ',
                    value: user.user.createdAt.toLocaleDateString("pt-BR"),
                },
                {
                    name: 'Entrou em: ',
                    value: user.joinedAt.toLocaleDateString("pt-BR"),
                },
                {
                    name: 'Cargos: ',
                    value: user.roles.cache.map(role => role.toString()).join(" ,"),
                }
            )

        await message.channel.send(embed)
    }

