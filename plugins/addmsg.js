let handler = async (m, { command, usedPrefix, text }) => {
    //let M = m.constructor
    //let which = command.replace(/add/i, '')
    if (!m.quoted) throw 'Etiqueta un mensaje para añadir a la database!'
    if (!text) throw `Escriba *${usedPrefix}listmsg* para ver la lista de mensajes`
    let msgs = global.DATABASE._data.msgs
    if (text in msgs) throw `El nombre *${text}* ya está registrado en la database!`
    msgs[text] = { jid: m.chat, idmsg: m.quoted.id, mtype: m.quoted.mimetype == undefined ? m.quoted.mtype : m.quoted.mimetype }
    m.reply(`Se añadió el mensaje con el nombre *${text}*\n\nSi quieres ver el mensaje escriba ${usedPrefix}getmsg ${text}`)
}

handler.help = ['addmsg']
handler.tags = ['database']
handler.command = /^add|añadir(mensaje|msg)$/
//handler.rowner = true

module.exports = handler
