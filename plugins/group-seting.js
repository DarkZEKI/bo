let { Presence, GroupSettingChange } = require('@adiwajshing/baileys')

let handler  = async (m, { conn, args, usedPrefix, command }) => {

let type = (args[0] || ' ').toLowerCase()

switch (type) {
case 'abrir':
case 'open':
      conn.groupSettingChange(m.chat, GroupSettingChange.messageSend, false)
      m.reply('Grupo *abierto* ahora todos los *participantes* pueden escribir!')
      break

case 'cerrar':
case 'close':
      conn.groupSettingChange(m.chat, GroupSettingChange.messageSend, true)
      m.reply('Grupo *cerrado* ahora solo los *administradores\'as* pueden escribir!')
      break

    default:
let opc = `
*Quiere abrir o cerrar el grupo?*

*Abrir:*
${usedPrefix + command} abrir 

*Cerrar:*
${usedPrefix + command} cerrar
`.trim()
return m.reply(opc)
  }

}

handler.help = ['grupo']
handler.tags = ['group']
handler.command = /^(grupo|group)$/i

handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null

module.exports = handler
