let handler = async (m, { conn, usedPrefix }) => {
    let chats = Object.entries(global.DATABASE._data.chats).filter(chat => chat[1].isBanned)
    let users = Object.entries(global.DATABASE._data.users).filter(user => user[1].banned)
    m.reply(`\t\t\t\t*‧ 📝 Lista de Baneados 📝 ‧*

*Grupos*
*Total:* ${chats.length} Chats${chats ? '\n\n' + chats.map(([jid], i) => `*• Grupo:* ${conn.getName(jid) == undefined ? 'Unknown' : conn.getName(jid)}
*• Jid:* ${jid}`.trim()).join('\n\n') : ''}


*Usuarios*
*Total:* ${users.length} Usuarios${users ? '\n\n' + users.map(([jid], i) => `*• Usuario:* ${conn.getName(jid) == undefined ? 'Unknown' : conn.getName(jid)}
*• Jid:* ${jid}`.trim()).join('\n\n') : ''}`)
}

handler.help = ['banlist']
handler.tags = ['info']
handler.command = /^(listban|bannedlist|banlist)$/i

module.exports = handler
