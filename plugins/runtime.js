let handler = async (m, { usedPrefix, command }) => {
let uptime = process.uptime()
//let time = require('moment-timezone').tz('Asia/Kolkata').format('HH:mm:ss')
let runnya = `\t\t\t\t*∙ ☀️ Runtime ☀️ ∙*

• *Hora:* ${time}
• *Tiempo activa:* ${runtime(uptime)}`
await await await await await m.reply(runnya)
}

handler.help = ['runtime']
handler.tags = ['info']
handler.command = /^(uptime|runtime)$/i

module.exports = handler

const runtime = function (seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? d + (d == 1 ? " dia, " : " Dias, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hora, " : " Horas, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minuto, " : " Minutos, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " segundo" : " Segundos") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
};

const dd = new Date(new Date + 3600000);
const time = dd.toLocaleString('en-US', { 
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true 
    });
