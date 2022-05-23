let moment = require('moment-timezone')

let handler = m => m

handler.all = async function (m) {
	this.event = this.event ? this.event : {}
	if (m.chat in this.event) return false
	this.event[m.chat] = true
	let eve = await moment.tz('Asia/Jakarta').format('H')
	if (eve == 3) {
	this.reply(m.chat, '*Test event . . .*')
	//this.sendButton(m.chat, `\n*Caba de caer una caja 📦 misteriosa*\n`, '', 'Recojer!', '.recoger')
    }

}

module.exports = handler

