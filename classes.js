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

function addPlayer (dict, key, value) {
    dict[key] = value;
}

function getPlayer (dict, key) {
    return dict[key];
}


module.exports = {
    Player,
    Game,
    addPlayer,
    getPlayer
}