let { MessageType } = require('@adiwajshing/baileys')

const cooldown = 0

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let _user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
    if (!text) throw `Etiqueta al usuario que quiera saquear!`
    let user = global.DATABASE._data.users[m.sender]
    let money = (Math.floor(Math.random() * 1000) + 500)
    let oak = (Math.floor(Math.random() * 50) + 50)
    let diamond = (Math.floor(Math.random() * 5) + 3)
    let gold = (Math.floor(Math.random() * 10) + 10)

let raid = `*Has saqueado 💰 a @${_user.split("@s.whatsapp.net")[0]}*
- Dinero: $${money}
- Madera: ${oak}
- Diamante: ${diamond}
- Oro: ${gold}
`
        global.DATABASE._data.users[_user].money -= money * 1
        global.DATABASE._data.users[_user].oak -= oak * 1
        global.DATABASE._data.users[_user].diamond -= diamond * 1
        global.DATABASE._data.users[_user].gold -= gold * 1
    
        global.DATABASE._data.users[m.sender].money += money * 1
        global.DATABASE._data.users[m.sender].oak += oak * 1
        global.DATABASE._data.users[m.sender].diamond += diamond * 1
        global.DATABASE._data.users[m.sender].gold += gold * 1
        global.DATABASE._data.users[m.sender].lastraid = new Date * 1
        m.reply(raid)
        m.reply(`*@${m.sender.split("@s.whatsapp.net")[0]}* Te acaba de saquear!`, _user)
    } else {
        conn.sendMessage(m.chat, 'Espere *' + timers + '* para volver a saquear', MessageType.text, { quoted: m })
    }
}

handler.help = ['saquear2']
handler.tags = ['rpg']
handler.command = /^(raidear2|saquear2)$/i

handler.cooldown = cooldown

handler.premium = true

module.exports = handler

  
};
