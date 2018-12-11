class Player {
    constructor(name, game) {
        this.name = name;
        this.game = game;
    }

    getStats() {
        console.log(this.name + ' stats')
        this.game.printStats();
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
    printStats() {
        console.log('Rating: ' + this.rating);
        console.log('Win: ' + this.win);
        console.log('Loss: ' + this.loss);
    }
};

function probability(r1, r2) {
    return 1.0 * 1.0 / (1 + 1.0 * Math.pow(10, 1.0 * (r1 - r2) / 400));
};

function chessStyle(p1, p2, k, result) {
    const p1Rating = p1.game.getRating();
    const p2Rating = p2.game.getRating();
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
    p1.game.printStats();
    p2.game.printStats();
};

module.exports = {
    Player,
    Game,
    chessStyle
}