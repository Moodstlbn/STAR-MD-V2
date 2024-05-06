
import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'


global.owner = ['27838682283', 'Excel', true]
 //Number of owners

//global.pairingNumber = "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieU42YnYrRXZOWjJaU0Yzb2ZhVE16UUpUYzlCbVpEcXJFdmYwSjBrR2dIaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibFljcXNweDBBUVA3TStmYm1MZm91QWdkeENQMXVEa252ZDlwOHRHc014WT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxQUpHK0lwZXdKa0lCemF3VnNJaVpHTzRTczJYVTNjN1BvOXg2SGw1WDNJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2L3dKOGlsc2tNYkZXK1lTbkVQSEsxejg3aHdVY0J5bi9VZ3NXL1pXK3prPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJHL25KaThZYmQ0ZzJ6Q2JIL1R5aGlIbFRVN3JKWEp6VDdQWUFJKzRrMlk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFrQmpFc2huMnJqTHo2c0ZpNWFPVDhNaFg1QU9OVmRjMURqd3ZHSlVqMms9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUlrWW5HZnRiQXFBRmpuZHBob1o0NlJkdE1jWGFsWWFHcUtzK3ZVYStYND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVVJJNEpYNnYrMERpVXg3TUREN09JWGlxSFA3MDB6OEpuWnErK1RZelRsWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjQxMzhET3dVODBubHk5cTdOT2tXTmw5eWpzbTNNcGNGcTVpKzZIbVJWSVBlTitHMTNuNUltRFZQMkY5N0QzbjM3Z2ZnbnQ5MVRrZlN4MHVkbDArL2lRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI1LCJhZHZTZWNyZXRLZXkiOiJGV3EvSkN0LzJZcHkreWdzeERDNXF5TzNLaFUrZ0tZWHlIZVJQQmhhaWxNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI3ODM4NjgyMjgzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkE4NzIwNzY0MDI4MjI1NTQ4NTFFREY5M0VDREVENThDIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTUwMzU2NDl9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI3ODM4NjgyMjgzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjY2NkE2MTY4Mjk4RUE2RjBEQUQ0Q0RFMTY2MDNBRUY0In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTUwMzU2NTB9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Im9sUHhjLW1LU2xDMzdkeV9Fc3NxelEiLCJwaG9uZUlkIjoiMTNmYWE1MDQtNjJjMy00N2QzLWI5OWEtMGY0ZDg0ZjgyODA1IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5QYTJ1VGdSM2s1NTVOd0kxUWJVT1VPM0ZTST0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIdk9aam9WcndHM24xemZSeVhLd3hkNXh3NkU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiSEM1SkFWVlIiLCJtZSI6eyJpZCI6IjI3ODM4NjgyMjgzOjlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiTW9vZHNzYnk1NjMifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ091VTFNZ0JFUGE3NWJFR0dBMGdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlRucDVqQXF0NVpUWE9QZ1dIME8rMFFNVVVUWnBVZmY1QUx6cDQzaUJpbnc9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImpHbjZ3U3JsQ2k1eVlXbUhMdU15dWVFTlZwTkJITmttNEw1R2drU2J4YVhqaW4ydXBpZ3NYdy9DWjBlTnF5ZTBTdExjaWh6Z1JDcFUzdTI3a1NtREN3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJiQVR1OTRBb09pVkpMODRZQWRIbXRMZkV3cVFkSjR4OVkwVDUvV0FLZ3RITlVzMVQrcGxGbWQ2cXRocXlvdEFMdnRWRUg2c0pFcmlpWDhVQk50MXZpUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI3ODM4NjgyMjgzOjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVTU2ZVl3S3JlV1Uxemo0Rmg5RHZ0RURGRkUyYVZIMytRQzg2ZU40Z1lwOCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxNTAzNTY0MSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFPTS8ifQ==" //put your bot number here

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
