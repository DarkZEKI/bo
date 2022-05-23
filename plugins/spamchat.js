let handler = async(m, { conn, text }) => {

    if (!text) return conn.reply(m.chat, '*_Ingrese el texto que se enviará como spam!_*', m)

    let pesan = `${text}`
    await m.reply('*_INICIO DE SPAM!_*\n\n*_Nota: El Bot enviará el mensaje 30 veces_*')
    await m.reply(pesan)
    await m.reply(pesan)
    await m.reply(pesan)
    await m.reply(pesan)
    await m.reply(pesan)
    await m.reply(pesan)
    await m.reply(pesan)
    await m.reply(pesan)
    await m.reply(pesan)
    await m.reply(pesan)
    await m.reply(pesan)
    await m.reply(pesan)
    await m.reply(pesan)
    await m.reply(pesan)
    await m.reply(pesan)
    await m.reply(pesan)
    await m.reply(pesan)
    await m.reply(pesan)
    await m.reply(pesan)
    await m.reply(pesan)
    await m.reply(pesan)
    await m.reply(pesan)
    await m.reply(pesan)
    await m.reply(pesan)
    await m.reply(pesan)
    await m.reply(pesan)
    await m.reply(pesan)
    await m.reply(pesan)
    await m.reply(pesan)
    await m.reply(pesan)

}

handler.help = ['spamchat']
handler.tags = ['General']
handler.command = /^(spamchat)$/i
handler.premium = true

handler.fail = null

module.exports = handler
