let handler = m => m

handler.all = async function (m, { isBotAdmin }) {
    // auto clear ketika terdapat pesan yang tidak dapat dilihat di wa desktop
    if (m.messageStubType === 68) {
        let log = {
            key: m.key,
            content: m.msg,
            sender: m.sender
        }
        await this.groupRemove(m.chat, [m.sender])
        await this.modifyChat(m.chat, 'clear', {
            includeStarred: false
        }).catch(console.log)
        //this.reply('')
        //this.reply("El mensaje supera los 68 caracteres se elimino el chat por prevención a traba/lag")
    }
}

module.exports = handler
