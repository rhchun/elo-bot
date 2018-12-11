const { Player, chessStyle } = require('./algorithm');
const slackBot = require('slackbots');

var roy = new Player('roy');
var lisa = new Player('lisa');

var one_v_one = '1v1';
var p1_win = '&gt;';
var p2_win = '&lt;';


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
    handleMessage(data.text);
});

//responds to data
function handleMessage(message) {
    const params = {
        icon_emoji: ':snake:'
    };
    if(message.match(one_v_one) && message.match(p1_win)) {
        chessStyle(roy, lisa, 30, true);
        bot.postMessageToChannel(
            'elo-bot',
            `${roy.name}'s rating: ${roy.game.rating}\n${roy.name}'s win: ${roy.game.win}\n${roy.name}'s loss: ${roy.game.loss}\n`,
            params
        );
        bot.postMessageToChannel(
            'elo-bot',
            `${lisa.name}'s rating: ${lisa.game.rating}\n${lisa.name}'s win: ${lisa.game.win}\n${lisa.name}'s loss: ${lisa.game.loss}\n`,
            params
        );
    }
    else if(message.match(one_v_one) && message.match(p2_win)) {
        chessStyle(roy, lisa, 30, false);
        bot.postMessageToChannel(
            'elo-bot',
            `${roy.name}'s rating: ${roy.game.rating}\n${roy.name}'s win: ${roy.game.win}\n${roy.name}'s loss: ${roy.game.loss}\n`,
            params
        );
        bot.postMessageToChannel(
            'elo-bot',
            `${lisa.name}'s rating: ${lisa.game.rating}\n${lisa.name}'s win: ${lisa.game.win}\n${lisa.name}'s loss: ${lisa.game.loss}\n`,
            params
        );
    }
}
