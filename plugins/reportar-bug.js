const { MessageType } = require('@adiwajshing/baileys')

let handler = async(m, { conn, text }) => {
    let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
    if (!teks) return conn.reply(m.chat, 'Ingrese un error/bug o etiqueta uno!', m)
    if (text > 300) return conn.reply(m.chat, 'El texto es demasiado largo, máximo 300 caracteres!', m)
    var nomor = m.sender
    const teks1 = `*_❒═════[ REPORTE ]═════╾❒_*\n*_┬_*\n*_├Numero: wa.me/${nomor.split("@s.whatsapp.net")[0]}_*\n*_┴_*\n*_┬_*\n*_├Mensaje: ${teks}_*\n*_┴_*`
    conn.sendMessage('5215634992998@s.whatsapp.net', teks1, MessageType.text)
    conn.reply(m.chat, 'El problema se envió al creador de la bot', m)
}
handler.help = ['bug']
handler.tags = ['info']
handler.command = /^(bug|report|reportar|reporte)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler
