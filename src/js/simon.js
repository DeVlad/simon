/* Simon Memory Game

Skill Levels:
1. Sequence game of 8
2. Sequence game of 14
3. Sequence game of 20
4. Sequence game of 31 */

var settings = {};

function Simon(skillLevel) {
    this.skillLevel = skillLevel;
    this.lastLevel = 0;
    this.initEvents();
    this.sequence = [];
}

Simon.prototype.generateRandomPosition = function (lastPosition) {
    var random = 0;
    if (lastPosition >= 0 && lastPosition <= 4) {
        do {
            random = Math.floor(Math.random() * 4) + 1;
        } while (lastPosition == random);
    }
    return random;
};

// Generate game level with non-consecutive positions
Simon.prototype.generateLevel = function () {
    if (this.lastLevel < this.skillLevel) {
        var level = [];
        var lastPosition = 0;
        for (var i = 0; i <= this.lastLevel; i++) {
            level.push(this.generateRandomPosition(lastPosition));
            lastPosition = level[i];
        }
        this.lastLevel++;
        this.sequence = level;
        return level;
    } else {
        return 'Game Over';
    }
};

Simon.prototype.initEvents = function () {
    document.getElementById("skill1").addEventListener("click", function () {
        this.skillLevel = 8;
        console.log(this.skillLevel);
    });

    document.getElementById("skill2").addEventListener("click", function () {
        this.skillLevel = 14;
        console.log(this.skillLevel);
    });

    document.getElementById("skill3").addEventListener("click", function () {
        this.skillLevel = 20;
        console.log(this.skillLevel);
    });

    document.getElementById("skill4").addEventListener("click", function () {
        this.skillLevel = 31;
        console.log(this.skillLevel);
    });

    document.getElementById("btn-last").addEventListener("click", function () {
        console.log('LAST pressed');
    });

    document.getElementById("btn-start").addEventListener("click", function () {
        console.log('START pressed');
    });

    document.getElementById("btn-longest").addEventListener("click", function () {
        console.log('LONGEST pressed');
    });
};


var game = new Simon(8);

console.log('Test', game.generateLevel());
console.log('Test', game.generateLevel());
console.log('Seq', game.sequence);
