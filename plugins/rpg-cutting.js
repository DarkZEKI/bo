let handler = async (m, { conn, usedPrefix }) => {
	
	let user = global.DATABASE._data.users[m.sender]
	let axe = global.DATABASE._data.users[m.sender].axe
	let adurability = global.DATABASE._data.users[m.sender].axedurability
    let __waktur = (new Date - global.DATABASE._data.users[m.sender].lastcutting)
    let _waktur = (180000 - __waktur)
    let waktur = clockString(_waktur)
    //let jungle = (axe == 1 ? Math.floor(Math.random() * 5) : '' || axe == 2 ? Math.floor(Math.random() * 7) : '' || axe == 3 ? Math.floor(Math.random() * 10) : '' || axe == 4 ? Math.floor(Math.random() * 20) : '' || axe == 5 ? Math.floor(Math.random() * 30) : '' )
    //let birch = (axe == 1 ? Math.floor(Math.random() * 10) : '' || axe == 2 ? Math.floor(Math.random() * 17) : '' || axe == 3 ? Math.floor(Math.random() * 25) : '' || axe == 4 ? Math.floor(Math.random() * 40) : '' || axe == 5 ? Math.floor(Math.random() * 55) : '' )
    let oak = (axe == 1 ? Math.ceil(Math.random() * 100) : '' || axe == 2 ? Math.ceil(Math.random() * 150) : '' || axe == 3 ? Math.ceil(Math.random() * 200) : '' || axe == 4 ? Math.ceil(Math.random() * 250) : '' || axe == 5 ? Math.ceil(Math.random() * 350) : '' )
    let exp = (axe == 1 ? Math.ceil(Math.random() * 200) : '' || axe == 2 ? Math.ceil(Math.random() * 400) : '' || axe == 3 ? Math.ceil(Math.random() * 600) : '' || axe == 4 ? Math.ceil(Math.random() * 800) : '' || axe == 5 ? Math.ceil(Math.random() * 1000) : '' )
    let durability = Math.floor(Math.random() * 100)
    let goa = (pickRandom(['un bosque 🌳']))
    
    if (axe > 0) {
    if (global.DATABASE._data.users[m.sender].axedurability > 99) {
    if (new Date - global.DATABASE._data.users[m.sender].lastcutting > 180000) {
       
global.DATABASE._data.users[m.sender].lastcut = new Date * 1
//global.DATABASE._data.users[m.sender].jungle += jungle * 1 
//global.DATABASE._data.users[m.sender].birch += birch * 1 
global.DATABASE._data.users[m.sender].oak += oak * 1 
global.DATABASE._data.users[m.sender].axedurability -= durability * 1
global.DATABASE._data.users[m.sender].exp += exp * 1

          setTimeout(() => {
          	m.reply(`*Talaste en ${goa} y obtienes*

- Madera: ${oak}
- Exp: ${exp}

*🪓 Durabilidad:* -${durability}`)
          }, 0)
          
            } else m.reply(`Te quedaste sin energía vuelve dentro de *${waktur}*`)
         } else m.reply(`Repara tu hacha, escribiendo ${usedPrefix}reparar hacha`)
     } else m.reply(`Todavía no tienes una hacha, compralo escribiendo ${usedPrefix}comprar hacha`)
 }

//Update
//- Roble: ${oak}
//- Abedul: ${birch}
//- Jungla: ${jungle}
//- Exp: ${exp}

handler.help = ['talar']
handler.tags = ['rpg']

handler.command = /^(cut|talar)$/i
handler.disabled = false

module.exports = handler

function clockString(seconds) {
  d = Math.floor(seconds / (1000 * 60 * 60 * 24));
  h = Math.floor((seconds / (1000 * 60 * 60)) % 24);
  m = Math.floor((seconds / (1000 * 60)) % 60);
  s = Math.floor((seconds / 1000) % 60);
  
  dDisplay = d > 0 ? d + (d == 1 ? " dia," : " Dias,") : "";
  hDisplay = h > 0 ? h + (h == 1 ? " hora, " : " Horas, ") : "";
  mDisplay = m > 0 ? m + (m == 1 ? " minuto, " : " Minutos, ") : "";
  sDisplay = s > 0 ? s + (s == 1 ? " segundo" : " Segundos") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
};

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
} 
