let { MessageType, mentionedJid } = require("@adiwajshing/baileys")
let fs = require('fs')
let levelling = require('../lib/levelling')
let handler = async (m, { conn, args, text, usedPrefix, command }) => {

    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let user = global.DATABASE._data.users[who]

    let healt = global.DATABASE._data.users[who].healt
    
    let pickaxe = global.DATABASE._data.users[who].pickaxe
    let pdurability = global.DATABASE._data.users[who].pickaxedurability
    let axe = global.DATABASE._data.users[who].axe
    let adurability = global.DATABASE._data.users[who].axedurability
    let rod = global.DATABASE._data.users[m.sender].rod
    let rdurability = global.DATABASE._data.users[m.sender].roddurability
    
    //Minerales
    let diamond = global.DATABASE._data.users[who].diamond
    let gold = global.DATABASE._data.users[who].gold
    let iron = global.DATABASE._data.users[who].iron
    let stone = global.DATABASE._data.users[who].stone
    
    //Madera
    let jungle = global.DATABASE._data.users[who].jungle
    let birch = global.DATABASE._data.users[who].birch
    let oak = global.DATABASE._data.users[who].oak
    
    //Peces
    let blowfish = global.DATABASE._data.users[who].blowfish
    let tropicalfish = global.DATABASE._data.users[who].tropicalfish
    let commonfish = global.DATABASE._data.users[who].commonfish
    
    let chest = global.DATABASE._data.users[who].chest

    let level = global.DATABASE._data.users[who].level
    let money = global.DATABASE._data.users[who].money
    let exp = global.DATABASE._data.users[who].exp
    
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let math = max - xp
    let name = m.fromMe ? conn.user : conn.contacts[who]
    let sortedmoney = Object.entries(global.DATABASE.data.users).sort((a, b) => b[1].money - a[1].money)
    let sortedlevel = Object.entries(global.DATABASE.data.users).sort((a, b) => b[1].level - a[1].level)
    let sorteddiamond = Object.entries(global.DATABASE.data.users).sort((a, b) => b[1].diamond - a[1].diamond)
    let sortedpotion = Object.entries(global.DATABASE.data.users).sort((a, b) => b[1].potion - a[1].potion)
    let sortedsampah = Object.entries(global.DATABASE.data.users).sort((a, b) => b[1].sampah - a[1].sampah)
    let sortedcommon = Object.entries(global.DATABASE.data.users).sort((a, b) => b[1].common - a[1].common)
    let sorteduncommon = Object.entries(global.DATABASE.data.users).sort((a, b) => b[1].uncommon - a[1].uncommon)
    let sortedmythic = Object.entries(global.DATABASE.data.users).sort((a, b) => b[1].mythic - a[1].mythic)
    let sortedlegendary = Object.entries(global.DATABASE.data.users).sort((a, b) => b[1].legendary - a[1].legendary)
    let usersmoney = sortedmoney.map(v => v[0])
    let usersdiamond = sorteddiamond.map(v => v[0])
    let userspotion = sortedpotion.map(v => v[0])
    let userssampah = sortedsampah.map(v => v[0])
    let userslevel = sortedlevel.map(v => v[0])
    let userscommon = sortedcommon.map(v => v[0])
    let usersuncommon = sorteduncommon.map(v => v[0])
    let usersmythic = sortedmythic.map(v => v[0])
    let userslegendary = sortedlegendary.map(v => v[0])
    let invt = fs.readFileSync('./storage/image/inventario.png')
    let str = `\t\t\t*??? ???? ESTADO ???? ???*

*??? ???? Nombre:* @${who.split("@s.whatsapp.net")[0]}
*??? ?????? Vida:* ${healt}

*??? ???? Dinero:* ${money}
*??? ???? Nivel:* ${level}
*??? ???? Exp:* ${exp}
*??? ??? Exp nivel:* ${user.exp - min}/${max}

*??? ?????? Pico:* ${pickaxe == 0 ? 'No tiene' : '' || pickaxe == 1 ? 'Pico de madera' : '' || pickaxe == 2 ? 'Pico de piedra' : '' || pickaxe == 3 ? 'Pico de hierro' : '' || pickaxe == 4 ? 'Pico de oro' : '' || pickaxe == 5 ? 'Pico de diamante': ''}
*??? ?????? Durabilidad:* ${pdurability}

*??? ???? Hacha:* ${axe == 0 ? 'No tiene' : '' || axe == 1 ? 'Hacha de madera' : '' || axe == 2 ? 'Hacha de piedra' : '' || axe == 3 ? 'Hacha de hierro' : '' || axe == 4 ? 'Hacha de oro' : '' || axe == 5 ? 'Hacha de diamante' : ''}
*??? ?????? Durabilidad:* ${adurability}

*??? ???? Ca??a:* ${rod == 0 ? 'No tiene' : '' || rod == 1 ? 'Ca??a normal' : '' || rod == 2 ? 'Ca??a ????' : '' || rod == 3 ? 'Ca??a ????' : '' || rod == 4 ? 'Ca??a ????' : '' || rod == 5 ? 'Ca??a ????' : ''}
*??? ?????? Durabilidad:* ${rdurability}

\t\t\t*??? ???? INVENTARIO ???? ???*

*??? ???? Diamante:* ${diamond}
*??? ???? Oro:* ${gold}
*??? ???? Hierro:* ${iron}
*??? ???? Piedra:* ${stone}

*??? ???? Madera:* ${oak}

*??? ???? Pez tropical:* ${tropicalfish}
*??? ???? Pez globo:* ${blowfish}
*??? ???? Pez comun:* ${commonfish}

*??? ???? Cofre:* ${chest}

*??? ???? Total inv:* ${diamond + gold + iron + stone + oak + blowfish + tropicalfish + commonfish} items`

    let type = (args[0] || ' ').toLowerCase()
    
if (text.includes('simple')) { 
    conn.sendMessage(m.chat, str, MessageType.text, { quoted: m, contextInfo: { mentionedJid: [who], forwardingScore: 750, isForwarded: true }})
	} else conn.sendMessage(m.chat, { contentText: str, footerText: `Si no puedes ver tu inventario completo puedes poner *${usedPrefix + command} simple*`, buttons: [{buttonId: `${usedPrefix}shop`, buttonText: {displayText: 'Tienda ???'}, type: 1}], "headerType": "DOCUMENT", "documentMessage": { "url": "https://mmg.whatsapp.net/d/f/Ano5cGYOFQnC51uJaqGBWiCrSJH1aDCi8-YPQMMb1N1y.enc", "mimetype": "application/vnd.ms-excel", "title": "?????? G??me - RPG ???????????-???", "fileSha256": "8Xfe3NQDhjwVjR54tkkShLDGrIFKR9QT5EsthPyxDCI=", "fileLength": 99999999999, "pageCount": "0", "mediaKey": "XWv4hcnpGY51qEVSO9+e+q6LYqPR3DbtT4iqS9yKhkI=", "fileName": "?????? G??me - RPG ???????????-???", "fileEncSha256": "NI9ykWUcXKquea4BmH7GgzhMb3pAeqqwE+MTFbH/Wk8=", "directPath": "/v/t62.7119-24/35160407_568282564396101_3119299043264875885_n.enc?ccb=11-4&oh=d43befa9a76b69d757877c3d430a0752&oe=61915CEC", "mediaKeyTimestamp": "1634472176", "jpegThumbnail": false }}, MessageType.buttonsMessage, { quoted: m, thumbnail: false, contextInfo: { mentionedJid: [who], forwardingScore: 750, isForwarded: true, externalAdReply: { title: '??????????????????? ???????????????????????????????????????? ????????????????', thumbnail: invt, mediaType:"2", previewType: "VIDEO", mediaUrl: "" } }})
}
handler.help = ['inventario']
handler.tags = ['rpg']
handler.command = /^(inventario|inventory|inv)$/i

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
