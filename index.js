const { Player, Game, chessStyle } = require('./algorithm');

var roy = new Player('roy');
var lisa = new Player('lisa');
var roy_chess = new Game(1500, 0, 0);
var lisa_chess = new Game(900, 0, 0);

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
    handleMessage(data.text); 
});

roy = {
    name: 'roy',
    game: roy_chess
}

lisa = {
    name: 'lisa',
    game: lisa_chess
}

//responds to data
function handleMessage(message) {
    const params = {
        icon_emoji: ':snake:'
    };
    if(message.includes(' 1v1')) {
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