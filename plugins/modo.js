let handler = async(m, { conn, args, text, usedPrefix, command }) => {

let type = (args[0] || ' ').toLowerCase()

if (!text) return conn.send2Button(m.chat, `*Modo privado o público*`, 'elija una opción', '🛡️ Privado', `${usedPrefix + command} self`, '🌍 Publico', `${usedPrefix + command} public`, m)

switch (type) {
case 'publico':
case 'public':
      if (global.opts["self"] == false) return m.reply('El modo *público* ya está activado')
      global.opts["self"] = false
      m.reply('Se cambió a modo *público*!')
      break

case 'self':
case 'privado':
      if (global.opts["self"] == true) return m.reply('El modo *privado* ya está activado')
      global.opts["self"] = true
      m.reply('Se cambió a modo *privado*!')
      break

    default:
conn.send2Button(m.chat, `*Modo privado o público*`, 'elija una opción', '🛡️ Privado', `${usedPrefix + command} self`, '🌍 Publico', `${usedPrefix + command} public`, m)
  }
}

handler.help = ['modo']
handler.tags = ['owner']
handler.command = /^(modo|mode)/i
handler.owner = true 

module.exports = handler
