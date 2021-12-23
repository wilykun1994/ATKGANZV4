const {
	MessageType
} = require("@adiwajshing/baileys");
const fs = require("fs-extra")

const { getBuffer } = require('../lib/myfunc')
const { color, bgcolor } = require('../lib/color')

let setting = JSON.parse(fs.readFileSync('./setting.json'))

module.exports = welcome = async (ikyy, anu) => {
	    const welkom = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
	    const isWelcome = welkom.includes(anu.jid)
	    if (!isWelcome) return
		try {
			    mem = anu.participants[0]
			    console.log(anu)
                try {
                pp_user = await ikyy.getProfilePicture(mem)
                } catch (e) {
                pp_user = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
                try {
                pp_grup = await ikyy.getProfilePicture(anu.jid)
                } catch (e) {
                pp_grup = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
            if (anu.action == 'add' && mem.includes(ikyy.user.jid)) {
            ikyy.sendMessage(anu.jid, 'Halo! Terima Kasih sudah Mengundangku, Jika ingin Menggunakan Bot Ketik !menu', 'conversation')
            }
             if (anu.action == 'add' && !mem.includes(ikyy.user.jid)) {
             if (!welkom.includes(anu.jid)) return
                mdata = await ikyy.groupMetadata(anu.jid)
                memeg = mdata.participants.length
            	num = anu.participants[0]
                let v = ikyy.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = v.vname || v.notify || num.split('@')[0]
                teks = `Welcome @${num.split('@')[0]} 👋`
	            buff = await getBuffer(`http://hadi-api.herokuapp.com/api/card/welcome?nama=${anu_user}&descriminator=${memeg}&memcount=${memeg}&gcname=${encodeURI(mdata.subject)}&pp=${pp_user}&bg=https://i.postimg.cc/LspSPBP1/IMG-20210809-180955.jpg`)
                
               buttons = [{buttonId: '!sewabot',buttonText:{displayText: 'SEWABOT'},type:1},{buttonId: '!menu',buttonText:{displayText: 'LIST MENU'},type:1}]

               imageMsg = (await ikyy.prepareMessageMedia((buff), 'imageMessage', {thumbnail: buff})).imageMessage

               buttonsMessage = {
               contentText: `${teks}`,
               footerText: 'Made With By RidhoGanzz👑', imageMessage: imageMsg,
               buttons: buttons,
               headerType: 4
}

          prep = await ikyy.prepareMessageFromContent(mdata.id,{buttonsMessage},{contextInfo: {mentionedJid: [num], externalAdReply: { title: `Welcome ${anu_user} 👋\nSemoga betah ya kak :)`, body: `Jangan Lupa Baca Desk`, previewType: "PHOTO", thumbnailUrl: 'https://i.postimg.cc/fTz1xYcS/IMG-20210825-WA0907.jpg', sourceUrl: 'https://instagram.com/atakbot_' }}})
               ikyy.relayWAMessage(prep)
            }
            if (anu.action == 'remove' && !mem.includes(ikyy.user.jid)) {
            if (!welkom.includes(anu.jid)) return
                mdata = await ikyy.groupMetadata(anu.jid)
            	num = anu.participants[0]
                let w = ikyy.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = w.vname || w.notify || num.split('@')[0]
                memeg = mdata.participants.length
                out = `Good bye @${num.split('@')[0]} 👋`
                buff = await getBuffer(`http://hadi-api.herokuapp.com/api/card/goodbye?nama=${anu_user}&descriminator=${memeg}&memcount=${memeg}&gcname=${encodeURI(mdata.subject)}&pp=${pp_user}&bg=https://i.postimg.cc/LspSPBP1/IMG-20210809-180955.jpg`)
                
               buttons = [{buttonId: '!bay',buttonText:{displayText: 'GOODBYE 😘🐒'},type:1}]

               imageMsg = (await ikyy.prepareMessageMedia((buff), 'imageMessage', {thumbnail: buff})).imageMessage

               buttonsMessage = {
               contentText: `${out}`,
               footerText: 'Made With By RidhoGanzz👑', imageMessage: imageMsg,
               buttons: buttons,
               headerType: 4
}

          prep = await ikyy.prepareMessageFromContent(mdata.id,{buttonsMessage},{contextInfo: {mentionedJid: [num], externalAdReply: { title: `Goodbye ${anu_user} 👋\nJasamu akan di kubur dalam²`, body: `Dasar Beban Group`, previewType: "PHOTO", thumbnailUrl: 'https://i.postimg.cc/fTz1xYcS/IMG-20210825-WA0907.jpg', sourceUrl: 'https://instagram.com/atakbot_' }}})
               ikyy.relayWAMessage(prep)
            }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	}
