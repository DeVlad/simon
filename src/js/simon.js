/* Simon Memory Game

Skill Levels:
1. Sequence game of 8
2. Sequence game of 14
3. Sequence game of 20
4. Sequence game of 31 */

var settings = {
    buttons: { // Button : Id
        green: "btn-1",
        red: "btn-2",
        blue: "btn-3",
        yellow: "btn-4",
        skillLevel1: "skill1",
        skillLevel2: "skill2",
        skillLevel3: "skill3",
        skillLevel4: "skill4",
        start: "btn-start",
        last: "btn-last",
        longest: "btn-longest"
    }
};

function Simon(skillLevel) {
    this.skillLevel = skillLevel | 8;
    this.lastLevel = 4;
    this.sequence = [];
    this.longest = [];
    this.initEvents(settings.buttons);
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
    if (this.lastLevel <= this.skillLevel) {
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

Simon.prototype.initEvents = function (buttons) {
    console.log(settings);
    document.getElementById(buttons.skillLevel1).addEventListener("click", function () {
        this.skillLevel = 8;
        console.log(this.skillLevel);
    });

    document.getElementById(buttons.skillLevel2).addEventListener("click", function () {
        this.skillLevel = 14;
        console.log(this.skillLevel);
    });

    document.getElementById(buttons.skillLevel3).addEventListener("click", function () {
        this.skillLevel = 20;
        console.log(this.skillLevel);
    });

    document.getElementById(buttons.skillLevel4).addEventListener("click", function () {
        this.skillLevel = 31;
        console.log(this.skillLevel);
    });

    document.getElementById(buttons.last).addEventListener("click", this.displayLastSequence.bind(this)); // TODO: check if game in progress

    document.getElementById(buttons.start).addEventListener("click", function () {
        console.log('START pressed');
    });

    document.getElementById(buttons.longest).addEventListener("click", function () {
        console.log('LONGEST pressed');
    });

    document.getElementById(buttons.green).addEventListener("click", function () {
        console.log('Green pressed');
    });

    document.getElementById(buttons.red).addEventListener("click", function () {
        console.log('Red pressed');
    });

    document.getElementById(buttons.blue).addEventListener("click", function () {
        console.log('Blue pressed');
    });

    document.getElementById(buttons.yellow).addEventListener("click", function () {
        console.log('Yellow pressed');
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

Simon.prototype.displayLevel = function () {
    var displayLevel = this.lastLevel == 0 ? this.lastlevel + 1 : this.lastLevel - 1;
    document.getElementById("display").innerHTML = displayLevel;
};

var game = new Simon();

console.log('Test', game.generateLevel());

//console.log('Seq', game.sequence);
//console.log(game.illuminateButton());
//console.log(game.displayLastSequence());
game.displayLevel();
