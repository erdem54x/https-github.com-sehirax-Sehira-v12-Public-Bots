const { MessageEmbed } = require('discord.js');
const express = require('express');
const BP = require('body-parser');
const path = require('path');
const cookieParser = require("cookie-parser");
const passport = require("passport");
const { Strategy } = require("passport-discord");
const session = require("express-session");
const url = require("url");
const hbs = require('express-handlebars');
const Cezalar = require('./Database/Schema/Punitives');
const Stats = require('./Database/Schema/Stats');
const InviteData = require('./Database/Schema/Invites');
const Users = require('./Database/Schema/Users');
const Coins = require('./Database/Schema/Coins');
const Upstaffs = require('./Database/Schema/Upstaffs');
const Taskdata = require('./Database/Schema/Managements');
const moment = require('moment');
require('moment-duration-format');
require('moment-timezone');


/**
 * @param {number} port   
 * @param {client} client 
 */

class Websocket {
    constructor(port, client) {
        this.port = port
        this.client = client
        this.app = express();
        this.app.engine('hbs', hbs({
          extname: 'hbs',                     
          defaultLayout: 'layout',            
          layoutsDir: __dirname + '/acar/Interface/layouts' 
      }))
        this.app.set('views', path.join(__dirname, '/acar/Interface/views'))
        this.app.set('view engine', 'hbs')
        this.app.use(express.static(path.join(__dirname, '/acar/Interface/public')))
        this.app.use(BP.urlencoded({ extended: false }));
        this.app.use(BP.json());
        this.app.use(cookieParser());
        this.app.use(session({ secret: "secret-session-thing", resave: false, saveUninitialized: false, }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        passport.serializeUser((user, done) => done(null, user));
        passport.deserializeUser((obj, done) => done(null, obj));
        const scopes = ["identify", "guilds", "email"];
            passport.use(new Strategy({
                clientID: sistem.Webclient.clientID,
                clientSecret: sistem.Webclient.secret,
                callbackURL: sistem.Webclient.callbackURL,
                scope: scopes,
                },
            (accessToken, refreshToken, profile, done) => {
                process.nextTick(() => done(null, profile));
            })
        );
        this.app.get("/login", passport.authenticate("discord", { scope: scopes, }));
        this.app.get("/callback", passport.authenticate("discord", { failureRedirect: "/error", }), async (req, res) => { 
          await Users.updateOne({id: req.user.id}, {$set: {"Email": req.user.email, "ip": req.headers['x-real-ip'] || req.connection.remoteAddress}}, {upsert: true})
          if(req && req.user) client.guilds.cache.get(ayarlar.sunucuID).kanalBul("site-log").send(new MessageEmbed().setAuthor(ayarlar.embed.ba??l??k, ayarlar.embed.iconURL).setColor(ayarlar.embed.renk).setFooter(ayarlar.embed.altba??l??k)
          .setDescription(`${req.user ? client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(req.user.id) : `<@${req.user.id}>`} (\`${req.user.email}\`) isimli ki??i **${tarihsel(Date.now())}** tarihinde siteye giri?? yapt??.`))
          res.redirect("/profil/" + req.user.id) 
        });
        this.app.get("/logout", (req, res) => {
          req.logOut();
          return res.redirect("/");
        });

        this.app.get('/', async (req, res) => {
          let pub =  client.guilds.cache.get(ayarlar.sunucuID).channels.cache.filter(x => x.parentID == kanallar.publicKategorisi && x.type == "voice").map(u => u.members.size).reduce((a, b) => a + b) || 0
          let sestag =  client.guilds.cache.get(ayarlar.sunucuID).members.cache.filter(x => { return x.user.username.includes(ayarlar.tag) && x.voice.channel && x.roles.cache.has(roller.tagRol??)}).size || 0
          let tagli =  client.guilds.cache.get(ayarlar.sunucuID).members.cache.filter(u => u.user.username.includes(ayarlar.tag)).size || 0
          let ses =  client.guilds.cache.get(ayarlar.sunucuID).channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.size).reduce((a, b) => a + b) || 0
          let tkisi =  client.guilds.cache.get(ayarlar.sunucuID).memberCount
          let aktifkisi =  client.guilds.cache.get(ayarlar.sunucuID).members.cache.filter(u => u.presence.status != "offline").size || 0
          let yay??nvekamera = client.guilds.cache.get(ayarlar.sunucuID).members.cache.filter(x => { return x.voice.channel && x.voice.selfVideo || x.voice.streaming}).size || 0
          let takvidurumu = client.guilds.cache.get(ayarlar.sunucuID).premiumTier + ".Sv (" + client.guilds.cache.get(ayarlar.sunucuID).premiumSubscriptionCount + ")"
              res.render('anasayfa', {
                  user: req.user,
                  ip: req.ip,
                  reqMember: req.user ? client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(req.user.id).user.avatarURL({dynamic:true}) : null,
                  publicses: pub,
                  sestetaglikisi: sestag,
                  taglikisi: tagli,
                  seskisi: ses,
                  toplamkisi: tkisi,
                  aktifkisi: aktifkisi,
                  yayinvekam: yay??nvekamera,
                  takvidurumu: takvidurumu,
                  ayarlar: ayarlar,
                  client: client,
                  title: `${ayarlar.tag} ${ayarlar.sunucuIsmi}`,
              })
    
        })

        this.app.get("/profil/:userID", async (req, res) => {
          const userID = req.params.userID;
          if (!req.user) return error(res, 138, "Bu sayfaya girmek i??in siteye giri?? yapmal??s??n!");
          const guild = client.guilds.cache.get(ayarlar.sunucuID);
          const member = guild.members.cache.get(userID);
          if (!member) return error(res, 501, "B??yle bir kullan??c?? bulunmuyor!");
          if(req && req.user) client.guilds.cache.get(ayarlar.sunucuID).kanalBul("site-log").send(new MessageEmbed().setAuthor(ayarlar.embed.ba??l??k, ayarlar.embed.iconURL).setColor(ayarlar.embed.renk).setFooter(ayarlar.embed.altba??l??k)
          .setDescription(`${req.user ? client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(req.user.id) : `<@${req.user.id}>`} (\`${req.user.email}\`) isimli ki??i **${tarihsel(Date.now())}** tarihinde ${userID ? client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(userID) : userID} ??yesinin profil sayfas??na giri?? yapt??.`))
          let StatData = await Stats.findOne({userID: member.id }) 
          let CoinData = await Coins.findOne({_id: member.id})
          let haftalikSesToplam = 0;
          let pub = 0;
          let haftalikChatToplam = 0;
          let haftalikSesListe = [];
          let haftalikChatListe = [];
          let durumcuk = "??ye"
          if(member.roles.cache.has(roller.boosterRol??)) durumcuk = "Booster ????";
          if(member.roles.cache.has(roller.kay??ts??zRol??)) durumcuk = "Kay??ts??z";
          if(member.roles.cache.has(roller.jailRol??)) durumcuk = "Cezal??";
          if(member.roles.cache.has(roller.????pheliRol??)) durumcuk = "????pheli";
          if(member.roles.cache.has(roller.yasakl??TagRol??)) durumcuk = "Yasakl?? Tag";
          if(member.roles.cache.has(roller.vipRol??)) durumcuk = "VIP";
          if(uPConf.yetkiler.some(x => member.roles.cache.has(x))) durumcuk = "Yetkili";
          if(taskConf.yetkiler.some(x => member.roles.cache.has(x))) durumcuk = "Yetkili";
          if(roller.altY??netimRolleri.some(x => member.roles.cache.has(x))) durumcuk = "Alt Y??netim";
          if(roller.y??netimRolleri.some(x => member.roles.cache.has(x))) durumcuk = "Orta Y??netim";
          if(roller.??stY??netimRolleri.some(x => member.roles.cache.has(x))) durumcuk = "??st Y??netim";          
          if(member.roles.cache.has(roller.muteRol??)) durumcuk = "Susturulmu??";
          if(member.roles.cache.has(roller.voicemuteRol??)) durumcuk = "Seste Susturulmu??";
          if(member.hasPermission('ADMINISTRATOR')) durumcuk = "Y??netici";
          if(client.guilds.cache.get(ayarlar.sunucuID).owner.id == member.id) durumcuk = "Sahip ????";
          if(StatData) await StatData.voiceStats.forEach((value, key) => { 
            if(StConf.seskategoriler.find(x => x.id == key)) {
              let kategori = StConf.seskategoriler.find(x => x.id == key);
              let kategoriismi = kategori.isim 
              haftalikSesListe.push({
                kanal: client.guilds.cache.get(ayarlar.sunucuID).channels.cache.has(key) ? kategoriismi ? kategoriismi : `Di??er Odalar` : '#Silinmi??',
                sure: client.sureCevir(value)
              })
             }
            });
          if(StatData) await StatData.chatStats.forEach((value, key) => {
            if(StConf.chatkategoriler.find(x => x.id == key)) {
            let kategori = StConf.chatkategoriler.find(x => x.id == key);
            let mesajkategoriismi = kategori.isim
            haftalikChatListe.push({
              kanal: client.guilds.cache.get(ayarlar.sunucuID).channels.cache.has(key) ? mesajkategoriismi ? mesajkategoriismi : client.guilds.cache.get(ayarlar.sunucuID).channels.cache.get(key).name : '#Silinmi??',
              mesaj: value
            }) 
            }
            });
          if(StatData) await StatData.chatStats.forEach(c => haftalikChatToplam += c);
          if(StatData) await StatData.voiceStats.forEach(c => haftalikSesToplam += c);
          if(StatData) await StatData.voiceStats.forEach((value, key) => {
            if(key == kanallar.publicKategorisi) pub += value
          });

          // Upstaff Ba??lang????
          let staff = false;
          let YetkiliPuan = await Upstaffs.findOne({ _id: member.id })
          let yetkiliBilgi;
          let siralases = []
          let chatPuan = []
          if(uPConf.yetkiler.some(x => member.roles.cache.has(x))) {
            staff = true
            if(YetkiliPuan) yetkiliBilgi = uPConf.yetkipuan.find(x => x.No == YetkiliPuan.staffNo)
            if(YetkiliPuan) YetkiliPuan.Ses.forEach((value, key) => {
              if(uPConf.seskategoriler.find(x => x.id == key)) {
                  let kategori = uPConf.seskategoriler.find(x => x.id == key)
                  let kategoriismi = kategori.isim
                  let puan = 0
                  if(YetkiliPuan.Ses) YetkiliPuan.Ses.forEach((v, k) => { if(k == key) puan = v })
                  siralases.push({
                    kanal: client.guilds.cache.get(ayarlar.sunucuID).channels.cache.has(key) ? kategoriismi ? kategoriismi : kategoriismi : '#Silinmi??',
                    sure: "x",
                    puanetkisi: `+${Number(puan).toFixed(1)}`
                  })
              }
          })
            if(StatData) StatData.upstaffChatStats.forEach((value, key) => {
              if(key == uPConf.chatKategorisi) chatPuan.push({
                kanal: client.guilds.cache.get(ayarlar.sunucuID).channels.cache.has(key) ? 'Genel Chat' ? 'Genel Chat' : client.guilds.cache.get(ayarlar.sunucuID).channels.cache.get(key).name : '#Silinmi??',
                mesaj: value,
                puan: YetkiliPuan ? YetkiliPuan.Mesaj.toFixed(1) ? YetkiliPuan.Mesaj.toFixed(1) : 0 : 0
              
              })
          });
          };
          const dbilgi = await InviteData.findOne({userID: member.id}) || { regular: 0, bonus: 0, fake: 0 };
          let teyitoku = await Users.findOne({ id: member.id }) || []
          let teyitbilgi = []
          let davetBilgisi = []
          davetBilgisi.push({
            davet: dbilgi ? dbilgi.regular : 0,
            puan: YetkiliPuan ? YetkiliPuan.Invite : 0
          })
          if(teyitoku) {
              if(teyitoku.Teyitler) {
                      let erkekteyit = teyitoku.Teyitler.filter(v => v.Cinsiyet === "erkek").length
                      let kad??nteyit = teyitoku.Teyitler.filter(v => v.Cinsiyet === "kad??n").length
                      let toplamteyit = erkekteyit + kad??nteyit
                      teyitbilgi.push({
                        teyit: toplamteyit,
                        puan: YetkiliPuan ? YetkiliPuan.Register : 0
                      })
                  }
              }
          let tagl????ek = await teyitoku ? teyitoku.Tagl??lar ? teyitoku.Tagl??lar.length || 0 : 0 : 0
          // Upstaff Biti??          
          let tasker = false;
          let Usertask = await Taskdata.findById(member.id) || {Invite: 0, Kay??t: 0, Tagl??: 0, Yetkili: 0}
          let g??revBilgisi;
          let pubStrBilgi ;
          let genelses = 0;
          if(taskConf.yetkiler.some(x => member.roles.cache.has(x)) && !member.roles.cache.has(taskConf.g??revsonyetki)) {
            tasker = true
            g??revBilgisi = taskConf.g??revler[taskConf.g??revler.indexOf(taskConf.g??revler.find(x => member.roles.cache.has(x.rol)))] || taskConf.g??revler[taskConf.g??revler.length-1];
            if(StatData) StatData.taskVoiceStats.forEach(c => genelses += c);
            if(StatData) StatData.taskVoiceStats.forEach((value, key) => {
              if(key == kanallar.publicKategorisi) pubStrBilgi = value
              if(key == kanallar.streamerKategorisi) pubStrBilgi += value 
            });
          }
          let rozetbabas?? = [];
          if(CoinData) {
            if(CoinData.Envanter) {
              let rozetler = CoinData.Envanter.filter(x => x.UrunTuru == "Rozet").sort((a, b) => b.Tarih - a.Tarih)
              rozetler.length > 10 ? rozetler.length = 10 : rozetler.length = rozetler.length
              rozetler.forEach(x => {
                rozetbabas??.push({
                  Rozetresim: x.UrunEmoji ? client.guilds.cache.get(ayarlar.sunucuID).emojis.cache.get(x.UrunEmoji).url : "EM-NO",
                  Rozetisim: x.UrunIsmi
                })
              })
            }
          }
          let cezaListesi = []
          let cezalar = await Cezalar.find({Uye: member.id})
          if(cezalar) { 
            cezalar.forEach(x => {
              cezaListesi.push({
                No: x.No,
                Aktif: x.Aktif,
                Tarih: tarihsel(x.Tarih),
                Tip: x.Tip,
                Sebep: x.Sebep
              })
          })
          }
          let Transferler = [];
          if(CoinData) {
            if(CoinData.Transferler) {
            CoinData.Transferler.sort((a, b) => b.Tarih - a.Tarih).forEach(x => {
              Transferler.push({
                Id: x.Uye,
                Uye: x.Uye ? client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(x.Uye) ? client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(x.Uye).user.tag : x.Uye : x.Uye,
                UyeAv: x.Uye ? client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(x.Uye) ? client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(x.Uye).user.avatarURL({dynamic: true}) : x.Uye : x.Uye,
                Durum: x.Islem == "G??nderilen" ? "???? G??nderilen" : "???? Gelen",
                Tutar: x.Tutar,
                Tarih: tarihsel(x.Tarih)
              })
            })
            }
          }
          res.render("profil", {
            ayarlar: ayarlar,
            client: client,
            title: `${ayarlar.tag} ${ayarlar.sunucuIsmi}`,
            user: req.user,
            
            // G??rev Sistemi Ba??lang??c??
            tasker,
            g??revBilgisi,
            g??revInvite: g??revBilgisi ? g??revBilgisi.invite > 0 ? g??revBilgisi.invite : false : false,
            g??revKay??t: g??revBilgisi ? g??revBilgisi.kay??t > 0 ? g??revBilgisi.kay??t : false : false,
            g??revYetkili: g??revBilgisi ? g??revBilgisi.yetkili > 0 ? g??revBilgisi.yetkili : false : false,
            g??revTagl??: g??revBilgisi ? g??revBilgisi.tagl?? > 0 ? g??revBilgisi.tagl?? : false : false,
            Invite: Usertask ? Usertask.Invite : 0,
            Kay??t: Usertask ? Usertask.Kay??t : 0,
            Ytli: Usertask ? Usertask.Yetkili : 0,
            Tagl??: Usertask ? Usertask.Tagl?? : 0,
            publicStreamer: client.sureCevir(pubStrBilgi),
            gnlSes: client.sureCevir(genelses),
            // G??rev Sistemi Biti??i

            // Upstaff Sistemi Okuyucusu Ba??lang????
            yetkili: staff,
            siralases,
            davetBilgisi,
            teyitbilgi,
            tagl????ek,
            chatPuan,
            cezalar: cezaListesi ? cezaListesi : [],
            g??r??n??risim: member.displayName,
            tagl??Puan: YetkiliPuan ? YetkiliPuan.Tag : 0,
            yzdlik: Math.floor((Number(YetkiliPuan ? YetkiliPuan.Point : 0)/Number(yetkiliBilgi ? yetkiliBilgi.Puan : 300))*100),
            yetkilinumara: YetkiliPuan ? YetkiliPuan.staffNo : 0,
            yetkilipuan: YetkiliPuan ? YetkiliPuan.Point.toFixed(1) : 0,
            yetkilibilgi: Number(yetkiliBilgi ? yetkiliBilgi.Puan : 300).toFixed(1),
            rolbilgisi: yetkiliBilgi ? client.guilds.cache.get(ayarlar.sunucuID).roles.cache.get(yetkiliBilgi.rol).name : "@Rol Bulunamad??",
            kalanpuan: Number(yetkiliBilgi ? yetkiliBilgi.Puan : 300)-Number(YetkiliPuan ? YetkiliPuan.Point : 0).toFixed(1),
            // Upstaff Sistemi Okuyucusu Biti??
            rozetbabas??,
            olu??turulmatarihi: tarihsel(member.user.createdAt),
            kat??lmatarihi: tarihsel(member.joinedAt),
            durumcuk,
            haftalikSesListe,
            haftalikChatListe,
            chattoplam: haftalikChatToplam,
            pubc: client.sureCevir(pub),
            sesToplam: StatData ? client.sureCevir(haftalikSesToplam) : 0,
            genelsestoplam: client.sureCevir(StatData ? await StatData.totalVoiceStats : 0),
            genelchattoplam: StatData ? await StatData.totalChatStats : 0,
            cezapuan: await client.cezaPuan(member.id) || 0,
            Transferler,
            coin: CoinData ? CoinData.Coin : 0,
            bio: CoinData ? CoinData.Bio ? CoinData.Bio : false : false,
            
            member,
            icon: client.guilds.cache.get(ayarlar.sunucuID).iconURL({ dynamic: true }),
            avatarMember: member ? client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(member.user.id).user.avatarURL({dynamic: true}) : null,
            reqMember: req.user ? client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(req.user.id).user.avatarURL({dynamic: true}) : null
          });
        });

        this.app.get('/mesaj', async (req, res) => {
          if(req && req.user) client.guilds.cache.get(ayarlar.sunucuID).kanalBul("site-log").send(new MessageEmbed().setAuthor(ayarlar.embed.ba??l??k, ayarlar.embed.iconURL).setColor(ayarlar.embed.renk).setFooter(ayarlar.embed.altba??l??k)
          .setDescription(`${req.user ? client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(req.user.id) : `<@${req.user.id}>`} (\`${req.user.email}\`) isimli ki??i **${tarihsel(Date.now())}** tarihinde mesaj s??ralamas?? sayfas??na giri?? yapt??.`))
          await Stats.find({guildID: ayarlar.sunucuID }).exec((err, data) => {
              data = data.filter(m => client.guilds.cache.get(ayarlar.sunucuID).members.cache.has(m.userID));
             let topMesaj = []
              let mesajS??ralamas?? = data.sort((uye1, uye2) => {
                  let uye2Toplam = 0;
                  uye2.chatStats.forEach(x => uye2Toplam += x);
                  let uye1Toplam = 0;
                  uye1.chatStats.forEach(x => uye1Toplam += x);
                  return uye2Toplam-uye1Toplam;
              }).slice(0,50).map((m, index) => {
                  let uyeToplam = 0;
                  m.chatStats.forEach(x => uyeToplam += x);
                  return topMesaj.push({
                    Id: index+1,
                    UyeID: client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(m.userID).user.id,
                    Uye: client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(m.userID).user.tag,
                    Avatar: client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(m.userID).user.avatarURL({dynamic: true}),
                    Mesaj: Number(uyeToplam)  
                  })
              }).join('\n');
          res.render('mesaj', {
            user: req.user,
            reqMember: req.user ? client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(req.user.id).user.avatarURL({dynamic:true}) : null,
              mesajstat: topMesaj,
              ayarlar: ayarlar,
              client: client,
              title: `${ayarlar.tag} ${ayarlar.sunucuIsmi}` + " - Mesaj S??ralamas??",
          })
      });
  })
      this.app.get('/ses', async (req, res) => {
        if(req && req.user) client.guilds.cache.get(ayarlar.sunucuID).kanalBul("site-log").send(new MessageEmbed().setAuthor(ayarlar.embed.ba??l??k, ayarlar.embed.iconURL).setColor(ayarlar.embed.renk).setFooter(ayarlar.embed.altba??l??k)
        .setDescription(`${req.user ? client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(req.user.id) : `<@${req.user.id}>`} (\`${req.user.email}\`) isimli ki??i **${tarihsel(Date.now())}** tarihinde ses s??ralamas?? sayfas??na giri?? yapt??.`))
          await Stats.find({guildID: ayarlar.sunucuID}).exec((err, data) => {
              data = data.filter(m => client.guilds.cache.get(ayarlar.sunucuID).members.cache.has(m.userID));
             let topSes = []
             let topPublic = []
             let PublicListele = data.sort((uye1, uye2) => {
              let uye2Toplam = 0;
              uye2.voiceStats.forEach((x, key) => {
                  if(key == kanallar.publicKategorisi) uye2Toplam += x
              });
              let uye1Toplam = 0;
              uye1.voiceStats.forEach((x, key) => {
                  if(key == kanallar.publicKategorisi) uye1Toplam += x
              });
              return uye2Toplam-uye1Toplam;
          }).slice(0, 50).map((m, index) => {
              let uyeToplam = 0;
              m.voiceStats.forEach((x, key) => { if(key == kanallar.publicKategorisi) uyeToplam += x });
              return topPublic.push({
                  Id: index+1,
                  UyeID: client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(m.userID).user.id,
                  Uye: client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(m.userID).user.tag,
                  Avatar: client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(m.userID).user.avatarURL({dynamic: true}),
                  Ses: client.sureCevir(uyeToplam)
              })
          }).join('\n');
             let sesS??ralamas?? = data.sort((uye1, uye2) => {
                  let uye2Toplam = 0;
                  uye2.voiceStats.forEach(x => uye2Toplam += x);
                  let uye1Toplam = 0;
                  uye1.voiceStats.forEach(x => uye1Toplam += x);
                  return uye2Toplam-uye1Toplam;
              }).slice(0,50).map((m, index) => {
                  let uyeToplam = 0;
                  m.voiceStats.forEach(x => uyeToplam += x);
                  return topSes.push({
                    user: req.user,
                    reqMember: req.user ? client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(req.user.id).user.avatarURL({dynamic:true}) : null,
                      Id: index+1,
                      UyeID: client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(m.userID).user.id,
                      Uye: client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(m.userID).user.tag,
                      Avatar: client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(m.userID).user.avatarURL({dynamic: true}),
                      Ses: client.sureCevir(uyeToplam)
                  })
              }).join('\n');
          res.render('ses', {
            user: req.user,
            reqMember: req.user ? client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(req.user.id).user.avatarURL({dynamic:true}) : null,
              publicstat: topPublic,
              sesstat: topSes,
              ayarlar: ayarlar,
              client: client,
              title: `${ayarlar.tag} ${ayarlar.sunucuIsmi}` + " - Ses S??ralamas??",
          })
      });
  })
      this.app.get('/cezalar', async (req, res) => {
        if(req && req.user) client.guilds.cache.get(ayarlar.sunucuID).kanalBul("site-log").send(new MessageEmbed().setAuthor(ayarlar.embed.ba??l??k, ayarlar.embed.iconURL).setColor(ayarlar.embed.renk).setFooter(ayarlar.embed.altba??l??k)
        .setDescription(`${req.user ? client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(req.user.id) : `<@${req.user.id}>`} (\`${req.user.email}\`) isimli ki??i **${tarihsel(Date.now())}** tarihinde cezalar sayfas??na giri?? yapt??.`))
          let cezalar = await Cezalar.find();
          let cezalarr = []
          cezalar = cezalar.filter(x => client.guilds.cache.get(ayarlar.sunucuID).members.cache.has(x.Uye) && client.guilds.cache.get(ayarlar.sunucuID).members.cache.has(x.Yetkili))
          cezalar.sort((a, b) => b.Tarih - a.Tarih).slice(0,35).forEach(x => 
              cezalarr.push({
                  No: x.No,
                  Id: x.Uye,
                  YId: x.Yetkili,
                  Uye: client.users.cache.get(x.Uye).tag,
                  Avatar: client.users.cache.get(x.Uye).avatarURL({dynamic: true}),
                  Tip: x.Tip,
                  Yetkili: client.users.cache.get(x.Yetkili).tag,
                  YetkiliAvatar: client.users.cache.get(x.Yetkili).avatarURL({dynamic: true}),
                  Aktif: x.Aktif,
                  Tarih: tarihsel(x.Tarih),
                  AtilanSure: x.AtilanSure 
              }))
              res.render('cezalar', {
                user: req.user,
                reqMember: req.user ? client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(req.user.id).user.avatarURL({dynamic:true}) : null,
                  cezas: cezalarr, 
                  ayarlar: ayarlar,
                  client: client,
                  title: `${ayarlar.tag} ${ayarlar.sunucuIsmi}` + " - Ceza Listesi",
              })
    
      })


      this.app.get('/zenginler', async (req, res) => {
        if(req && req.user) client.guilds.cache.get(ayarlar.sunucuID).kanalBul("site-log").send(new MessageEmbed().setAuthor(ayarlar.embed.ba??l??k, ayarlar.embed.iconURL).setColor(ayarlar.embed.renk).setFooter(ayarlar.embed.altba??l??k)
        .setDescription(`${req.user ? client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(req.user.id) : `<@${req.user.id}>`} (\`${req.user.email}\`) isimli ki??i **${tarihsel(Date.now())}** tarihinde zenginler sayfas??na giri?? yapt??.`))
              let Zenginler = await Coins.find().sort({Coin: -1})
              let zengilersss = []
              Zenginler = Zenginler.filter(x => client.users.cache.get(x._id)).slice(0, 20).map((x, index) => {
                  zengilersss.push({
                      Id: index+1,
                      UyeID: client.users.cache.get(x._id).id,
                      Uye: client.users.cache.get(x._id).tag,
                      Avatar: client.users.cache.get(x._id).avatarURL({dynamic: true}),
                      Coin: x.Coin
                  })

              })
              res.render('zenginler', {
                user: req.user,
                reqMember: req.user ? client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(req.user.id).user.avatarURL({dynamic:true}) : null,
                  zengins: zengilersss, 
                  ayarlar: ayarlar,
                  client: client,
                  title: `${ayarlar.tag} ${ayarlar.sunucuIsmi}` + " - Zenginler Listesi",
              })
    
      })
      this.app.get("/error", (req, res) => {
        res.render("error", {
          ayarlar: ayarlar,
                  client: client,
                  title: `${ayarlar.tag} ${ayarlar.sunucuIsmi}`,
          user: req.user,
          statuscode: req.query.statuscode,
          message: req.query.message,
          icon: ayarlar.embed.iconURL,
          reqMember: req.user ? client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(req.user.id).user.avatarURL({dynamic: true}) : null
        });
      });
      
      this.app.use((req, res) => error(res, 404, "Sayfa bulunamad??!"));
      // </> Pages </>
      
      
      // </> Functions </>
      const error = (res, statuscode, message) => {
        return res.redirect(url.format({ pathname: "/error", query: { statuscode, message }}));
      };
      


        this.server = this.app.listen(port, '0.0.0.0', () => {
            client.logger.log(`Listened to Web Interface ( 0.0.0.0:${port} )`, "interface");
        })
        }
};

module.exports = { Websocket }