let handler = async (m, { command, usedPrefix, text }) => {
    let which = command.replace(/del/i, '')
    if (!text) throw `Usar *${usedPrefix}list${which}* para ver la lista`
    let msgs = global.DATABASE._data.msgs
    let _msgs = global.DATABASE._data.msgs[text]
    if (_msgs == undefined) return m.reply(`El mensaje *${text}* no está registrado en la database!`)
    if (!text in msgs) throw `'${text}' no registrado en la lista de mensajes`
    delete msgs[text]
    m.reply(`Eliminó con éxito el mensaje en la lista de mensajes con el nombre '${text}'`)
}

handler.help = ['delmsg']
handler.tags = ['database']
handler.command = /^(delmsg|delmensaje)$/
//handler.rowner = true

module.exports = handler
