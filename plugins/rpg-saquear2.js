let { MessageType } = require('@adiwajshing/baileys')

const cooldown = 10

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let _user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
    if (!text) throw `Etiqueta al usuario que quiera saquear!`
    let user = global.DATABASE._data.users[m.sender]
    let __timers = (new Date - user.lastraid)
    let _timers = (cooldown - __timers)
    let timers = clockString(_timers)
    
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
    if (new Date - user.lastraid > cooldown) {
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

handler.help = ['saquear']
handler.tags = ['premium']
handler.command = /^(saquear2|raidear2)$/i

handler.premium = true

handler.cooldown = cooldown

module.exports = handler

function clockString(seconds) {
  d = Math.floor(seconds / (1000 * 60 * 60 * 24));
  h = Math.floor((seconds / (1000 * 60 * 60)) % 24);
  m = Math.floor((seconds / (1000 * 60)) % 60);
  s = Math.floor((seconds / 1000) % 60);
  
  dDisplay = d > 0 ? d + (d == 1 ? " dia," : " Dias,") : "";
  hDisplay = h > 0 ? h + (h == 1 ? " hora, " : " Horas, ") : "";
  mDisplay = m > 0 ? m + (m == 1 ? " minuto, " : " Minutos, ") : "";
  sDisplay = s > 0 ? s + (s == 1 ? " segundo" : " Segundos") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
};
