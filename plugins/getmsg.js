let handler = async (m, { conn, command, usedPrefix, text }) => {
    //let which = command.replace(/ver/i, '')
    if (!text) throw `Escriba ${usedPrefix}listmsg para ver la lista de mensajes!`
    let msgs = global.DATABASE._data.msgs
    let _msgs = global.DATABASE._data.msgs[text]
    if (_msgs == undefined) return m.reply(`El mensaje *${text}* no está registrado en la database!`)
    if (!text in msgs) throw `El mensaje *${text}* no esta registrado!`
    //let _m = await conn.serializeM(msgs[text])
    //await _m.copyNForward(m.chat, true)
    //let _msgs = global.DATABASE._data.msgs[text]
    await conn.copyNForward(m.chat, await conn.loadMessage(msgs[text].jid, msgs[text].idmsg), false, { quoted: m })
}

handler.help = ['getmsg']
handler.tags = ['database']
handler.command = /^(vermsg|getmsg|enviar)$/
//handler.rowner = true

module.exports = handler
