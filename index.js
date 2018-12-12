const { Player, addPlayer, getPlayer, removePlayer, addGameToPlayer, helpCommand, supportedGames, getStats } = require('./classes');
const { chessStyle, unoStyle } = require('./algorithm');
const slackBot = require('slackbots');

var listOfPlayers = {};

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
    if(tokens[0].match('<@UEQ7FNE1G>')){
        if (tokens[1].match('add')) {
            if (tokens[2].match('player')) {
                console.log("adding player");
                addPlayer(listOfPlayers, tokens[3]); 
            }
            if (tokens[2].match('game')) {
                console.log("adding game");
                addGameToPlayer(listOfPlayers, tokens[3], tokens[4]);
            }
        } else if (tokens[1].match('remove')) {
            console.log("removing player");
            removePlayer(listOfPlayers, tokens[2]);
        } else if (tokens[1].match('help')) {
            helpCommand();
        } else if (tokens[1].match('games?')) {
            supportedGames();
        } else if (tokens[1].match('stats')) {
            getStats(listOfPlayers, tokens[2], tokens[3]); // @elo-bot stats <game> <username>
        }
        else {
            parseGameCommand(tokens.slice(1));
        }
    }
}

function parseGameCommand(tokens) {
    names = tokens.slice(1);
    playGame(tokens[0], names);
}

function playGame(gameName, names) {
    if (names.length == 2) {
        if (gameName == 'chess') {
            chessStyle('chess', listOfPlayers[names[0]], listOfPlayers[names[1]], 30);
            bot.postMessageToChannel(
                'algorithm-test',
                `${listOfPlayers[names[0]].name}'s rating: ${listOfPlayers[names[0]].findGame('chess').rating}\n${listOfPlayers[names[0]].name}'s win: ${listOfPlayers[names[0]].findGame('chess').win}\n${listOfPlayers[names[0]].name}'s loss: ${listOfPlayers[names[0]].findGame('chess').loss}\n`
            );
            bot.postMessageToChannel(
                'algorithm-test',
                `${listOfPlayers[names[1]].name}'s rating: ${listOfPlayers[names[1]].findGame('chess').rating}\n${listOfPlayers[names[1]].name}'s win: ${listOfPlayers[names[1]].findGame('chess').win}\n${listOfPlayers[names[1]].name}'s loss: ${listOfPlayers[names[1]].findGame('chess').loss}\n`
            );
        }
    }
    else if(names.length > 2) {
        if (gameName == 'uno') {
            for (var i = 0; i < names.length; i++) {
                names[i] = listOfPlayers[names[i]];
            }
            unoStyle('uno', names, 50);
            for (var i = 0; i < names.length; i++) {
                bot.postMessageToChannel(
                    'algorithm-test',
                    `${names[i].name}'s rating: ${names[i].findGame('uno').rating}\n${names[i].name}'s win: ${names[i].findGame('uno').win}\n${names[i].name}'s loss: ${names[i].findGame('uno').loss}\n`
                );
            }
        }
    }
}
