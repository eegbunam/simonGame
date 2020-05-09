
var gamePattern = [];
var arrayOfColors = ["red","blue","green", "yellow"];
var userClickedPattern = [];
var level = 0;

function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    console.log(randomNumber);
    var randomChosenColor = arrayOfColors[randomNumber];
    gamePattern.push(randomChosenColor);
     $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
     playsound(randomChosenColor);
     level++;

}


function gameOver(){
  let soundString = "sounds/" + "wrong" +".mp3";
  var audio = new Audio(soundString);
  $("body").addClass("game-over");
  setTimeout(function () {
      $("body").removeClass("game-over");
  }, 200);
  $("h1").text(function () {
    level = 0;
    return "Game Over, Press Any Key to Restart"
    startOver();
  });

}


function startOver (){
  gamePattern = [];
  level = 0;

}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function playsound(name){
  let soundString = "sounds/" + name +".mp3";
  var audio = new Audio(soundString);
  audio.play();
}


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
          $("h1").text(function () {
            return "Level " + level
          });
        }, 1000);

      }

    } else {
      console.log("wrong answer");
      playsound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
    }



$( ".btn" ).click(function (){
  if(level != 0){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
     playsound(userChosenColor);
     animatePress(userChosenColor);
       checkAnswer(userClickedPattern.length-1);
  }

});


$(document).keypress(function (){
  if (level === 0){
    nextSequence();
  $("h1").text(function () {
    return "Level " + level
  });


  }

});
