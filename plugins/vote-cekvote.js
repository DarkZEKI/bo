let handler = async (m, { conn, usedPrefix, command }) => {
    let id = m.chat
    conn.vote = conn.vote ? conn.vote : {}
    if (!(id in conn.vote)) throw `Todavía no hay ningún voto, escriba ${usedPrefix}startvote para iniciar una votación!`
    
    let [reason, upvote, devote] = conn.vote[id]
    let mentionedJid = [...upvote, ...devote]
    let vt = `\t\t*‧ 🗳️ VOTACIÓN 🗳️ ‧*

*Motivo:* ${reason}

*Votos a favor (✅)*
Total: ${upvote.length} votos
${upvote.map(u => '- @' + u.split('@')[0]).join('\n')}

*Votos en contra (❌)*
Total: ${devote.length} votos
${devote.map(u => '- @' + u.split('@')[0]).join('\n')}`
    conn.send2Button(m.chat, vt, `Si quiere eliminar la votación\nescriba *${usedPrefix}delvote*`, '✅ Si', `${usedPrefix}upvote`, '❌ No', `${usedPrefix}devote`, m, { contextInfo: { mentionedJid } })
}

handler.help = ['cekvote']
handler.tags = ['vote']
handler.command = /^(cekvote)$/i
handler.group = true

module.exports = handler
