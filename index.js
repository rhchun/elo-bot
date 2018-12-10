const slackBot = require('slackbots');

const bot = new slackBot({
    token: 'xoxb-500448433477-500253762050-lSoDJj5p1RtcxUOIErhsGMoD',
    name: 'elo-bot'  
});

//start handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':snake:'
    };

    bot.postMessageToChannel('general', 'is your elo high enough?', params);
});

//error handler
bot.on('error', (err) => console.log(err));

//message handler
bot.on('message', (data) => {
    if(data.type !== 'message') {
        return;
    }
    console.log(data); 
});