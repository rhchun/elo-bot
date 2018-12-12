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

    bot.postMessageToChannel('demo', 'is your elo high enough?', params);
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
        if (gameName == 'chess' || gameName == 'pingpong' || gameName == 'foosball' || gameName == 'fifa') {
            chessStyle(gameName, listOfPlayers[names[0]], listOfPlayers[names[1]], 30);
            bot.postMessageToChannel(
                'demo',
                `*${listOfPlayers[names[0]].name}'s stats for ${gameName}:*\n     *Rating:* ${listOfPlayers[names[0]].findGame(gameName).rating}\n     *Wins:* ${listOfPlayers[names[0]].findGame(gameName).win}\n     *Losses:* ${listOfPlayers[names[0]].findGame(gameName).loss}\n`
            );
            bot.postMessageToChannel(
                'demo',
                `*${listOfPlayers[names[1]].name}'s stats for ${gameName}:*\n     *Rating:* ${listOfPlayers[names[1]].findGame(gameName).rating}\n     *Wins:* ${listOfPlayers[names[1]].findGame(gameName).win}\n     *Losses:* ${listOfPlayers[names[1]].findGame(gameName).loss}\n`
            );
        }
    }
    else if(names.length > 2) {
        if (gameName == 'uno' || gameName == 'coup') {
            for (var i = 0; i < names.length; i++) {
                names[i] = listOfPlayers[names[i]];
            }
            unoStyle(gameName, names, 70);
            for (var i = 0; i < names.length; i++) {
                bot.postMessageToChannel(
                    'demo',
                    `*${names[i].name}'s stats for ${gameName}:*\n     *Rating:* ${names[i].findGame(gameName).rating}\n     *Wins:* ${names[i].findGame(gameName).win}\n    *Losses:* ${names[i].findGame(gameName).loss}\n`
                );
            }
        }
    }
}
