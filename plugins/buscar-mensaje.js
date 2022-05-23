let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw 'Ingrese el mensaje que quiera buscar!'
    let split = text.split`|`
    let result = await conn.searchMessages(split[0], m.chat, split[1] ? split[1] : 7, 1)
    if (result.messages.length > 0) {
        let total = result.messages.length
        let sp = total < Number(split[1]) ? `Solo se encontró *${total}* mensaje` : `Se encontró *${total}* mensajes`
        m.reply(sp)

        result.messages.map(async ({ key }) => {
            let { remoteJid: _remoteJid, id: _ids } = key
            let _message = await conn.loadMessage(_remoteJid, _ids)
            conn.reply(m.chat, '🔍 Mensaje', _message)
        })
    }
}

handler.help = ['buscarmsg']
handler.tags = ['tools']
handler.command = /^(buscarmensaje|buscarmsg|searchmsg)$/i
handler.group = true

module.exports = handler
