
import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'


global.owner = ['2347045035241', 'Excel', true]
 //Number of owners

//global.pairingNumber = "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0JETS96empSdjRIb1VoRjhyYzNYcVI1VUZrK2NjbzBwZmZOS0IwcnZWbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieGF1R1hENisya2NTK3ZHZWFTSDc1QnpnODlENHNnUzUrYjIrZno0TWFBdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBTTRNK2tXbHRXMTVxSGRnc3hLeUpvV0pZUEh0cG81L2toUHlSM1Vyam1RPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0SW9LbjMzaGMyZTFZRVVic0JIbUlNdEJMdm4vQ29jbzhEYUhVanNWMXdzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtDb3dnZkZRQzlZaFFMUVdyaitCcUxuZS9pVXpYTTBXVVpRUm5LQkxmVTg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlRxL09XUU9ZSEJRelJpVVN1N0FoUlNYY1k2KytTVTJCZE9GeTZEd3Fad2s9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMlAyOTR2cmtrY0RJZ1F0c0J4MktEYktYUEVlYWV6UGNyZXliWEcwWkdIaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid2d1RGxvT0I3VDJJemIvMnUwRTJvR3BCazFNaVRXU0I3b3d5KzRTZlNUWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdlMUl3b2JRQ1pRU0pYNmRWS2V1ZXN6aUJHV1paRkUxK2g2RmJBZUkyQWc4OWxSam4wMHdHR0R6SE5CbjJ0WkxCcWxMWmF6a2xML1RCcm50LzZaOWhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ1LCJhZHZTZWNyZXRLZXkiOiJSenFIaEd0UndQRHpubHJBY1FRZGQ1OFVNbTdIRGlzbDdQRWtWM1hQT29rPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI3ODM4NjgyMjgzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkRDNENBRTI0RjE0RkVEQjcxMkI3MjI2MEE2OUE5OUI5In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTQzNTE2NTR9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI3ODM4NjgyMjgzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjUyNEFBRkUxQkQ1NEJCQzQ4REVCRDc0QTAzODc3Q0U3In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTQzNTE2NTR9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlQ2MEVseEZlUWRldG9pSC1haEVpNnciLCJwaG9uZUlkIjoiNTEyYmQ0ZTAtNDM1Ni00ZjZhLTllYWItMDJjZjNhYmI2M2NkIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhnS2JybGZNQU54N25TTjhheVN5THlvQ2cwcz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxL2pGRGpmd3Z1U1ZjV3JpZjB3UFl2MWs5UHM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiTjQxUDJTRVciLCJtZSI6eyJpZCI6IjI3ODM4NjgyMjgzOjdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiTW9vZHNzYnk1NjMifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ091VTFNZ0JFSmpjdTdFR0dBb2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlRucDVqQXF0NVpUWE9QZ1dIME8rMFFNVVVUWnBVZmY1QUx6cDQzaUJpbnc9IiwiYWNjb3VudFNpZ25hdHVyZSI6InZ3QmkrZWd3Q0ZXeHMzdCtkSUxtUUovamNhcElZWmpnVXB4ekdUd2xudWNaa0lBV3RKOFpNS1o1UlVJVmFvd3cvdFVXSXBVSnNwUFpFVUl0THpVNkFBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJHTnNEalR2dXJRdmtFajg3QXZGK0taS0hyelRMQTgzQ2FHMk0vUDJQOXBiY1NUMEF5R0tvZ3ZxUWpEeFlZQWxvQU5SWXllamI2QkJudFVkNndRNGFndz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI3ODM4NjgyMjgzOjdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVTU2ZVl3S3JlV1Uxemo0Rmg5RHZ0RURGRkUyYVZIMytRQzg2ZU40Z1lwOCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxNDM1MTY0NCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFPTkYifQ==" //put your bot number here

global.mods = ['2347045035241'] 
global.prems = ['2347045035241']
global.allowed = ['2347045035241']
global.keysZens = ['c2459db922', '37CC845916', '6fb0eff124']
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())]
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63']
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())]
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5']
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())]
global.lolkeysapi = ['GataDios']
global.beta = 'mLxstUwm'

global.APIs = { // API Prefix
  // name: 'https://website'
  xteam: 'https://api.xteam.xyz', 
  dzx: 'https://api.dhamzxploit.my.id',
  lol: 'https://api.lolhuman.xyz',
  violetics: 'https://violetics.pw',
  neoxr: 'https://api.neoxr.my.id',
  zenzapis: 'https://zenzapis.xyz',
  akuari: 'https://api.akuari.my.id',
  akuari2: 'https://apimu.my.id',
  nrtm: 'https://fg-nrtm.ddns.net',
  bg: 'http://bochil.ddns.net',
  fgmods: 'https://api-fgmods.ddns.net'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://api.xteam.xyz': 'd90a9e986e18778b',
  'https://api.lolhuman.xyz': '85faf717d0545d14074659ad',
  'https://api.neoxr.my.id': `${keysneoxr}`,	
  'https://violetics.pw': 'beta',
  'https://zenzapis.xyz': `${keysxxx}`, 
  'https://api-fgmods.ddns.net': 'fg-dylux'
}

// Sticker WM
global.botname = 'STAR-V2'
global.premium = 'true'
global.packname = 'EX-BOTS_TEAM' 
global.author = '@EXCEL' 
global.menuvid = 'https://i.imgur.com/p7sdeTT.mp4'
global.igfg = '▢✓ Follow My channel_ https://whatsapp.com/channel/0029Va9wmuz8F2pGIURwmo0m\n' 
global.dygp = 'https://chat.whatsapp.com/BfH0KLkICn2BjmGFMRcGMW'
global.fgsc = 'https://github.com/Xcelsama/STAR-MD-V2' 
global.fgyt = 'https://whatsapp.com/channel/0029Va9wmuz8F2pGIURwmo0m'
global.fgpyp = 'https://whatsapp.com/channel/0029Va9wmuz8F2pGIURwmo0m'
global.fglog = 'STAR.jpg' 
global.thumb = fs.readFileSync('./STAR.jpg')


global.wait = '*🕣 _STAR IS LOADIND..._*\n*▰▰▰▱▱▱▱▱⭐*'
global.rwait = '⌛'
global.dmoji = '🤭'
global.done = '✔️'
global.error = '❌' 
global.xmoji = '🔥' 

global.multiplier = 69 
global.maxwarn = '3' // máxima advertencias

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
