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
    //console.log(settings);
    document.getElementById(buttons.skillLevel1).addEventListener("click", this.changeSkillLevel.bind(this, 8));
    document.getElementById(buttons.skillLevel2).addEventListener("click", this.changeSkillLevel.bind(this, 14));
    document.getElementById(buttons.skillLevel3).addEventListener("click", this.changeSkillLevel.bind(this, 20));
    document.getElementById(buttons.skillLevel4).addEventListener("click", this.changeSkillLevel.bind(this, 31));
    document.getElementById(buttons.last).addEventListener("click", this.displayLastSequence.bind(this)); // TODO: check if game in progress
    document.getElementById(buttons.start).addEventListener("click", this.start.bind(this));
    document.getElementById(buttons.longest).addEventListener("click", function () {
        console.log('LONGEST pressed');
    });
    document.getElementById(buttons.green).addEventListener("click", this.illuminateButton.bind(this, buttons.green, 0));
    document.getElementById(buttons.red).addEventListener("click", this.illuminateButton.bind(this, buttons.red, 0));
    document.getElementById(buttons.blue).addEventListener("click", this.illuminateButton.bind(this, buttons.blue, 0));
    document.getElementById(buttons.yellow).addEventListener("click", this.illuminateButton.bind(this, buttons.yellow, 0));
};

Simon.prototype.start = function () {
    // start or reset game
    this.sequence = [];
    this.lastLevel = 1;
    this.generateLevel();
    this.displayLevel();
    this.displayLastSequence();
    console.log('Start');
};

Simon.prototype.changeSkillLevel = function (level) {
    console.log('skill', level);
    this.skillLevel = level;
    this.start(); //Restart game;
};

Simon.prototype.illuminateButton = function (buttonId, time) {
    var time2 = 0; // button light off delay

    if (time === 0) { // User click on colored buttons        
        time = 400;
        time2 = 600;
    } else {
        time2 = time + 1000;
    }

    setTimeout(function () {
        document.getElementById(buttonId).classList.add("lighten");
    }, time);

    setTimeout(function () {
        document.getElementById(buttonId).classList.remove("lighten");
    }, time2);

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
    var displayLevel = this.lastLevel === 0 ? this.lastlevel + 1 : this.lastLevel - 1;
    document.getElementById("display").innerHTML = displayLevel;
};

var game = new Simon();
