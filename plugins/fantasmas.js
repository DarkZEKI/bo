let { MessageType, Presence } = require('@adiwajshing/baileys')
let handler = async (m, { conn, text, participants, groupMetadata }) => {
	let member = participants.map(u => u.jid)
        let pp = await conn.getProfilePicture(m.chat)
	if(!text) {
		var sum = member.length
	} else {
		var sum = text
	}
	var total = 0
	var sider = []
	for(let i = 0; i < sum; i++) {
		let users = m.isGroup ? participants.find(u => u.jid == member[i]) : {}
		if((typeof global.DATABASE.data.users[member[i]] == 'undefined' || global.DATABASE.data.users[member[i]].chat == 0) && !users.isAdmin && !users.isSuperAdmin) { 
			if (typeof global.DATABASE.data.users[member[i]] !== 'undefined'){
				if(global.DATABASE.data.users[member[i]].whitelist == false){
					total++
					sider.push(member[i])
				}
			}else {
				total++
				sider.push(member[i])
			}
		}
	}
	if(total == 0) return conn.reply(m.chat, `Este grupo no tiene fantasmas :D`, m)
        let sidertext = `\t\t*‧ 🪦 Revision de inactivos 🪦 ‧*

*• Grupo:* ${groupMetadata.subject}
*• Jid:* ${m.chat}
*• Miembros:* ${sum} Total

Manténgase activo en el grupo porque pronto habrá limpieza de miembros.

*Lista de usuarios inactivos:*
${sider.map(v => '- @' + v.replace(/@.+/, '')).join('\n')}

*• Inactivos:* ${total} Total`
        conn.sendFile(m.chat, pp, 'pp.jpg', sidertext, m, false, { contextInfo: { mentionedJid: sider } })
	//conn.reply(m.chat, `\t\t*･ 🍟 REVISIÓN DE INACTIVOS 🍟 ･*\n\n*• Grupo:* ${groupMetadata.subject}\n*• Miembros:* ${sum} Total\n\nManténgase activo en el grupo porque pronto habrá limpieza de miembros.\n\n*Lista de Fantasmas:*\n${sider.map(v => '- @' + v.replace(/@.+/, '')).join('\n')}\n\n*👻 Fantasmas:* ${total} Total`, m,{ contextInfo: { mentionedJid: sider } })
}

handler.help = ['fantasmas']
handler.tags = ['group']
handler.command = /^(sider|fantasmas|verfantasmas|inactivos)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false
handler.admin = true
handler.botAdmin = true
handler.fail = null

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
