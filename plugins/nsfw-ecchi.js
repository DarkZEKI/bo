const axios = require('axios')

let handler = async(m, { conn, usedPrefix, command }) => {
let chat = global.DATABASE._data.chats[m.chat]
if (!chat.nsfw) return m.reply(global.nsfw)
conn.reply(m.chat, wait, m)
let res = await axios("https://meme-api.herokuapp.com/gimme/ecchi")
let json = res.data
conn.sendFile(m.chat, json.url, 'ecchi', '*ECCHI*', m)
}

handler.help = ['ecchi']
handler.tags = ['nsfw']
handler.command = /^(ecchi)$/i

module.exports = handler
