class Player {
    constructor(name, startRating) {
        this.name = name;
        this.game = new Game(startRating, 0, 0);
    }
};  

class Game {
    constructor(rating, win, loss) {
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

function probability(r1, r2) {
    return 1.0 * 1.0 / (1 + 1.0 * Math.pow(10, 1.0 * (r1 - r2) / 400));
};

function multiplayerProbability(p, players) {
    n = players.length;
    pa = Math.pow(10, p.game.rating/400);
    intermediateResult = 0;
    for (var i = 0; i < n; i++) {
        intermediateResult += Math.pow(10, players[i].game.rating / 400);
    }
    return Math.round(pa/intermediateResult*100)/100;
}

function chessStyle(p1, p2, k, result) {
    const p1Rating = p1.game.rating;
    const p2Rating = p2.game.rating;
    const pb = probability(p1Rating, p2Rating);
    const pa = probability(p2Rating, p1Rating);

    if (result == true) {
        p1.game.setRating(Math.round(p1Rating + k * (1 - pa)));
        p2.game.setRating(Math.round(p2Rating + k * (0 - pb)));
        p1.game.incrementWin();
        p2.game.incrementLoss();
    }
    else {
        p1.game.setRating(Math.round(p1Rating + k * (0 - pa)));
        p2.game.setRating(Math.round(p2Rating + k * (1 - pb)));
        p2.game.incrementWin();
        p1.game.incrementLoss();
    }
};

function unoStyle(players, k) {
    n = players.length;
    deservedRating = [];
    for (var i = n - 1; i >= 0; i--) {
        deservedRating[i] = Math.round(((n-1)-i) * (1 / ((n * (n-1)) / 2))*1000)/1000;
    }
    if (n%2 == 0) {
        for (var i = 0; i < n/2; i++) {
            players[i].game.setRating(Math.round(players[i].game.rating + k * (deservedRating[i] - multiplayerProbability(players[i], players))));
        }
        for (var i = n/2; i < n; i++) {
            players[i].game.setRating(Math.round(players[i].game.rating + k * (deservedRating[i] - multiplayerProbability(players[i], players))));
        }
    }
    else {
        for (var i = 0; i < Math.floor(n/2); i++) {
            players[i].game.setRating(Math.round(players[i].game.rating + k * (deservedRating[i] - multiplayerProbability(players[i], players))));
        }
        for (var i = Math.ceil(n/2); i < n; i++) {
            players[i].game.setRating(Math.round(players[i].game.rating + k * (deservedRating[i] - multiplayerProbability(players[i], players))));
        }
    }
}

module.exports = {
    Player,
    Game,
    chessStyle,
    unoStyle
}