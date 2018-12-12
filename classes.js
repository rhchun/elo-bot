const slackBot = require('slackbots');

const bot = new slackBot({
    token: 'xoxb-500448433477-500253762050-lSoDJj5p1RtcxUOIErhsGMoD',
    name: 'elo-bot'
});

class Player {
    constructor(name) {
        this.name = name;
        this.gameList = [];
    }
    addGame(name) {
        if (name in this.gameList) {
            return;
        }
        else {
            var game = new Game(name, 1000, 0, 0);
            this.gameList.push(game);
        }
    }
    findGame(name) {
        for (var i = 0; i < this.gameList.length; i++) {
            if (this.gameList[i].name === name) {
                return this.gameList[i];
            }
        }
        return;
    }
};

class Game {
    constructor(name, rating, win, loss) {
        this.name = name;
        this.rating = rating;
        this.win = win;
        this.loss = loss;
    }
    setRating(newRating) {
        this.rating = newRating;
    }
    incrementWin() {
        this.win++;
    }
    incrementLoss() {
        this.loss++;
    }
};
function helpCommand() {
    bot.postMessageToChannel(
        'hungee',
        '*List of Commands*\n     *Adding a new player:* @elo-bot add player <username>\n     *Adding a new game to player:* @elo-bot add game <game name> <username>\n     *Removing a player:* @elo-bot remove <username>\n     *Inserting game results:* @elo-bot <game name> <username1> <username2> ... (in descending order of winner)'
    );
}

function helpCommand() {
    bot.postMessageToChannel(
        'hungee',
        '*List of Commands*\n     *Adding a new player:* @elo-bot add player <username>\n     *Adding a new game to player:* @elo-bot add game <game> <username>\n     *Removing a player:* @elo-bot remove <username>\n     *Inserting game results:* @elo-bot <game> <username1> <username2> ... (in descending order of winner)\n     *Check stats:* @elo-bot stats <game> <username>\n     *List of supported games:* @elo-bot games?'
    );
}

function supportedGames() {
    bot.postMessageToChannel(
        'hungee',
        '*Supported Games*\n     *1v1:* chess, checkers, foosball, pingpong, fifa \n     *free for all:* uno, coup'
    );
}

function addPlayer (dict, key) {
    if (key in dict) {
        bot.postMessageToChannel(
            'hungee',
            `ERROR! Player ${key} already exists.`
        );
        return;
    }
    var temp = new Player(key);
    dict[key] = temp;
    bot.postMessageToChannel(
        'hungee',
        `Player ${key} was added!`
    );
    return;
}

function getPlayer (dict, key) {
    return dict[key];
}

function removePlayer (dict, name) {
    if (name in dict) {
        delete dict[name];
        bot.postMessageToChannel(
            'hungee',
            `Player ${name} was removed!`
        );
        return;
    }
    bot.postMessageToChannel(
        'hungee',
        `ERROR! Player ${name} does not exist.`
    );
}

function addGameToPlayer(dict, gameName, PlayerName) { // @elo-bot add game chess <username>
    if (PlayerName in dict) {
        for (var i = 0; i < getPlayer(dict, PlayerName).gameList.length; i++) {
            if (getPlayer(dict, PlayerName).gameList[i].name == gameName) {
                bot.postMessageToChannel(
                    'hungee',
                    `ERROR! Player ${PlayerName} already has ${gameName}.`
                );
                return; 
            }
        }
        getPlayer(dict, PlayerName).addGame(gameName);
        bot.postMessageToChannel(
            'hungee',
            `${gameName} was added to Player ${PlayerName}!`
        );
        return;
    }
    bot.postMessageToChannel(
        'hungee',
        `ERROR! Player ${PlayerName} does not exist, cannot add ${gameName}.`
    );
    return;
}

function getStats(dict, gameName, playerName) {
    if (playerName in dict) {
        for (var i = 0; i < getPlayer(dict, playerName).gameList.length; i++) {
            console.log(getPlayer(dict, playerName).gameList[i]);
            if (getPlayer(dict, playerName).gameList[i] == gameName) {
                bot.postMessageToChannel(
                    'hungee',
                    `*Player ${playerName}'s stats for ${gameName}:*\n     *Rating*: ${getPlayer(dict, playerName).gameList[i].rating}\n     *Wins*: ${getPlayer(dict, playerName).gameList[i].win}\n     *Losses*: ${getPlayer(dict, playerName).gameList[i].loss}`
                );
                return;
            }
        }
        bot.postMessageToChannel(
            'hungee',
            `Player ${playerName} has not played ${gameName}!`
        );
        return;
    }
    bot.postMessageToChannel(
        'hungee',
        `Player ${playerName} does not exist!`
    );
    return;
}

module.exports = {
    Player,
    Game,
    addPlayer,
    getPlayer,
    removePlayer,
    addGameToPlayer,
    helpCommand,
    supportedGames,
    getStats
}