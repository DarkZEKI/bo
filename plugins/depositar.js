let { MessageType } = require('@adiwajshing/baileys')

global.DATABASE._data.users[m.quoted.sender].money += 50000

global.DATABASE._data.users[m.sender].money -= 50000

m.quoted.reply ('haz recibido 50k')

}
handler.help = ['pay @user <amount>']
handler.tags = ['menu']
handler.command = /^pay$/
handler.rowner = true

module.exports = handler
