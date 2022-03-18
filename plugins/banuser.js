let { MessageType, mentionedJid } = require("@adiwajshing/baileys");

let handler = async (m, { conn, text}) => {
    let teks = m.quoted.sender ? m.quoted.sender : m.quoted.sender && m.mentionedJid[0] ? m.quoted.sender : m.mentionedJid[0]
    if (!teks) throw 'Etiqueta a alguien del grupo!'
    let users = global.DATABASE._data.users
    users[teks].banned = true
    conn.sendMessage(m.chat, `*🔕 El usuario @${teks.split("@s.whatsapp.net")[0]} fue baneado*\n\n- Ahora ya no podrá utilizar los comandos`, MessageType.text, { quoted: m, contextInfo: { mentionedJid: [teks] } })
}

handler.help = ['banuser']
handler.tags = ['owner']
handler.command = /^(banuser)$/i
handler.rowner = true

module.exports = handler
