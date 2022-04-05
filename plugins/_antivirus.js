let handler = m => m

handler.all = async function (m, { isBotAdmin }) {
    // auto clear ketika terdapat pesan yang tidak dapat dilihat di wa desktop
    if (m.messageStubType === 68) {
        let log = {
            key: m.key,
            content: m.msg,
            sender: m.sender
        }
        await this.modifyChat(m.chat, 'clear', {
            includeStarred: false
        }).catch(console.log)
        await m.reply("El mensaje supera los 68 caracteres se elimino el chat por prevención a traba/lag")
    }
}

module.exports = handler
