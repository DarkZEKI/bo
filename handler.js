let util = require('util')
let simple = require('./lib/simple')
let { MessageType, Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')

const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(resolve, ms))
module.exports = {
  async handler(chatUpdate) {
    // console.log(chatUpdate)
    if (!chatUpdate.hasNewMessage) return
    if (!chatUpdate.messages && !chatUpdate.count) return
    let m = chatUpdate.messages.all()[0]
    try {
      simple.smsg(this, m)
      switch (m.mtype) {
        case MessageType.image:
        case MessageType.video:
        case MessageType.audio:
          if (!m.key.fromMe) await delay(1000)
          if (!m.msg.url) await this.updateMediaMessage(m)
          break
      }
      m.exp = 0
      m.limit = false
      try {
        let user = global.DATABASE._data.users[m.sender]
        if (typeof user !== 'object') global.DATABASE._data.users[m.sender] = {}
        if (user) {
            if (!isNumber(user.healt)) user.healt = 0
            if (!isNumber(user.level)) user.level = 0
            if (!isNumber(user.exp)) user.exp = 0
            if (!isNumber(user.limit)) user.limit = 10
            if (!isNumber(user.money)) user.money = 0
            if (!isNumber(user.lastclaim)) user.lastclaim = 0
        
            if (!isNumber(user.potion)) user.potion = 0
            if (!isNumber(user.chest)) user.chest = 0
            
            //Minerales
            if (!isNumber(user.diamond)) user.diamond = 0
            if (!isNumber(user.gold)) user.gold = 0
            if (!isNumber(user.iron)) user.iron = 0
            if (!isNumber(user.stone)) user.stone = 0
            
            //Madera
            if (!isNumber(user.jungle)) user.jungle = 0
            if (!isNumber(user.birch)) user.birch = 0
            if (!isNumber(user.oak)) user.oak = 0
            
            //Peces
            if (!isNumber(user.blowfish)) user.blowfish = 0
            if (!isNumber(user.tropicalfish)) user.tropicalfish = 0
            if (!isNumber(user.commonfish)) user.commonfish = 0

            if (!'banned' in user) user.banned = false
            if (!'bannedReason' in user) user.bannedReason = ''
            if (!isNumber(user.warn)) user.warn = 0

            if (!isNumber(user.afk)) user.afk = -1
            if (!'afkReason' in user) user.afkReason = ''
        
            if (!isNumber(user.antispam)) user.antispam = 0
            if (!isNumber(user.antispamlastclaim)) user.antispamlastclaim = 0
            
            if (!isNumber(user.armor)) user.armor = 0
            if (!isNumber(user.armordurability)) user.armordurability = 0
            if (!isNumber(user.sword)) user.sword = 0
            if (!isNumber(user.sworddurability)) user.sworddurability = 0
            if (!isNumber(user.axe)) user.axe = 0
            if (!isNumber(user.axedurability)) user.axedurability = 0
            if (!isNumber(user.pickaxe)) user.pickaxe = 0
            if (!isNumber(user.pickaxedurability)) user.pickaxedurability = 0
            if (!isNumber(user.rod)) user.rod = 0
            if (!isNumber(user.roddurability)) user.roddurability = 0

            if (!isNumber(user.lastadventure)) user.lastadventure = 0
            if (!isNumber(user.lastmining)) user.lastmining = 0
            if (!isNumber(user.lastcutting)) user.lastcutting = 0
            if (!isNumber(user.lastfishing)) user.lastfishing = 0
            if (!isNumber(user.lastraid)) user.lastraid = 0
            if (!('registered' in user)) user.registered = false
            if (!user.registered) {
                if (!('name' in user)) user.name = this.getName(m.sender)
                if (!isNumber(user.age)) user.age = -1
                if (!isNumber(user.regTime)) user.regTime = -1
            }
            if (!('autolevelup' in user)) user.autolevelup = true
        } else global.DATABASE._data.users[m.sender] = {
            healt: 100,
            level: 0,
            exp: 0,
            limit: 10,
            money: 0,
            lastclaim: 0,
            chest: 0,
            potion: 0,
            diamond: 0,
            gold: 0,
            iron: 0,
            stone: 0,
            jungle: 0,
            birch: 0,
            oak: 0,
            blowfish: 0,
            tropicalfish: 0,
            commonfish: 0,
            Banneduser: false,
            BannedReason: '',
            warn: 0,
            afk: -1,
            afkReason: '',
            antispam: 0,
            antispamlastclaim: 0,
            armor: 0,
            armordurability: 0,
            sword: 0,
            sworddurability: 0,
            axe: 0,
            axedurability: 0,
            pickaxe: 0,
            pickaxedurability: 0,
            rod: 0,
            roddurability: 0,
            lastadventure: 0,
            lastmining: 0,
            lastcutting: 0,
            lastfishing: 0,
            lastraid: 0,
            registered: false,
            name: this.getName(m.sender),
            age: -1,
            regTime: -1,
            autolevelup: true,
        }

        let chat = global.DATABASE._data.chats[m.chat]
        if (typeof chat !== 'object') global.DATABASE._data.chats[m.chat] = {}
        if (chat) {
          if (!('isBanned' in chat)) chat.isBanned = false
          if (!('nsfw' in chat)) chat.isNsfw = false
          if (!('welcome' in chat)) chat.welcome = false
          if (!('detect' in chat)) chat.detect = false
          if (!('sWelcome' in chat)) chat.sWelcome = ''
          if (!('sBye' in chat)) chat.sBye = ''
          if (!('sPromote' in chat)) chat.sPromote = ''
          if (!('sDemote' in chat)) chat.sDemote = ''
          if (!('menu' in chat)) chat.menu = 5
          if (!('delete' in chat)) chat.delete = false
          if (!('antidelete' in chat)) chat.antidelete = false
          if (!('antilink' in chat)) chat.antiLink = false
          if (!('simih' in chat)) chat.antiLink = false
          if (!('antitoxic' in chat)) chat.antiToxic = false
        } else global.DATABASE._data.chats[m.chat] = {
          isBanned: false,
          nsfw: false,
          welcome: false, 
          detect: false,
          sWelcome: '',
          sBye: '',
          sPromote: '',
          sDemote: '',
          menu: 5,
          delete: false,
          antidelete: false,
          antilink: false,
          simih: false,
          antitoxic: false,
        }
      } catch (e) {
        console.error(e)
      }
      if (opts['nyimak']) return
      if (!m.fromMe && opts['self']) return
      if (m.chat == 'status@broadcast') return
      if (typeof m.text !== 'string') m.text = ''
      for (let name in global.plugins) {
        let plugin = global.plugins[name]
        if (!plugin) continue
        if (plugin.disabled) continue
        if (!plugin.all) continue
        if (typeof plugin.all !== 'function') continue
        try {
          await plugin.all.call(this, m, chatUpdate)
        } catch (e) {
          if (typeof e === 'string') continue
          console.error(e)
        }
      }
      if (m.isBaileys) return
      m.exp += Math.ceil(Math.random() * 10)

      let usedPrefix
      let _user = global.DATABASE.data && global.DATABASE.data.users && global.DATABASE.data.users[m.sender]

      let isROwner = [global.conn.user.jid, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
      let isOwner = isROwner || m.fromMe
      let isMods = isOwner || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
      let isPrems = isROwner || global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
      let groupMetadata = m.isGroup ? this.chats.get(m.chat).metadata || await this.groupMetadata(m.chat) : {} || {}
      let participants = m.isGroup ? groupMetadata.participants : [] || []
      let user = m.isGroup ? participants.find(u => u.jid == m.sender) : {} // User Data
      let bot = m.isGroup ? participants.find(u => u.jid == this.user.jid) : {} // Your Data
      let isAdmin = user.isAdmin || user.isSuperAdmin || false // Is User Admin?
      let isBotAdmin = bot.isAdmin || bot.isSuperAdmin || false // Are you Admin?
      let DevMode = /true/i.test(global.DeveloperMode.toLowerCase())
      for (let name in global.plugins) {
        let plugin = global.plugins[name]
        if (!plugin) continue
        if (plugin.disabled) continue
        if (!opts['restrict']) if (plugin.tags && plugin.tags.includes('admin')) continue
        const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
        let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
        let match = (_prefix instanceof RegExp ? // RegExp Mode?
          [[_prefix.exec(m.text), _prefix]] :
          Array.isArray(_prefix) ? // Array?
            _prefix.map(p => {
              let re = p instanceof RegExp ? // RegExp in Array?
                p :
                new RegExp(str2Regex(p))
              return [re.exec(m.text), re]
            }) :
            typeof _prefix === 'string' ? // String?
              [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
              [[[], new RegExp]]
        ).find(p => p[1])
        if (typeof plugin.before === 'function') if (await plugin.before.call(this, m, {
          match,
          conn: this,
          participants,
          groupMetadata,
          user,
          bot,
          isROwner,
          isOwner,
          isAdmin,
          isBotAdmin,
          isPrems,
          chatUpdate,
        })) continue
        if (typeof plugin !== 'function') continue
        if ((usedPrefix = (match[0] || '')[0])) {
          let noPrefix = m.text.replace(usedPrefix, '')
          let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
          args = args || []
          let _args = noPrefix.trim().split` `.slice(1)
          let text = _args.join` `
          command = (command || '').toLowerCase()
          let fail = plugin.fail || global.dfail // When failed
          let isAccept = plugin.command instanceof RegExp ? // RegExp Mode?
            plugin.command.test(command) :
            Array.isArray(plugin.command) ? // Array?
              plugin.command.some(cmd => cmd instanceof RegExp ? // RegExp in Array?
                cmd.test(command) :
                cmd === command
              ) :
              typeof plugin.command === 'string' ? // String?
                plugin.command === command :
                false

          if (!isAccept) continue
          m.plugin = name
          if (m.chat in global.DATABASE._data.chats || m.sender in global.DATABASE._data.users) {
            let chat = global.DATABASE._data.chats[m.chat]
            let user = global.DATABASE._data.users[m.sender]
            if (!['unbanchat.js', 'link.js', 'pengumuman.js', 'creator.js'].includes(name) && chat && chat.isBanned && !isROwner) return // Except this
            if (!['unbanuser.js', 'inventario.js', 'link.js', 'creator.js', 'perfil.js'].includes(name) && user && user.banned && !isROwner) {
              if (!opts['msgifbanned']) m.reply(`Estas baneado de la bot por lo tanto no podrás usar ningun comando\n\n*Razón:* ${user.BannedReason ? user.BannedReason : 'No hay'}`.trim())
              return
            }
          }
          if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { // Both Owner
            fail('owner', m, this)
            continue
          }
          if (plugin.rowner && !isROwner) { // Real Owner
            fail('rowner', m, this)
            continue
          }
          if (plugin.owner && !isOwner) { // Number Owner
            fail('owner', m, this)
            continue
          }
          if (plugin.mods && !isMods) { // Moderator
            fail('mods', m, this)
            continue
          }
          if (plugin.premium && !isPrems) { // Premium
            fail('premium', m, this)
            continue
          }
          if (plugin.group && !m.isGroup) { // Group Only
            fail('group', m, this)
            continue
          } else if (plugin.botAdmin && !isBotAdmin) { // You Admin
            fail('botAdmin', m, this)
            continue
          } else if (plugin.admin && !isAdmin && !isOwner) { // User Admin & owner
            fail('admin', m, this)
            continue
          }
          if (plugin.private && m.isGroup) { // Private Chat Only
            fail('private', m, this)
            continue
          }
          if (plugin.register == true && _user.registered == false) { // Butuh daftar?
            fail('unreg', m, this)
            continue
          }

          m.isCommand = true
          let xp = 'exp' in plugin ? parseInt(plugin.exp) : 15 // XP Earning per command
          if (xp > 99999999999) m.reply('Ngecit -_-') // Hehehe
          else m.exp += xp
          if (!isPrems && plugin.limit && global.DATABASE._data.users[m.sender].limit < plugin.limit * 1) {
            this.reply(m.chat, `*_Su límite para usar este comando ha terminado_*`, m)
            continue // Limit habis
          }
          let extra = {
            match,
            usedPrefix,
            noPrefix,
            _args,
            args,
            command,
            text,
            conn: this,
            participants,
            groupMetadata,
            user,
            bot,
            isROwner,
            isOwner,
            isAdmin,
            isBotAdmin,
            isPrems,
            chatUpdate,
            DevMode,
          }
          try {
            await plugin.call(this, m, extra)
            if (!isPrems) m.limit = m.limit || plugin.limit || false
          } catch (e) {
            // Error occured
            m.error = e
            console.error(e)
            if (e) {
              let text = util.format(e)
              for (let key of Object.values(global.APIKeys))
                text = text.replace(new RegExp(key, 'g'), '#HIDDEN#')
                if (DevMode && text.length > 100) {
                  for (let jid of Object.entries(global.Owner).filter(v => v[1].isDev).map(v => v[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) m.reply(`*file:* ${m.plugin}\n*Nomor:* ${m.sender}\n*Text:* ${m.text}\n\n\`\`\`${text}\`\`\``, jid)
                }
                m.reply(text)
            }
          } finally {
            // m.reply(util.format(_user))
            if (typeof plugin.after === 'function') {
              try {
                await plugin.after.call(this, m, extra)
              } catch (e) {
                console.error(e)
              }
            }
            if (m.limit) m.reply('🎟️ Se utilizó *' + m.limit + '* de su limite!')
          }
          break
        }
      }
    } finally {
  	await this.updatePresence(m.chat, Presence.available).catch(console.error)
      //console.log(global.DATABASE._data.users[m.sender])
      let user, stats = global.DATABASE._data.stats
      if (m) {
        if (m.sender && (user = global.DATABASE._data.users[m.sender])) {
          user.exp += m.exp
          user.limit -= m.limit * 1
        }

        let stat
        if (m.plugin) {
          let now = + new Date
          if (m.plugin in stats) {
            stat = stats[m.plugin]
            if (!isNumber(stat.total)) stat.total = 1
            if (!isNumber(stat.success)) stat.success = m.error != null ? 0 : 1
            if (!isNumber(stat.last)) stat.last = now
            if (!isNumber(stat.lastSuccess)) stat.lastSuccess = m.error != null ? 0 : now
          } else stat = stats[m.plugin] = {
            total: 1,
            success: m.error != null ? 0 : 1,
            last: now,
            lastSuccess: m.error != null ? 0 : now
          }
          stat.total += 1
          stat.last = now
          if (m.error == null) {
            stat.success += 1
            stat.lastSuccess = now
          }
        }
      }

      try {
        require('./lib/print')(m, this)
      } catch (e) {
        console.log(m, m.quoted, e)
      }
      if (opts['autoread']) await this.chatRead(m.chat)
    }
  },
  async participantsUpdate({ jid, participants, action }) {
    let chat = global.DATABASE._data.chats[jid] || {}
    let text = ''
    
switch (action) {
      case 'add':
        for (let user of participants) {
        if (!chat.welcome) return 
        let duser = user
        let groupMetadata = await this.groupMetadata(jid)
        let _biot = await this.getStatus(duser)
        let bio = _biot.status == 401 ? 'Sin info' : _biot.status
        let d = new Date(new Date + 3600000)
        let date = d.toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' })
        let time = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })
        let botimg = fs.readFileSync('./storage/image/menu2.jpg')
        try {
            userimg = await this.getProfilePicture(duser)
        } catch {
            userimg = await this.getProfilePicture("51940617554-1604073088@g.us")
        }
        let ppuser = await(await fetch(userimg)).buffer()
        let _text = 'Bienvenido\'a al grupo *@subject*\n\n*• Nombre:* @user\n*• Bio:* @bio\n*• Fecha:* @date\n*• Hora:* @time\n\n- *recuerda leer las reglas del grupo* -'
        let text = (chat.sWelcome || this.welcome || conn.welcome || _text).replace('@user', '@' + duser.split('@')[0]).replace('@subject', await this.getName(jid)).replace('@desc', groupMetadata.desc).replace('@bio', bio).replace('@date', date).replace('@time', time) 
        let __button = await this.prepareMessage(jid, ppuser, MessageType.image, { contextInfo: { externalAdReply: {title: "ʟᴏʟɪʙᴏᴛ sᴜᴘᴘᴏʀᴛ ɢʀᴏᴜᴘ", body:"", previewType:"PHOTO",thumbnail: botimg, sourceUrl:`https://chat.whatsapp.com/EphX7iaMsKj70m0BrZsmvw`}} })
        let _button = [{ buttonId: '.funtion gracias', buttonText: { displayText: 'Gracias 💖' }, type: 1 }, { buttonId: '.funtion descripción', buttonText: { displayText: 'Descripción ☕' }, type: 1 }]
        let button = { imageMessage: __button.message.imageMessage, contentText: text, footerText: 'lolibot © 2022', buttons: _button, headerType: 4 }
        this.sendMessage(jid, button, MessageType.buttonsMessage, { contextInfo: { mentionedJid: [duser] } })
        }
      break

      case 'remove':
      for (let user of participants) {
        if (!chat.welcome) return 
        let duser = user
        let groupMetadata = await this.groupMetadata(jid)
        let _biot = await this.getStatus(duser)
        let bio = _biot.status == 401 ? 'Sin info' : _biot.status
        let d = new Date(new Date + 3600000)
        let date = d.toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' })
        let time = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })
        let botimg = fs.readFileSync('./storage/image/menu2.jpg')
        try {
            userimg = await this.getProfilePicture(duser)
        } catch {
            userimg = await this.getProfilePicture("51940617554-1604073088@g.us")
        }
        let ppuser = await(await fetch(userimg)).buffer()
        let _text = '@user un gay salio del grupo @group'
        let text = (chat.sBye || this.bye || conn.bye || _text).replace('@user', '@' + duser.split('@')[0]).replace('@subject', await this.getName(jid)).replace('@desc', groupMetadata.desc).replace('@bio', bio).replace('@date', date).replace('@time', time) 
        let __button = await this.prepareMessage(jid, ppuser, MessageType.image, { contextInfo: { externalAdReply: {title: "ʟᴏʟɪʙᴏᴛ sᴜᴘᴘᴏʀᴛ ɢʀᴏᴜᴘ", body:"", previewType:"PHOTO",thumbnail: botimg, sourceUrl:`https://chat.whatsapp.com/BhhtsajHD3ABkXP0U2BGh8`}} })
        let _button = [{ buttonId: 'adios', buttonText: { displayText: 'Adios 👋' }, type: 1 }]
        let button = { imageMessage: __button.message.imageMessage, contentText: text, footerText: 'lolibot © 2022', buttons: _button, headerType: 4 }
        this.sendMessage(jid, button, MessageType.buttonsMessage, { contextInfo: { mentionedJid: [duser] } })
        }
        break

      case 'promote':
      text = (chat.sPromote || this.spromote || conn.spromote || '@user ```ahora es administrador```')
      case 'demote':
        if (!text) text = (chat.sDemote || this.sdemote || conn.sdemote || '@user ```ya no es administrador```')
        text = text.replace('@user', '@' + participants[0].split('@')[0])
        this.sendMessage(jid, text, MessageType.extendedText, {
          contextInfo: {
            mentionedJid: this.parseMention(text)
          }
        })
        break
    }
  },
  async delete(m) {
    if (m.key.remoteJid == 'status@broadcast') return
    if (m.key.fromMe) return
    let chat = global.DATABASE._data.chats[m.key.remoteJid]
    if (chat.delete) return
    await this.reply(m.key.remoteJid, `
*‧ [ 🧇 MENSAJE ELIMINADO 🧇 ] ‧*
 
*• Nombre:* @${m.participant.split`@`[0]}

Para desactivar esta función escriba:
*.disable delete*
`.trim(), m.message, {
      contextInfo: {
        mentionedJid: [m.participant]
      }
    })
    this.copyNForward(m.key.remoteJid, m.message).catch(e => console.log(e, m))
  },
  async onCall(json) {
    let { from } = json[2][0][1]
    let ids = 'call-id' in json[2][0][2][0][1] ? Object.entries(json[2][0][2][0][1]) : []
    let id = ids[0][1]
    let isOffer = json[2][0][2][0][0] == 'offer' || false
    let users = global.DATABASE.data.users
    let user = users[from] || {}
    if (user.whitelist) return
    switch (this.callWhitelistMode) {
      case 'mycontact':
        if (from in this.contacts && 'short' in this.contacts[from])
        return
        break
    }
      
    if (from && id && isOffer && json[2][0]) {
      var tag = this.generateMessageTag()
      var NodePayload = ["action", "call", ["call", {
        "from": this.user.jid,
        "to": from,
        "id": tag
      }, [["reject", { 
        "call-id": id, 
        "call-creator": from, 
        "count": "0" 
      }, null]]]]
      
      await this.send(`${tag},${JSON.stringify(NodePayload)}`)
    }
    await this.sendMessage(from, 'No llame a la bot!', MessageType.extendedText)
  }
}

global.dfail = (type, m, conn) => {
  let msg = {
    rowner: 'Esta función solo puede ser utilizado por el *creador* de la bot!',
    owner: 'Esta función solo puede ser utilizado por los *subbots* y el *creador* de la bot!',
    mods: 'Esta función solo puede ser utilizado por los *moderadores/as* y el *creador* de la bot!',
    premium: 'Esta función solo puede ser utilizado por miembros *premium*!',
    group: 'Esta función solo puede ser utilizado en *grupos*!',
    private: 'Esta función solo puede ser utilizado en el chat *privado*!',
    admin: 'Esta función solo puede ser utilizado por *administradores/as* del grupo!',
    botAdmin: 'Para ejecutar esta función tengo que ser *administradora*!',
    unreg: '*Registrese para utilizar esta función*\n\n- Ejemplo: Nombre|edad'
  }[type]
  if (msg) return m.reply(msg)
}

let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'handler.js'"))
  delete require.cache[file]
  if (global.reloadHandler) console.log(global.reloadHandler())
})
