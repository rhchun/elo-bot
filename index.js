const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://c318e443-9bda-4266-9c11-9f043ec03238:02197f86-eaa1-45db-827b-ee5ac33a6cb6@pcf-mongo-1.ulti.io:27017/5b0b8377-e0f6-4bc8-aa49-5b6d6c8521f3?ssl=true';

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('elo-bot');
    console.log('database test');
    var player = { name: 'roy', game: { name: 'chess', rating: 1000, win: 0, loss: 0 } };
    dbo.collection('foo').insertOne(player, function(err, res) {
        if (err) throw err;
        console.log('Player inserted');
        db.close();
    });
});

const { Player, chessStyle, unoStyle } = require('./algorithm');
const slackBot = require('slackbots');

var roy = new Player('roy', 1000);
var lisa = new Player('lisa', 1000);
var smriti = new Player('smriti', 1000);
var felix = new Player('felix', 1000);
var paul = new Player('paul', 1000);
var players = [felix, smriti, lisa, roy, paul];

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
    else if(message.match('test')) {
        unoStyle(players, 50);
        for (var i = 0; i < players.length; i++) {
            bot.postMessageToChannel(
                'algorithm-test',
                `${players[i].name}'s rating: ${players[i].game.rating}`,
                params
            );
        }
    }
}
