/* Simon Memory Game

Skill Levels:
1. Sequence game of 8
2. Sequence game of 14
3. Sequence game of 20
4. Sequence game of 31

Strict mode: Restarts the game on every player mistake.
*/

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
        longest: "btn-longest",
        strict: "btn-strict",
        strictIcon: "icon-strict",
        strictIndicatorOn: "red",
        strictIndicatorOff: "green"
    }
};

function Simon(skillLevel) {
    this.skillLevel = skillLevel | 8;
    this.lastLevel = 0;
    this.sequence = [];
    this.longest = [];
    this.moveCount = 0;
    this.strict = false;
    this.completeLevel = false;
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
        this.sequence = level;
        return level;
    } else {
        console.log('Error');
    }
};

Simon.prototype.initEvents = function (buttons) {
    document.getElementById(buttons.skillLevel1).addEventListener("click", this.changeSkillLevel.bind(this, 8));
    document.getElementById(buttons.skillLevel2).addEventListener("click", this.changeSkillLevel.bind(this, 14));
    document.getElementById(buttons.skillLevel3).addEventListener("click", this.changeSkillLevel.bind(this, 20));
    document.getElementById(buttons.skillLevel4).addEventListener("click", this.changeSkillLevel.bind(this, 31));
    document.getElementById(buttons.last).addEventListener("click", this.displaySequence.bind(this));
    document.getElementById(buttons.start).addEventListener("click", this.start.bind(this));
    document.getElementById(buttons.longest).addEventListener("click", this.displaySequence.bind(this, 'longest'));
    document.getElementById(buttons.strict).addEventListener("click", this.strictMode.bind(this, buttons.strictIcon));
    document.getElementById(buttons.green).addEventListener("click", this.move.bind(this, buttons.green, 1));
    document.getElementById(buttons.red).addEventListener("click", this.move.bind(this, buttons.red, 2));
    document.getElementById(buttons.blue).addEventListener("click", this.move.bind(this, buttons.blue, 3));
    document.getElementById(buttons.yellow).addEventListener("click", this.move.bind(this, buttons.yellow, 4));
};

// Start or reset game
Simon.prototype.start = function () {
    this.sequence = [];
    this.lastLevel = 1;
    this.generateLevel();
    this.displayLevel();
    this.displaySequence();
};

Simon.prototype.move = function (buttonId, buttonNumber) {
    this.illuminateButton(buttonId, 0);

    if (buttonNumber === this.sequence[this.moveCount]) { // Correct move
        this.moveCount++;

        if (this.moveCount === this.sequence.length) { // Level completed
            this.completeLevel = true;
            if (this.longest.length <= this.sequence.length) {
                this.longest = this.sequence;
            }
        }
    } else { // Wrong move                
        var that = this;

        if (this.strict) {
            this.completeLevel = false;
            this.moveCount = 0;

            setTimeout(function () { // Pause 3 seconds and restart game
                that.start();
            }, 3000);

            this.displayMessage('Wrong');

        } else { // Wrong move: Generate new sequence
            this.moveCount = 0;
            this.completeLevel = false;

            setTimeout(function () { // Pause 3 seconds
                that.displayLevel();
                that.displaySequence();
            }, 3000);

            this.displayMessage('Wrong');
        }
    }

    if (this.completeLevel === true) { // Level completed
        this.lastLevel++;
        this.generateLevel();
        var that2 = this;

        setTimeout(function () {
            that2.displayLevel();
            that2.displaySequence();
        }, 3000);

        this.completeLevel = false;
        this.moveCount = 0;

        if (this.lastLevel > this.skillLevel) { // End game with success  
            this.stop(); // Stop game
        }
    }
};

Simon.prototype.changeSkillLevel = function (level) {
    this.skillLevel = level;
    var that = this;

    setTimeout(function () {
        that.start(); // Restart game;
    }, 3000);

    that.displayMessage('Restarting');
};

// Flash colored game buttons
Simon.prototype.illuminateButton = function (buttonId, time) {
    var time2 = 0; // Button light off delay

    if (time === 0) { // User click on colored buttons
        time = 400;
        time2 = 600;
    } else {
        time2 = time + 1000;
    }

    var that = this;

    setTimeout(function () {
        document.getElementById(buttonId).classList.add("lighten");
        that.playSound(buttonId);
    }, time);

    setTimeout(function () {
        document.getElementById(buttonId).classList.remove("lighten");
    }, time2);

};

Simon.prototype.displaySequence = function (sequenceType) {
    var seq = [];

    if (sequenceType == 'longest') {
        seq = this.longest;
    } else { // Display last sequence
        seq = this.sequence;
    }

    var time = 0;

    for (var i = 0; i < seq.length; i++) {
        var buttonId = 'btn-' + seq[i];
        time = time + 1000;
        this.illuminateButton(buttonId, time);
    }
};

// Display number of current level
Simon.prototype.displayLevel = function () {
    var displayLevel = this.lastLevel;
    document.getElementById("display").innerHTML = displayLevel;
};

// Display game messages
Simon.prototype.displayMessage = function (message) {
    document.getElementById("display").innerHTML = message;
};

Simon.prototype.playSound = function (buttonId) {
    var id = 'sound-' + buttonId;
    var sound = document.getElementById(id);
    sound.play();
};

// Strict mode switch
Simon.prototype.strictMode = function (iconId) {
    if (this.strict) {
        this.strict = false;
        document.getElementById(iconId).classList.remove(settings.buttons.strictIndicatorOn);
        document.getElementById(iconId).classList.add(settings.buttons.strictIndicatorOff);
    } else {
        this.strict = true;
        document.getElementById(iconId).classList.remove(settings.buttons.strictIndicatorOff);
        document.getElementById(iconId).classList.add(settings.buttons.strictIndicatorOn);
    }
};

Simon.prototype.stop = function () {
    var that = this;

    setTimeout(function () {
        that.displayMessage('You Win !');
    }, 3000);
    this.lastLevel = 0;
    this.sequence = [];
};

var game = new Simon();
