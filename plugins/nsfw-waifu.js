let axios = require("axios")

let handler = async (m, { conn, usedPrefix, command }) => {
let chat = global.DATABASE.data.chats[m.chat]
if (chat.nsfw) {
conn.reply(m.chat, wait, m)
let res = await axios("https://api.waifu.pics/nsfw/waifu")
let json = res.data
conn.sendFile(m.chat, json.url, 'hwaifu', '*WAIFU*', m)
} else m.reply('En este grupo no se permite el contenido +18')
}

handler.help = ['hwaifu']
handler.tags = ['nsfw']
handler.command = /^(hwaifu)$/i
handler.limit = true

module.exports = handler