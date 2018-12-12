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
    )
    return;
}


module.exports = {
    Player,
    Game,
    addPlayer,
    getPlayer,
    removePlayer,
    addGameToPlayer
}