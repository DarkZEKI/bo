const { mediafireDl } = require('../lib/mediafire.js')

let handler = async (m, { conn, text, args, isPrems, isOwner, usedPrefix, command }) => {
if (!text) return m.reply(`🔰Enviar link de descarga  ejemplo🔰 ${usedPrefix + command} *link mediafire*`)
if (!args[0].includes('mediafire.com')) return m.reply(error.linkmf)
let mdjon = args.join(' ')
res = await mediafireDl(mdjon)
result = `「 *MEDIAFIRE DOWNLOAD* 」
*DATOS OTENIDOS CON EXITO*
📛 Nombre : ${res[0].nama}
🗂 Tamaño : ${res[0].size}
💬 Link : ${res[0].link}
_Espere un momento mientras envio su archivo  🔰AGROMOS SP-BOT🔰_`
m.reply(result)

conn.sendFile(m.chat, res[0].link, res[0].nama, null, m, false, {asDocument:true, mimetype:res[0].mime})
}

handler.command = ['mediafire']

module.exports = handler
