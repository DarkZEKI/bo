let handler = async (m, { conn, usedPrefix }) => {
    let user = global.DATABASE._data.users
    let reg = Object.entries(global.DATABASE._data.users).filter(user => user[1].registered)
    m.reply(`\t\t\t*‧ 📨 Usuarios Registrados 📨 ‧*

Total: ${reg.length} Usuarios
${reg ? '\n' + reg.map(([jid], i) => `
*• Nombre:* ${user[jid].name}
*• ID:* ${jid}
*• Edad:* ${user[jid].age} años
*• Tag:* @${jid.split("@s.whatsapp.net")[0]}`).join('\n\n') : ''}
`)
}

handler.help = ['registrados']
handler.tags = ['info']
handler.command = /^(registrados|reglist|listreg|totalreg|regtotal)$/i

module.exports = handler
