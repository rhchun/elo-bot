const { Player } = require('./classes');
const { chessStyle, unoStyle } = require('./algorithm');
const slackBot = require('slackbots');

var roy = new Player('roy');
var lisa = new Player('lisa');
var smriti = new Player('smriti');
var felix = new Player('felix');
var paul = new Player('paul');
var players = [felix, smriti, lisa, roy, paul];

roy.addGame('uno');
lisa.addGame('uno');
smriti.addGame('uno');
felix.addGame('uno');
paul.addGame('uno');

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
        chessStyle('chess', roy, lisa, 30, true);
        bot.postMessageToChannel(
            'elo-bot',
            `${roy.name}'s rating: ${roy.findGame('chess').rating}\n${roy.name}'s win: ${roy.findGame('chess').win}\n${roy.name}'s loss: ${roy.findGame('chess').loss}\n`,
            params
        );
        bot.postMessageToChannel(
            'elo-bot',
            `${lisa.name}'s rating: ${lisa.findGame('chess').rating}\n${lisa.name}'s win: ${lisa.findGame('chess').win}\n${lisa.name}'s loss: ${lisa.findGame('chess').loss}\n`,
            params
        );
    }
    else if(message.match(one_v_one) && message.match(p2_win)) {
        chessStyle('chess', roy, lisa, 30, false);
        bot.postMessageToChannel(
            'elo-bot',
            `${roy.name}'s rating: ${roy.findGame('chess').rating}\n${roy.name}'s win: ${roy.findGame('chess').win}\n${roy.name}'s loss: ${roy.findGame('chess').loss}\n`,
            params
        );
        bot.postMessageToChannel(
            'elo-bot',
            `${lisa.name}'s rating: ${lisa.findGame('chess').rating}\n${lisa.name}'s win: ${lisa.findGame('chess').win}\n${lisa.name}'s loss: ${lisa.findGame('chess').loss}\n`,
            params
        );
    }

    //winners will be an array of the names of people
    if(message.match("<@UEQ7FNE1G>")) {
        var names = message.split(" ");
        console.log(names);
        if(names.length > 3){
            var winners = [];
            for(var i = 2; i < names.length; i++){
                winners.push(names[i]);
                bot.postMessageToChannel('smriti', names[i], params);
            }
        }
    }
}
