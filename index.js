const { Player } = require('./classes');
const { chessStyle, unoStyle } = require('./algorithm');
const slackBot = require('slackbots');

var listOfPlayers = [];

var roy = new Player('roy', listOfPlayers);
var lisa = new Player('lisa', listOfPlayers);
var smriti = new Player('smriti', listOfPlayers);
var felix = new Player('felix', listOfPlayers);
var paul = new Player('paul', listOfPlayers);
var players = [felix, smriti, lisa, roy, paul];

roy.addGame('uno');
lisa.addGame('uno');
smriti.addGame('uno');
felix.addGame('uno');
paul.addGame('uno');
roy.addGame('chess');
lisa.addGame('chess');
smriti.addGame('chess');
felix.addGame('chess');
paul.addGame('chess');

var one_v_one = '1v1';
var free_for_all = 'ffa';


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
    
    var tokens = message.split(" ");
    console.log(tokens);
    if(tokens[0].match('<@UEQ7FNE1G>')){
        parseGameCommand(tokens);
    }
}

function parseGameCommand(tokens) {
    if (tokens.length != 4 ) {
        bot.postMessageToChannel(
            'felix2',
            'Invalid input format. Please re-enter.'
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

    else {
        bot.getUserById(tokens[2].substring(2, tokens[2].length - 1)).then(res => { 
            if(typeof res === 'undefined') {
                bot.postMessageToChannel(
                    'felix2',
                    `Player not found ${tokens[2]}.`
                )
                return;
            }
        });
        bot.getUserById(tokens[3].substring(2, tokens[3].length - 1)).then(res => { 
            if(typeof res === 'undefined') {
                bot.postMessageToChannel(
                    'felix2',
                    `Player not found ${tokens[3]}.`
                )
                return;
            }
        });
        playGame();
        
    }

    function playGame() {
        if(message.match(one_v_one)) {
            chessStyle('chess', roy, lisa, 30);
            bot.postMessageToChannel(
                'algorithm-test',
                `${players[i].name}'s rating: ${players[i].findGame('uno').rating}\n${players[i].name}'s win: ${players[i].findGame('uno').win}\n${players[i].name}'s loss: ${players[i].findGame('uno').loss}\n`,
                params
            );
            bot.postMessageToChannel(
                'algorithm-test',
                `${lisa.name}'s rating: ${lisa.findGame('chess').rating}\n${lisa.name}'s win: ${lisa.findGame('chess').win}\n${lisa.name}'s loss: ${lisa.findGame('chess').loss}\n`,
                params
            );
        }
        else if(message.match(one_v_one)) {
            chessStyle('chess', roy, lisa, 30, false);
            bot.postMessageToChannel(
                'algorithm-test',
                `${roy.name}'s rating: ${roy.findGame('chess').rating}\n${roy.name}'s win: ${roy.findGame('chess').win}\n${roy.name}'s loss: ${roy.findGame('chess').loss}\n`,
                params
            );
            bot.postMessageToChannel(
                'algorithm-test',
                `${lisa.name}'s rating: ${lisa.findGame('chess').rating}\n${lisa.name}'s win: ${lisa.findGame('chess').win}\n${lisa.name}'s loss: ${lisa.findGame('chess').loss}\n`,
                params
            );
        }
        else if(message.match(free_for_all)) {
            unoStyle('uno', players, 50);
            for (var i = 0; i < players.length; i++) {
                bot.postMessageToChannel(
                    'algorithm-test',
                    `${players[i].name}'s rating: ${players[i].findGame('uno').rating}`,
                    params
                );
            }
        }
    }
}
