let { MessageType } = require("@adiwajshing/baileys")
let fs = require ('fs')

let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i

let handler = async (m, { conn, text, isMods, isOwner, usedPrefix, command }) => {
	let link = (m.quoted ? m.quoted.text ? m.quoted.text : text : text) || text
	if (!link) throw `*Ingrese un enlace de WhatsApp o etiqueta uno*\n\n- Ejemplo: ${usedPrefix + command} https://chat.whatsapp.com/HCCbnCxZNP743g5vCyzYto`
    let [_, code] = link.match(linkRegex) || []
    if (!code) throw 'Enlace invalido!'
    if (isMods || isOwner || m.fromMe) {
    let faketumb = fs.readFileSync('./storage/image/menu.jpg')
    let res = await conn.query({ json: ["query", "invite", code], expect200: true })
    let { gid: target } = await conn.acceptInvite(code)
    conn.reply(m.chat, 'Me uní al grupo', m)
    let member = (await conn.groupMetadata(target)).participants.map(v => v.jid)
    let textjoin = `
Holii soy una bot loli 7w7, fuí invitado por *@${m.sender.split("@s.whatsapp.net")[0]}* para unirme a este grupo.


\t\t\t*‧ 🐋 Info del Grupo 🐋 ‧*

*• Grupo:* ${res.subject}
*• Jid:* ${res.id}
*• Creador:* @${res.id.split('-')[0]}
*• Creado:* ${formatDate(res.creation * 1000)}
*• Miembros:* ${res.size} Total


- Para ver mis comandos escriba *${usedPrefix}menu* uwu

La bot todavía está en *beta* y por lo tanto podría aver algunos errores/bugs
`.trim()
    let joinloc = await conn.prepareMessage(target, { jpegThumbnail: faketumb }, MessageType.location)
    let buttonss = [{ buttonId: 'Thanks', buttonText: { displayText: 'Welcome 🧃' }, type: 1 }]
    let buttonsMessagee = {
	locationMessage: joinloc.message.locationMessage,
    contentText: textjoin,
    buttons: buttonss,
    footerText: 'Lolibot - OFC',
    headerType: 6
    }
    await conn.sendMessage(target, buttonsMessagee, MessageType.buttonsMessage, { contextInfo: { mentionedJid: conn.parseMention(textjoin) } } )
}
}

handler.help = ['join']
handler.tags = ['premium']
handler.command = /^(join)$/i

handler.premium = true

module.exports = handler

function formatDate(n, locale = 'es') {
  let d = new Date(n)
  return d.toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
