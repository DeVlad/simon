/* Simon Memory Game

Skill Levels:
1. Sequence game of 8
2. Sequence game of 14
3. Sequence game of 20
4. Sequence game of 31 */

var settings = {};

function Simon(skillLevel) {
    this.skillLevel = skillLevel;
    this.lastLevel = 2;
    this.initEvents();
    this.sequence = [];
    this.longest = [];
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

        for (var i = 0; i < this.lastLevel; i++) {
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

    document.getElementById("btn-last").addEventListener("click", this.displayLastSequence.bind(this)); // TODO: check if game in progress


    document.getElementById("btn-start").addEventListener("click", function () {
        console.log('START pressed');
    });

    document.getElementById("btn-longest").addEventListener("click", function () {
        console.log('LONGEST pressed');
    });
};

Simon.prototype.illuminateButton = function (buttonId, time) {
    setTimeout(function () {
        document.getElementById(buttonId).classList.add("lighten");
    }, time);

    setTimeout(function () {
        document.getElementById(buttonId).classList.remove("lighten");
    }, time + 1000);
};

Simon.prototype.displayLastSequence = function () {
    console.log('Last Sequence', this.sequence);
    var time = 0;
    for (var i = 0; i < this.sequence.length; i++) {
        // console.log('btn ', this.sequence[i]);        
        var buttonId = 'btn-' + this.sequence[i]
        time = time + 1000;
        this.illuminateButton(buttonId, time);
    }
};

Simon.prototype.test = function () {
    alert('test');
};

var game = new Simon(8);

console.log('Test', game.generateLevel());

//console.log('Seq', game.sequence);
//console.log(game.illuminateButton());
console.log(game.displayLastSequence());
