var buttonColours = ['red','blue','green','yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarts = false;

$('.btn').click(function(){
    if(gameStarts) {
        var userChosenColour = $(this).attr('id');
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    }
})

$(document).keydown(function(event){
    if(!gameStarts){
        $('#level-title').text(`Level ${level}`);
        nextSequence();
        gameStarts = true;
    } 
})

function nextSequence() {
    userClickedPattern = [];
    level++;
    $('#level-title').text(`Level ${level}`);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1000); 
        }
    } else {
        playSound("wrong");
        $('#level-title').text(`Game Over, Press Any Key to Restart`);
        $('body').addClass('game-over');

        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200)

        startOver();
    }
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $(`#${currentColour}`).addClass('pressed');
    setTimeout(function(){
        $(`#${currentColour}`).removeClass('pressed');
    },100)
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarts = false;
}