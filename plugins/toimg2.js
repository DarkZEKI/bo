let fs = require('fs')

const {
    MessageType,
    Mimetype
} = require("@adiwajshing/baileys");
const anu = {
	key : {
           participant : '0@s.whatsapp.net'
                        },
       message: {
                    documentMessage: {
                    title: '© Toimg By LynnXzy', 
                    jpegThumbnail: false
                          }
                        }
                      }
let { webp2png } = require('../lib/webp2mp4')
let handler = async (m, { conn, usedPrefix, command }) => {
  if (!m.quoted) throw `balas stiker dengan perintah *${usedPrefix + command}*`
  let mime = m.quoted.mimetype || ''
  if (!/webp/.test(mime)) throw `balas stiker dengan perintah *${usedPrefix + command}*`
  let media = await m.quoted.download()
  let out = Buffer.alloc(0)
  if (/webp/.test(mime)) {
    out = await webp2png(media)
  }
  await conn.sendFile(m.chat, out, 'out.png', 'Selesai...', anu, false, { thumbnail: fs.readFileSync('./src/RadBot.png')})
}
handler.help = ['toimg2']
handler.tags = ['sticker']
handler.command = ['toimg2']
module.exports = handler
