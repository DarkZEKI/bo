const {
  MessageType
} = require("@adiwajshing/baileys");
let fetch = require('node-fetch')
let speed = require('performance-now')
let PhoneNumber = require('awesome-phonenumber')
let fs = require('fs')
let path = require('path')
let levelling = require('../lib/levelling')
let ownernum = "5215634992998@s.whatsapp.net"
let emoji = ["ð", "ð", "ð¥®", "â²", "ð"]
let tags = {
  'main': 'Menu ð',
  'rpg': 'Juego - RPG âï¸',
  'game': 'Juegos ð®',
  'xp': 'Exp & limite â¨',
  'sticker': 'Stickers ð§©',
  'quotes': 'Citas ð',
  'adm': 'Admins ð',
  'group': 'Grupos ð¥',
  'premium': 'Premiun ð',
  'internet': 'Internet ð¶',
  'random': 'Random ð¥',
  'nsfw': 'Nsfw ð',
  'anonymous': 'Chat - anÃ³nimo ðµï¸ââï¸',
  'maker': 'Logo - maker ð¨',
  'audio': 'Audio ð',
  'downloader': 'Descargas ð¥',
  'tools': 'Ajustes âï¸',
  'fun': 'DiverciÃ³n ð¡',
  'database': 'Database ð',
  'vote': 'VotaciÃ³n ð³ï¸',
  'jadibot': 'Jadi - bot ð¤',
  'owner': 'Creador ð',
  'host': 'Host ð¡',
  'advanced': 'Abanzado ð ',
  'info': 'Info ð',
  '': 'Sin - categorÃ­a ðµï¸',
}
const defaultMenu = {
  before: `Hola *@%user*, %greeting

â  ââ¢ââð« *Bio:* %bio

â  ââ¢ââð¤ *â¢ Bot NÉme :* %botname
â  ââ¢ââð *â¢ LenguÉje :* %lang
â  ââ¢ââð *â¢ LibreriÉ :* %lib
â  ââ¢ââð§¸ *â¢ Prefijo :* ââ multiprefix ââ
â  ââ¢ââð² *â¢ ComÉndos :* %comand TotÉl
â  ââ¢âââï¸ *â¢ FechÉ :* %date
â  ââ¢âââ° *â¢ HorÉ :* %time

`,
  header: 'â â  _*%category*_',
  body: 'â  ââ¢ââ%rmoji *%cmd* %islimit %isPremium',
  footer: 'â  â¶',
  after: "",
}
let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let name = conn.getName(m.sender)
    
    let timestamp = speed()
    let neww = performance.now()
    let latensi = speed() - timestamp
    
    let d = new Date(new Date + 3600000)
    let locale = 'es'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Domingo', 'Lunes', 'Martes', 'MiÃ©rcoles', 'Jueves','Viernes','SÃ¡bado'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)

    //let time = d.toLocaleTimeString('es-PE', {
    //  hour: 'numeric',
    //  minute: 'numeric',
    //  second: 'numeric'
    //})

    let time = d.toLocaleString('en-US', { 
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true 
    })

    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.DATABASE._data.users).length
    let rtotalreg = Object.values(global.DATABASE._data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(limite)' : '')
                .replace(/%isPremium/g, menu.premium ? '(premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    biot = await conn.getStatus(`${m.sender.split('@')[0]}@c.us`)
    ramoji = emoji[Math.floor(Math.random() * emoji.length)]
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      user: m.sender.split("@s.whatsapp.net")[0],
      number: PhoneNumber('+' + m.sender.replace('@s.whatsapp.net', '')).getNumber('international'),
      ownum: ownernum.split("@s.whatsapp.net")[0],
      comand: Object.values(global.plugins).filter( (v) => v.help && v.tags ).length,
      me: conn.user.name,
      server: conn.browserDescription[0],
      navega: conn.browserDescription[1],
      version: conn.browserDescription[2],
      bio: biot.status == 401 ? 'Sin info' : biot.status,
      greeting: saludo,
      lang: 'JavaScript',
      botname: 'lolibot',
      lib: 'Baileys',
      rmoji: ramoji,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      name, weton, week, date, dateIslamic, time, totalreg, rtotalreg,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
     let tumb = fs.readFileSync('./storage/image/menu.jpg')
     let tumbb = fs.readFileSync('./storage/image/menu2.jpg')
     let chatp = global.DATABASE._data.chats[m.chat]
     if (chatp.menu == 1) {
     let imeg = await conn.prepareMessage(m.chat, tumbb, 'imageMessage')
     let imeu = imeg.message.imageMessage
     conn.relayWAMessage(await conn.prepareMessageFromContent(m.chat, { productMessage: { businessOwnerJid: '51940617554@s.whatsapp.net', product: { productId: '750', productImage:imeu, title 'L', description: text.trim(), currencyCode: 'IDR', priceAmount1000: '2022', retailerId: '750', url: 'Lolibot - OFC', productImageCount: 1, salePriceAmount1000: '7.8000', } } }, { quoted: m, contextInfo: { mentionedJid: [m.sender, ownernum] } }))
     } else if (chatp.menu == 5) {
     let res = await conn.prepareMessageFromContent(m.chat, { "orderMessage": { "orderId":"6288215463787", "itemCount": 2022, "message": text.trim(), "orderTitle": "L", "footerText": "Â© lolibot", "token": "AR6xBKbXZn0Xwmu76syd7rnxI+Rx87HfinVlW4lwXa6JA==", "thumbnail": tumbb, "surface": "CATALOG" } }, { quoted: m, sendEphemeral: true, contextInfo: { mentionedJid: [m.sender, ownernum] } })
     conn.relayWAMessage(res)
     } else if (chatp.menu == 2) {
     let menux =  await conn.prepareMessage(m.chat, tumb, MessageType.image, { quoted: m, thumbnail: tumb, contextInfo: { externalAdReply: { title: "ããªãã¯ç§ã®ãã¹ã¦ã§ã", body: "L", previewType: "PHOTO", thumbnail: tumbb, sourceUrl: "" } } })
     gbutsan = [{ buttonId: '.info', buttonText: { displayText: 'ð° INFO' }, type: 1 }, { buttonId: '.owner', buttonText: { displayText: 'ð CREADOR' }, type: 1 }]
     gbuttonan = { imageMessage: menux.message.imageMessage, contentText: text.trim(), footerText: '  Lolibot - OFC', buttons: gbutsan, headerType: 4 }
     await conn.sendMessage(m.chat, gbuttonan, MessageType.buttonsMessage, { contextInfo: { mentionedJid: [m.sender, ownernum], forwardingScore: 750, isForwarded: true }, quoted: m })
     } else if (chatp.menu == 3) {
     conn.sendMessage(m.chat, { contentText: text.trim(), footerText: '  Lolibot - OFC', buttons: [{buttonId: '.info', buttonText: {displayText: 'ð° INFO'}, type: 1},{buttonId: '.owner', buttonText: {displayText: 'ð CREADOR'}, type: 1}], "headerType": "DOCUMENT", "documentMessage": { "url": "https://mmg.whatsapp.nt/d/f/Ano5cGYOFQnC51uJaqGBWiCrSJH1aDCi8-YPQMMb1N1y.enc", "mimetype": "application/vnd.ms-excel", "title": "Dibuat Oleh: Arifi Razzaq", "fileSha256": "8Xfe3NQDhjwVjR54tkkShLDGrIFKR9QT5EsthPyxDCI=", "fileLength": 99999999999, "pageCount": 25791, "mediaKey": "XWv4hcnpGY51qEVSO9+e+q6LYqPR3DbtT4iqS9yKhkI=", "fileName": "ð·ðððððð - ðºððððððâ¢.âââ¢á­", "fileEncSha256": "NI9ykWUcXKquea4BmH7GgzhMb3pAeqqwE+MTFbH/Wk8=", "directPath": "/v/t62.7119-24/35160407_568282564396101_3119299043264875885_n.enc?ccb=11-4&oh=d43befa9a76b69d757877c3d430a0752&oe=61915CEC", "mediaKeyTimestamp": "1634472176", "jpegThumbnail": tumb }}, MessageType.buttonsMessage, { quoted: m, thumbnail: tumbb, contextInfo: { mentionedJid: [m.sender, ownernum], forwardingScore: 750, isForwarded: true, externalAdReply: { title: "ããªãã¯ç§ã®ãã¹ã¦ã§ã", body: "ð Lobita & Gatito ð«", thumbnail: tumbb, mediaType: "2", previewType: "VIDEO", mediaUrl: "" } } })
     } else if (chatp.menu == 4) {
     conn.reply(m.chat, text.trim(), text, { quoted: m, contextInfo: { externalAdReply:{title: "ããªãã¯ç§ã®ãã¹ã¦ã§ã", body: "L", previewType:"PHOTO", thumbnail: tumbb, sourceUrl: "" }, mentionedJid: [m.sender, ownernum] }})
     }
  } catch (e) {
    conn.reply(m.chat, 'Lo siento, ocurriÃ³ un error al mostrar el menÃº', m)
    throw e
  }
}
handler.help = ['menu', 'comandos']
handler.tags = ['main']
handler.command = /^(menu|comandos)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}


var ase = new Date();
                        var waktoonyabro = ase.getHours();
                        switch(waktoonyabro){
                case 0: waktoonyabro = `que tengas una linda noche ð`; break;
                case 1: waktoonyabro = `que tengas una linda noche ð¤`; break;
                case 2: waktoonyabro = `que tengas una linda noche ð¦`; break;
                case 3: waktoonyabro = `que tengas una linda maÃ±ana â¨`; break;
                case 4: waktoonyabro = `que tengas una linda maÃ±ana ð«`; break;
                case 5: waktoonyabro = `que tengas una linda maÃ±ana ð`; break;
                case 6: waktoonyabro = `que tengas una linda maÃ±ana ð`; break;
                case 7: waktoonyabro = `que tengas una linda maÃ±ana ð`; break;
                case 8: waktoonyabro = `que tengas una linda maÃ±ana ð«`; break;
                case 9: waktoonyabro = `que tengas una linda maÃ±ana â¨`; break;
                case 10: waktoonyabro = `que tengas un lindo dia ð`; break;
                case 11: waktoonyabro = `que tengas un lindo dia ð¨`; break;
                case 12: waktoonyabro = `que tengas un lindo dia â`; break;
                case 13: waktoonyabro = `que tengas un lindo dia ð¤`; break;
                case 14: waktoonyabro = `que tengas una linda tarde ð`; break;
                case 15: waktoonyabro = `que tengas una linda tarde ð¥`; break;
                case 16: waktoonyabro = `que tengas una linda tarde ð¹`; break;
                case 17: waktoonyabro = `que tengas una linda tarde ð`; break;
                case 18: waktoonyabro = `que tengas una linda noche ð`; break;
                case 19: waktoonyabro = `que tengas una linda noche ð`; break;
                case 20: waktoonyabro = `que tengas una linda noche ð`; break;
                case 21: waktoonyabro = `que tengas una linda noche ð`; break;
                case 22: waktoonyabro = `que tengas una linda noche ð`; break;
                case 23: waktoonyabro = `que tengas una linda noche ð`; break;
            }
            var saludo = "" + waktoonyabro;
