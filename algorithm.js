const { Player, Game } = require('./classes');

function probability(r1, r2) {
    return 1.0 * 1.0 / (1 + 1.0 * Math.pow(10, 1.0 * (r1 - r2) / 400));
};

function multiplayerProbability(game, p, players) {
    n = players.length;
    pa = Math.pow(10, p.findGame(game).rating/400);
    intermediateResult = 0;
    for (var i = 0; i < n; i++) {
        intermediateResult += Math.pow(10, players[i].findGame(game).rating / 400);
    }
    return Math.round(pa/intermediateResult*100)/100;
}

function chessStyle(game, p1, p2, k, result) {
    const p1Rating = p1.findGame(game).rating;
    const p2Rating = p2.findGame(game).rating;
    const pb = probability(p1Rating, p2Rating);
    const pa = probability(p2Rating, p1Rating);

    if (result == true) {
        p1.findGame(game).setRating(Math.round(p1Rating + k * (1 - pa)));
        p2.findGame(game).setRating(Math.round(p2Rating + k * (0 - pb)));
        p1.findGame(game).incrementWin();
        p2.findGame(game).incrementLoss();
    }
    else {
        p1.findGame(game).setRating(Math.round(p1Rating + k * (0 - pa)));
        p2.findGame(game).setRating(Math.round(p2Rating + k * (1 - pb)));
        p2.findGame(game).incrementWin();
        p1.findGame(game).incrementLoss();
    }
};

function unoStyle(game, players, k) {
    n = players.length;
    deservedRating = [];
    for (var i = n - 1; i >= 0; i--) {
        deservedRating[i] = Math.round(((n-1)-i) * (1 / ((n * (n-1)) / 2))*1000)/1000;
    }
    if (n%2 == 0) {
        for (var i = 0; i < n/2; i++) {
            players[i].findGame(game).setRating(Math.round(players[i].findGame(game).rating + k * (deservedRating[i] - multiplayerProbability(game, players[i], players))));
        }
        for (var i = n/2; i < n; i++) {
            players[i].findGame(game).setRating(Math.round(players[i].findGame(game).rating + k * (deservedRating[i] - multiplayerProbability(game, players[i], players))));
        }
    }
    else {
        for (var i = 0; i < Math.floor(n/2); i++) {
            players[i].findGame(game).setRating(Math.round(players[i].findGame(game).rating + k * (deservedRating[i] - multiplayerProbability(game, players[i], players))));
        }
        for (var i = Math.ceil(n/2); i < n; i++) {
            players[i].findGame(game).setRating(Math.round(players[i].findGame(game).rating + k * (deservedRating[i] - multiplayerProbability(game, players[i], players))));
        }
    }
}

module.exports = {
    chessStyle,
    unoStyle
}