let { MessageType } = require('@adiwajshing/baileys')
let pajak = 0.02
let handler = async (m, { conn, text }) => {
  if (!text) throw 'Ingrese la cantidad de dinero que se dará'
  let who
  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat
  if (!who) throw 'Etiqueta a uno'
  let txt = text.replace('@' + who.split`@`[0], '').trim()
  if (isNaN(txt)) throw 'Solo números'
  let money = parseInt(txt)
  let money = money
  let pjk = Math.ceil(money * pajak)
  money += pjk
  if (money < 1) throw 'Minimo 1'
  let users = global.DATABASE._data.users
  if (money > users[m.sender].money) throw 'Exp insuficiente para transferir'
  users[m.sender].money -= money
  users[who].money += money

}
handler.help = ['pay @user <amount>']
handler.tags = ['money']
handler.command = /^depositar$/
handler.rowner = false

module.exports = handler
