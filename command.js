require("./config.js")
const fs = require("fs")

const {
    getGroupAdmins,
} = require("./lib/library.js")

module.exports = async (fell, m) => {
    try {
        const body = (
            (m.mtype === 'conversation' && m.message.conversation) ||
            (m.mtype === 'imageMessage' && m.message.imageMessage.caption) ||
            (m.mtype === 'documentMessage' && m.message.documentMessage.caption) ||
            (m.mtype === 'videoMessage' && m.message.videoMessage.caption) ||
            (m.mtype === 'extendedTextMessage' && m.message.extendedTextMessage.text) ||
            (m.mtype === 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ||
            (m.mtype === 'templateButtonReplyMessage' && m.message.templateButtonReplyMessage.selectedId)
        ) ? (
            (m.mtype === 'conversation' && m.message.conversation) ||
            (m.mtype === 'imageMessage' && m.message.imageMessage.caption) ||
            (m.mtype === 'documentMessage' && m.message.documentMessage.caption) ||
            (m.mtype === 'videoMessage' && m.message.videoMessage.caption) ||
            (m.mtype === 'extendedTextMessage' && m.message.extendedTextMessage.text) ||
            (m.mtype === 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ||
            (m.mtype === 'templateButtonReplyMessage' && m.message.templateButtonReplyMessage.selectedId)
        ) : '';

        const budy = (typeof m.text === 'string') ? m.text : '';
        const prefixRegex = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/;
        const prefix = prefixRegex.test(body) ? body.match(prefixRegex)[0] : '.';
        const isCmd = body.startsWith(prefix);
        const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
        const args = body.trim().split(/ +/).slice(1)
        const text = q = args.join(" ")
        const sender = m.key.fromMe ? (fell.user.id.split(':')[0] + '@s.whatsapp.net' || fell.user.id) : (m.key.participant || m.key.remoteJid)
        const botNumber = await fell.decodeJid(fell.user.id)
        const senderNumber = sender.split('@')[0]
        const pushname = m.pushName || `${senderNumber}`
        const isBot = botNumber.includes(senderNumber)
        const fatkuns = (m.quoted || m)
        const quoted = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m
        const mime = (quoted.m || quoted).mimetype || ''
        const qmsg = (quoted.m || quoted)
        const isCreator = (m && m.sender && [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)) || false;

        const groupMetadata = m.isGroup ? await fell.groupMetadata(m.chat).catch(e => { }) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
        const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
        const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
        const groupOwner = m.isGroup ? groupMetadata.owner : ''
        const isGroupOwner = m.isGroup ? (groupOwner ? groupOwner : groupAdmins).includes(m.sender) : false

        if (isCmd) console.log("~> [CMD]", command, "from", pushname, "in", m.isGroup ? "Group Chat" : "Private Chat", '[' + args.length + ']');

        switch (command) {

            //Start

            case 'start':
                m.reply('Hi, Welcome to Ai Media Studio To Continue Please Select Your Prefered Language\nහායි,Ai Media Studio වෙත සාදරයෙන් පිළිගනිමු,ඉදිරියට යාම සදහා කරුණාකර ඔබ කැමති භාෂාව තෝරන්න\n e. English \n s. සිංහල (Tpye A Dot Before Typing The Number ex:- .1 \nඔබට අවශ්‍ය අංකය තේරීමට පෙර . එකක් ඇතුලත් කරන්න උදා;- *.1*)\n\n*Chat Bot  By Udavin*')
                break;

            //English

            case 'e':
                m.reply('Hi, Welcome to Ai Media Studio\nHow Can I Help You Today?\n1️⃣ New Packages\n2️⃣ Sample Video\n3️⃣ Voice Over Packages\n4️⃣ Payment Details\n5️⃣Contact Assistant For Help\nPlease Reply With The Number For Get My Service (Use A . Before Number)\n\n*Chat Bot  By Udavin*')
                break;

            //Sinhala
            case 's':
                m.reply('ආයුබෝවන්, Ai Media Studio වෙත සාදරයෙන් පිළිගනිමු\nමම අද ඔබට උදව් කරන්නේ කෙසේද?\ns.1️⃣ නව පැකේජ\ns.2️⃣ නියැදි වීඩියෝව\ns.3️⃣ Voice Over Packages\ns.4️⃣ ගෙවීම් විස්තර\ns.5️⃣ උදවු සඳහා සහකරු අමතන්න\nකරුණාකර මගේ සේවාව ලබා ගැනීම සඳහා අංකය සමඟ පිළිතුරු දෙන්න(ඔබට අවශ්‍ය අංකය තේරීමට පෙර . එකක් ඇතුලත් කරන්න උදා;- *.1*)\n\n*Chat Bot  By Udavin*')
                break;

            //1
            case '1':
                m.reply('We Have Categorised Our Packages Please Select A Category You Want To Know\n1️⃣.1️⃣ Social Media Vido Package\n1️⃣.2️⃣ Tv Ad Video Package\n1️⃣.3️⃣ AI Video Package\n1️⃣.4️⃣ Overseas Video Package\n\n Reply With The Number You Want (Use A . Before Number)\n ex: *.1.1* \n\n*Chat Bot  By Udavin*')
                break;
            case 's.1':
                m.reply('අපි අපගේ පැකේජ වර්ගීකරණය කර ඇත, කරුණාකර ඔබට දැන ගැනීමට අවශ්‍ය ප්‍රවර්ගයක් තෝරන්න\n1️⃣.1️⃣ Social Media Vido පැකේජ\n1️⃣.2️⃣ Tv දැන්වීම් වීඩියෝ පැකේජ\n1️⃣.3️⃣ AI වීඩියෝ පැකේජ\n1️⃣.4️⃣ විදේශීය වීඩියෝ පැකේජ\n\n ඔබට අවශ්‍ය අංකය සමඟ පිළිතුරු දෙන්න(ඔබට අවශ්‍ය අංකය තේරීමට පෙර . එකක් ඇතුලත් කරන්න උදා;- *.1*)\n\n*Chat Bot  By Udavin*')
                break;

                case '1.1':
                    m.reply('📍 15 sec SD Add Rs:1499/= *(Max 15 Sec)*\n📍 20 sec HD Add Rs:1999/= *(Max 25 Sec)*\n📍 30 sec + 8sec Bonus 4K Add Rs:2999/=\n📍 40 sec + 8sec Bonus 4K Add Rs:3999/=\n📍 50 sec + 8sec Bonus 4K Add Rs:4999/=\n📍 60 sec + 8sec Bonus 4K Add Rs:5999/=\n\n\n*Chat Bot  By Udavin*')
                    break;
                
                case '1.2':
                    m.reply('📍 10 sec 4K TV Add Rs:2500/= Up\n📍 10 sec 4K Tele Add Rs:2500/= Up\n\n*Chat Bot  By Udavin*')
                    break;
                
                case '1.3':
                    m.reply('📍 25 Sec AI Voice With HD Video Add Rs1499/=\n📍 30 Sec AI Voice With HD Video Add Rs1999/=\n📍 40 Sec AI Voice With HD Video Add Rs2500/=\n\n\n*Chat Bot  By Udavin*')
                    break;

                case '1.4':
                    m.reply('📍 25 Sec Overseas 4K/FHd Video Ad $19.90/=\n\n\n*Chat Bot  By Udavin*')
                    break;

             //2       
            case '2':
                m.reply('Please Select The Category\n 2️⃣.1️⃣ Social Media Vido Package\n 2️⃣.2️⃣ Tv Ad Video Package\n 2️⃣.3️⃣ AI Video Package\n 2️⃣.4️⃣ Overseas Video Package\n\n Reply With The Number You Want (Use A . Before Number)\n ex: *.1.1* \n\n*Chat Bot  By Udavin*')
                break;
            case 's.2':
                m.reply('කරුණාකර ඔබට දැන ගැනීමට අවශ්‍ය ප්‍රවර්ගයක් තෝරන්න\n 2️⃣.1️⃣ Social Media Vido පැකේජ\n 2️⃣.2️⃣ Tv දැන්වීම් වීඩියෝ පැකේජ\n 2️⃣.3️⃣ AI වීඩියෝ පැකේජ\n 2️⃣.4️⃣ විදේශීය වීඩියෝ පැකේජ\n\n ඔබට අවශ්‍ය අංකය සමඟ පිළිතුරු දෙන්න(ඔබට අවශ්‍ය අංකය තේරීමට පෙර . එකක් ඇතුලත් කරන්න උදා;- *.1*)\n\n*Chat Bot  By Udavin*')
                break;

                case '2.1':
                    m.reply('Please Select The Category\nකරුණාකර ඔබට දැන ගැනීමට අවශ්‍ය ප්‍රවර්ගයක් තෝරන්න\n 2️⃣.1️⃣.1️⃣ English\n 2️⃣.1️⃣.2️⃣ Sinhala\n 2️⃣.1️⃣.3️⃣ Tamil\n\n Reply With The Number You Want (Use A . Before Number)\n ex: *.1.1* \n\n*Chat Bot By Udavin*');
                    break;
                
                // Video Samples
                
                case '2.1.1':
                    const mediaItems1 = [
                        { path: 'Media/Video/English/Social media/Video 1.mp4', caption: 'English Social Media Video Sample 1' }
                    ];
                
                    await Promise.all(
                        mediaItems1.map(async (item) => {
                            const mediaBuffer = fs.readFileSync(item.path);
                            await fell.sendMessage(
                                m.chat,
                                { video: mediaBuffer, caption: item.caption },
                                { quoted: m }
                            );
                        })
                    );
                    break;
                
                case '2.1.2':
                    const mediaItems2 = [
                        { path: 'Media/Video/Sinhala/Social media/Sample 1.mp4', caption: 'Sinhala Social Media Video Sample 1' },
                        { path: 'Media/Video/Sinhala/Social media/Sample 2.mp4', caption: 'Sinhala Social Media Video Sample 2' },
                        { path: 'Media/Video/Sinhala/Social media/Sample 3.mp4', caption: 'Sinhala Social Media Video Sample 3' },
                        { path: 'Media/Video/Sinhala/Social media/Sample 4.mp4', caption: 'Sinhala Social Media Video Sample 4' }
                    ];
                
                    await Promise.all(
                        mediaItems2.map(async (item) => {
                            const mediaBuffer = fs.readFileSync(item.path);
                            await fell.sendMessage(
                                m.chat,
                                { video: mediaBuffer, caption: item.caption },
                                { quoted: m }
                            );
                        })
                    );
                    break;
                
                case '2.1.3':
                    const mediaItems3 = [
                        { path: 'Media/Video/Tamil/Sample 1.mp4', caption: 'Tamil Social Media Video Sample 1' }
                    ];
                
                    await Promise.all(
                        mediaItems3.map(async (item) => {
                            const mediaBuffer = fs.readFileSync(item.path);
                            await fell.sendMessage(
                                m.chat,
                                { video: mediaBuffer, caption: item.caption },
                                { quoted: m }
                            );
                        })
                    );
                    break;
                
                    case '2.2':
                        m.reply('Please Select The Category\nකරුණාකර ඔබට දැන ගැනීමට අවශ්‍ය ප්‍රවර්ගයක් තෝරන්න\n 2️⃣.2️⃣.1️⃣ English\n 2️⃣.2️⃣.2️⃣ Sinhala\n 2️⃣.2️⃣.3️⃣ Tamil\n\n Reply With The Number You Want (Use A . Before Number)\n ex: *.1.1* \n\n*Chat Bot By Udavin*');
                        break;
                    
                    case '2.2.1':
                        const mediaItems4 = [
                            { path: 'Media/Sample.mp4', caption: 'English Tv Add Sample 1' }
                        ];
                    
                        await Promise.all(
                            mediaItems4.map(async (item) => {
                                const mediaBuffer = fs.readFileSync(item.path);
                                await fell.sendMessage(
                                    m.chat,
                                    { video: mediaBuffer, caption: item.caption },
                                    { quoted: m }
                                );
                            })
                        );
                        break;
                    
                    case '2.2.2':
                        const mediaItems5 = [
                            { path: 'Media/Video/Sinhala/TV/Tv Full ad/Sample 1.mp4', caption: 'Sinhala Full TV Ad Sample 1' },
                            { path: 'Media/Video/Sinhala/TV/Tv Full ad/Sample 2.mp4', caption: 'Sinhala Full TV Ad Sample 2' },
                            { path: 'Media/Video/Sinhala/TV/Tv Full ad/Sample 3.mp4', caption: 'Sinhala Full TV Ad Sample 3' },
                            { path: 'Media/Video/Sinhala/TV/Tv Full ad/Sample 4.mp4', caption: 'Sinhala Full TV Ad Sample 4' },
                            { path: 'Media/Video/Sinhala/TV/Tv Full ad/Sample 5.mp4', caption: 'Sinhala Full TV Ad Sample 5' },
                            { path: 'Media/Video/Sinhala/TV/Tv Full ad/Sample 6.mp4', caption: 'Sinhala Full TV Ad Sample 6' },
                            { path: 'Media/Video/Sinhala/TV/Tv Full ad/Sample 7.mp4', caption: 'Sinhala Full TV Ad Sample 7' },
                            { path: 'Media/Video/Sinhala/TV/Tv Tele ad/Sample 1.mp4', caption: 'Sinhala Tele TV Ad Sample 1' },
                            { path: 'Media/Video/Sinhala/TV/Tv Tele ad/Sample 2.mp4', caption: 'Sinhala Tele TV Ad Sample 2' }
                        ];
                    
                        await Promise.all(
                            mediaItems5.map(async (item) => {
                                const mediaBuffer = fs.readFileSync(item.path);
                                await fell.sendMessage(
                                    m.chat,
                                    { video: mediaBuffer, caption: item.caption },
                                    { quoted: m }
                                );
                            })
                        );
                        break;
                    
                    case '2.2.3':
                        const mediaItems6 = [
                            { path: 'Media/Sample.mp4', caption: 'Tamil Full TV Ad Sample 1' }
                        ];
                    
                        await Promise.all(
                            mediaItems6.map(async (item) => {
                                const mediaBuffer = fs.readFileSync(item.path);
                                await fell.sendMessage(
                                    m.chat,
                                    { video: mediaBuffer, caption: item.caption },
                                    { quoted: m }
                                );
                            })
                        );
                        break;
                    
                    case '2.3':
                        m.reply('Please Select The Category\nකරුණාකර ඔබට දැන ගැනීමට අවශ්‍ය ප්‍රවර්ගයක් තෝරන්න\n 2️⃣.3️⃣.1️⃣ English\n 2️⃣.3️⃣.2️⃣ Sinhala\n 2️⃣.3️⃣.3️⃣ Tamil\n\n Reply With The Number You Want (Use A . Before Number)\n ex: *.3.1* \n\n*Chat Bot By Udavin*');
                        break;
                    
                    case '2.3.1':
                        const mediaItems7 = [
                            { path: 'Media/Video/English/Ai/Sample 1.mp4', caption: 'English Ai Video Sample 1' }
                        ];
                    
                        await Promise.all(
                            mediaItems7.map(async (item) => {
                                const mediaBuffer = fs.readFileSync(item.path);
                                await fell.sendMessage(
                                    m.chat,
                                    { video: mediaBuffer, caption: item.caption },
                                    { quoted: m }
                                );
                            })
                        );
                        break;
                    
                    case '2.3.2':
                        const mediaItems8 = [
                            { path: 'Media/Sample.mp4', caption: 'Sinhala Ai Video Sample 1' }
                        ];
                    
                        await Promise.all(
                            mediaItems8.map(async (item) => {
                                const mediaBuffer = fs.readFileSync(item.path);
                                await fell.sendMessage(
                                    m.chat,
                                    { video: mediaBuffer, caption: item.caption },
                                    { quoted: m }
                                );
                            })
                        );
                        break;
                    
                    case '2.3.3':
                        const mediaItems9 = [
                            { path: 'Media/Sample.mp4', caption: 'Tamil Ai Video Sample 1' }
                        ];
                    
                        await Promise.all(
                            mediaItems9.map(async (item) => {
                                const mediaBuffer = fs.readFileSync(item.path);
                                await fell.sendMessage(
                                    m.chat,
                                    { video: mediaBuffer, caption: item.caption },
                                    { quoted: m }
                                );
                            })
                        );
                        break;

                        case '2.4':
                            const mediaItems10 = [
                                { path: 'Media/Video/Sinhala/Foreign/Sample 1.mp4', caption: 'Foreign Video Sample 1' },
                                { path: 'Media/Video/Sinhala/Foreign/Sample 2.mp4', caption: 'Foreign Video Sample 1'}
                            ];
                        
                            await Promise.all(
                                mediaItems10.map(async (item) => {
                                    const mediaBuffer = fs.readFileSync(item.path);
                                    await fell.sendMessage(
                                        m.chat,
                                        { video: mediaBuffer, caption: item.caption },
                                        { quoted: m }
                                    );
                                })
                            );
                            break;
                        


                    
            //3                              
            case '3':
                m.reply('Please Select The Language And Gender\n 3.1 Sinhala Male Voice Over\n 3.2 Sinhala Girl Voice Over\n 3.3 Tamil Boy Voice Over\n 3.4 Tamil Girl Voice Over\n 3.5 English Male Voce Over\n 3.6 English Female Voice Over\n\n Reply With The Number You Want (Use A . Before Number)\n ex: *.1.1* \n\n*Chat Bot  By Udavin*')
                break;
            case 's3':
                m.reply('කරුණාකර භාෂාව සහ ස්ත්‍රී පුරුෂ භාවය තෝරන්න\n 3.1 සිංහල පිරිමි කටහඬ \n 3.1 සිංහල ගැහැණු කටහඬ\n 3.3 දෙමළ පිරිමි කටහඬ \n 3.4 දෙමළ ගැහැණු කටහඬ \n 3.5 ඉංග්‍රීසි පිරිමි කටහඬ \n 3.6 ඉංග්‍රීසි කාන්තා කටහඬ\n \n ඔබට අවශ්‍ය අංකය සමඟ පිළිතුරු දෙන්න.(ඔබට අවශ්‍ය අංකය තේරීමට පෙර . එකක් ඇතුලත් කරන්න උදා;- *.1*) \n\n*Chat Bot  By Udavin*')
                break;

// Audio Samples

case '3.1':
    const audioPaths1 = [
        'Media/Voice/Sinhala M voice/Sample 1.mp3',
        'Media/Voice/Sinhala M voice/Sample 2.mp3',
        'Media/Voice/Sinhala M voice/Sample 3.mp3',
        'Media/Voice/Sinhala M voice/Sample 4.mp3',
        'Media/Voice/Sinhala M voice/Sample 5.mp3',
        'Media/Voice/Sinhala M voice/Sample 6.mp3',                   
        'Media/Voice/Sinhala M voice/Sample 7.mp3'
    ];

    const sendPromises1 = audioPaths1.map(audioPath => {
        const audioBuffer = fs.readFileSync(audioPath);
        return fell.sendMessage(
            m.chat,
            { audio: audioBuffer, mimetype: 'audio/mp4', ptt: true },
            { quoted: m }
        );
    });

    await Promise.all(sendPromises1);

    await new Promise(resolve => setTimeout(resolve, 1000)); 

    // Send a text message
    await fell.sendMessage(
        m.chat,
        { text: 'Please Reply For The Audio You Select කරුණාකර ඔබට අවශ්‍ය හඩ සමග රිප්ලයි(Reply) කරන්න\n\n*Chat Bot  By Udavin*' },
        { quoted: m }
    );
    break;

case '3.2':
    const audioPaths2 = [
        'Media/Voice/Sinhala F voice/Sample 1.mp3',
        'Media/Voice/Sinhala F voice/Sample 2.mp3',
        'Media/Voice/Sinhala F voice/Sample 3.mp3',
        'Media/Voice/Sinhala F voice/Sample 4.mp3',
        'Media/Voice/Sinhala F voice/Sample 5.mp3',
        'Media/Voice/Sinhala F voice/Sample 6.mp3'                  
    ];

    const sendPromises2 = audioPaths2.map(audioPath => {
        const audioBuffer = fs.readFileSync(audioPath);
        return fell.sendMessage(
            m.chat,
            { audio: audioBuffer, mimetype: 'audio/mp4', ptt: true },
            { quoted: m }
        );
    });

    await Promise.all(sendPromises2);

    await new Promise(resolve => setTimeout(resolve, 1000)); 

    // Send a text message
    await fell.sendMessage(
        m.chat,
        { text: 'Please Reply For The Audio You Select කරුණාකර ඔබට අවශ්‍ය හඩ සමග රිප්ලයි(Reply) කරන්න\n\n*Chat Bot  By Udavin*' },
        { quoted: m }
    );
    break;

    case '3.3':
        const audioPaths3 = [
            'Media/Voice/Sample.mp3'
        ];
    
        const sendPromises3 = audioPaths3.map(audioPath => {
            const audioBuffer = fs.readFileSync(audioPath);
            return fell.sendMessage(
                m.chat,
                { audio: audioBuffer, mimetype: 'audio/mp4', ptt: true },
                { quoted: m }
            );
        });
    
        await Promise.all(sendPromises3);
    
        await new Promise(resolve => setTimeout(resolve, 1000)); 
    
        // Send a text message
        await fell.sendMessage(
            m.chat,
            { text: 'Please Reply For The Audio You Select කරුණාකර ඔබට අවශ්‍ය හඩ සමග රිප්ලයි(Reply) කරන්න\n\n*Chat Bot  By Udavin*' },
            { quoted: m }
        );
        break;  
        
        case '3.4':
            const audioPaths4 = [
                'Media/Voice/Tamil F voice/Sample 1.mp3'
            ];
        
            const sendPromises4 = audioPaths4.map(audioPath => {
                const audioBuffer = fs.readFileSync(audioPath);
                return fell.sendMessage(
                    m.chat,
                    { audio: audioBuffer, mimetype: 'audio/mp4', ptt: true },
                    { quoted: m }
                );
            });
        
            await Promise.all(sendPromises4);
        
            await new Promise(resolve => setTimeout(resolve, 1000)); 
        
            // Send a text message
            await fell.sendMessage(
                m.chat,
                { text: 'Please Reply For The Audio You Select කරුණාකර ඔබට අවශ්‍ය හඩ සමග රිප්ලයි(Reply) කරන්න\n\n*Chat Bot  By Udavin*' },
                { quoted: m }
            );
            break;

            case '3.5':
                const audioPaths5 = [
                    'Media/Voice/Sample.mp3'
                ];
            
                const sendPromises5 = audioPaths5.map(audioPath => {
                    const audioBuffer = fs.readFileSync(audioPath);
                    return fell.sendMessage(
                        m.chat,
                        { audio: audioBuffer, mimetype: 'audio/mp4', ptt: true },
                        { quoted: m }
                    );
                });
            
                await Promise.all(sendPromises5);
            
                await new Promise(resolve => setTimeout(resolve, 1000)); 
            
                // Send a text message
                await fell.sendMessage(
                    m.chat,
                    { text: 'Please Reply For The Audio You Select කරුණාකර ඔබට අවශ්‍ය හඩ සමග රිප්ලයි(Reply) කරන්න\n\n*Chat Bot  By Udavin*' },
                    { quoted: m }
                );
                break;  
            
            case '3.6':
                const audioPaths6 = [
                    'Media/Voice/Tamil F voice/Sample 1.mp3'
                ];
            
                const sendPromises6 = audioPaths6.map(audioPath => {
                    const audioBuffer = fs.readFileSync(audioPath);
                    return fell.sendMessage(
                        m.chat,
                        { audio: audioBuffer, mimetype: 'audio/mp4', ptt: true },
                        { quoted: m }
                    );
                });
            
                await Promise.all(sendPromises6);
            
                await new Promise(resolve => setTimeout(resolve, 1000)); 
            
                // Send a text message
                await fell.sendMessage(
                    m.chat,
                    { text: 'Please Reply For The Audio You Select කරුණාකර ඔබට අවශ්‍ය හඩ සමග රිප්ලයි(Reply) කරන්න\n\n*Chat Bot  By Udavin*' },
                    { quoted: m }
                );
                break;   
            
            //4
            case '4':
                m.reply('Over Bank Details Are Given Bellow\n Bank Name : XYZ Bank \n Bank Branch : XYZ \n Account Number : 8678732789779347\n Holder Name : Kamal Withanage\n\n*Chat Bot  By Udavin*')
                break;
            case 's4':
                m.reply('බැංකු ගිණුම් විස්තර පහත දක්වා ඇත\n Bank Name : XYZ Bank \n Bank Branch : XYZ \n Account Number : 8678732789779347\n Holder Name : Kamal Withanage\n\n*Chat Bot  By Udavin*')
                break;

            //5
             case '5':
                m.reply('Please Wait We Will Contact You Soon As Posible\n\n*Chat Bot  By Udavin*')
                break;
            case 's.5':
                m.reply('කරුණාකර රැඳී සිටින්න අපි හැකි ඉක්මනින් ඔබව සම්බන්ධ කර ගන්නෙමු\n\n*Chat Bot  By Udavin*')
                break;

            default:
                if (budy.startsWith('=>')) {
                    if (!isCreator) return
                    function Return(sul) {
                        sat = JSON.stringify(sul, null, 2)
                        bang = require('util').format(sat)
                        if (sat == undefined) {
                            bang = require('util').format(sul)
                        }
                        return m.reply(bang)
                    }
                    try {
                        m.reply(require('util').format(eval(`(async () => { return ${budy.slice(3)} })()`)))
                    } catch (e) {
                        m.reply(String(e))
                    }
                }

                if (budy.startsWith('>')) {
                    if (!isCreator) return
                    let kode = budy.trim().split(/ +/)[1]
                    let teks
                    try {
                        teks = /await/i.test(kode) ? eval("(async() => { " + kode + " })()") : eval(kode)
                    } catch (e) {
                        teks = e
                    } finally {
                        await m.reply(require('util').format(teks))
                    }
                }

                if (budy.startsWith('$')) {
                    if (!isCreator) return
                    exec(budy.slice(2), (err, stdout) => {
                        if (err) return m.reply(`${err}`)
                        if (stdout) return m.reply(stdout)
                    })
                }
                break;
                break;
        }
        
    } catch (err) {
        console.log(require('util').format(err));
    }
};


let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update ${__filename}`);
    delete require.cache[file];
    require(file);
});
