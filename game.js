var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

//Wait for user to start game
$(document).keypress(function() {
    if ((!started)) {
        $("#level-title").text("Level " + level);
        nextSeqence();
        started = true;
    }
});

//Game chooses next button
function nextSeqence() {
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    level++;
    $("#level-title").text("Level " + level);
    setTimeout(function() {
        flashColor(randomChosenColor);
        playSound(randomChosenColor);
        userClickedPattern = [];
    }, 1000);
}

//Flash next button
function flashColor(color) {
    $("#" + color)
        .fadeOut(100)
        .fadeIn(100);
}

//Play sound for button
function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

//User clicks button
$(".btn").click(function() {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkUserClick();
});

//User click animation
function animatePress(color) {
    $("#" + color).addClass("pressed");

    setTimeout(function() {
        $("#" + color).removeClass("pressed");
    }, 100);
}

//Checks users answers against the random choices
function checkUserClick() {
    if (gamePattern.length === userClickedPattern.length) {
        for (i = 0; i < gamePattern.length; i++) {
            if (gamePattern[i] !== userClickedPattern[i]) return gameOver();
        }
        return nextSeqence();
    }
}

//If the player loses the game
function gameOver() {
    $("#level-title").text("Game Over, Press Any Key to Restart");
    resetGame();
    $("body").addClass("game-over");
    var over = new Audio("sounds/wrong.mp3");
    over.play();

    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
}

//Resets the game varibles at end of game
function resetGame(){
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}