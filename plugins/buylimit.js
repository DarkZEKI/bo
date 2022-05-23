const xpperlimit = 1000

let handler = async (m, { conn, command, args }) => {
  if (!args[0]) throw 'Ingrese la cantidad de limite que desea comprar'
  let count = command.replace(/^buylimit/i, '')
  count = count ? /all/i.test(count) ? Math.floor(global.DATABASE._data.users[m.sender].exp / xpperlimit) : parseInt(count) : args[0] ? parseInt(args) : 1
  count = Math.max(1, count)
  if (global.DATABASE._data.users[m.sender].exp >= xpperlimit * count) {
    global.DATABASE._data.users[m.sender].exp -= xpperlimit * count
    global.DATABASE._data.users[m.sender].limit += count
    conn.reply(m.chat, `\t\t*∙ 🛍️ Compra exitosa 🛍️ ∙*

*• Limite:* +${count} 
*• Exp:* -${xpperlimit * count}`, m)
  } else conn.reply(m.chat, `Tu exp no es suficiente para comprar *${count} limites*\nJuega para ganar mas exp`, m)
}

handler.help = ['buylimit']
handler.tags = ['xp']
handler.command = /^(buyall|buylimit)$/i

handler.register = true
handler.exp = 0

module.exports = handler
