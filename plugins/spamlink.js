let { MessageType } = require("@adiwajshing/baileys")
let fs = require ('fs')

let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i

let handler = async (m, { conn, text, usedPrefix, command }) => {
	let link = (m.quoted ? m.quoted.text ? m.quoted.text : text : text) || text
	if (!link) throw `*Ingrese un enlace de WhatsApp o etiqueta uno*\n\n- Ejemplo: ${usedPrefix + command} https://chat.whatsapp.com/EphX7iaMsKj70m0BrZsmvw`
	let faketumb = fs.readFileSync('./storage/image/menu2.jpg')
    let [_, code] = link.match(linkRegex) || []
    if (!code) throw 'Enlace invalido!'
    let { gid: target } = await conn.acceptInvite(code)
    conn.reply(m.chat, 'Enviando spam!', m)
    let member = (await conn.groupMetadata(target)).participants.map(v => v.jid)
    let faker = {
  key: {
  remoteJid: 'status@broadcast',
   participant: '0@s.whatsapp.net'
  },
  message: {
   orderMessage: {
    status: 200,
    thumbnail: faketumb,
    surface: 200,
    message: '↷✦╎Lolibot - OFC╎💌˖ ⸙',
    orderTitle: '\n\n\n\n\n',
    sellerJid: '0@s.whatsapp.net'
   }
  }
 }

let _vote = conn.prepareMessageFromContent(target, {
"listMessage":  {
"title": "\t\t\t*‧ 🐋 Auto spam Bot 🐋 ‧*",
"description": `\nHemos detectado su enlace en uno de nuestros grupo por lo tanto se enviará spam automáticamente.\n\n*Grupo nro 1*\nhttps://chat.whatsapp.com/EphX7iaMsKj70m0BrZsmvw\n\n*Grupo nro 2*\nhttps://chat.whatsapp.com/EphX7iaMsKj70m0BrZsmvw`,
"buttonText": "Opciones",
"listType": "SINGLE_SELECT",
"sections": [
{
"rows": [
{
"title": 'OwO\n\n*Grupo nro 1*\nhttps://chat.whatsapp.com/EphX7iaMsKj70m0BrZsmvw\n\n*Grupo nro 2*\nhttps://chat.whatsapp.com/FVWUefIddjH5czTfujL2NA',
"rowId": 'lolibot'
},
{
"title": '7w7\n\n*Grupo nro 1*\nhttps://chat.whatsapp.com/EphX7iaMsKj70m0BrZsmvw\n\n*Grupo nro 2*\nhttps://chat.whatsapp.com/EphX7iaMsKj70m0BrZsmvw',
"rowId": 'lolibot'
}
]}]}}, { quoted: faker, contextInfo: { forwardingScore:999, isForwarded:true, mentionedJid: member } })
conn.relayWAMessage(_vote).then(v => conn.groupLeave(target))
}

handler.help = ['spamlink']
handler.tags = ['owner']
handler.command = /^(spamlink)$/i

handler.rowner = true

module.exports = handler
