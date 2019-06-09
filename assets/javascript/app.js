var questionHolder = [
  q1 = {
    quest: "Who was the legendary Benedictine monk who invented champagne?",
    a: ["Dom Perignon", "Adam Sandler", "Benedict Cumberbatch", "Sterling Archer"]
  },

  q2 = {
    quest: "In which year was Alaska sold to the U.S.?",
    a: ["1867", "2020", "1882", "1876"]
  },

  q3 = {
    quest: "Who invented the rabies vaccination?",
    a: ["Louis Pasteur", "Johnny Depp", "John Wick", "Chuck Norris"]
  },

  q4 = {
    quest: "How fast do sperm swim?",
    a: ["1/8 inch per hour", "1/4 cm per sec", "2500 ft per sec", "1/3 inch per hour"]
  }

]
var index = 0;
var placeCheck = [];
var answersPlaced = false;
var lose = 0;
var win = 0;
var time = 30; //5 secs for testing purposes
var timeOut = 0;
var intervalID;
$(document).ready(function () {

  $(".start").on("click", function () {
    gameStart();
    $(".start").hide();
  });

  $(".questB").on("click", function () {
    answersPlaced = true;
    if (answersPlaced !== false) {
      var ans = $(this).val();
      chosenAnswer(ans);
      answersPlaced = false;
    }
  });

  // end of document  
});

function gameStart() {
  $(".resultList").hide();
  $("#result").show();
  $("#trivQA").show();
  $(".timeText").show();
  setTimer();
  $("#questionText").text(questionHolder[index].quest);
  populateAnswer();
  $(".questB").show();
}

// gets a random number from 0 - 3
function getRandom() {
  var x = Math.floor(Math.random() * 4);

  while (placeCheck.length !== 4) {
    x = Math.floor(Math.random() * 4);
    if (placeCheck.indexOf(x) === -1) {
      placeCheck.push(x);
    }
  }
}

function populateAnswer() {
  var numberForDays;

  getRandom();

  for (var i = 0; i < questionHolder.length; i++) {
    if (placeCheck[placeCheck.length - 1] !== 0) {
      numberForDays = placeCheck.pop();
      $("#a" + i).attr("value", "false");
      $("#a" + i).text(questionHolder[index].a[numberForDays]);
    } else {
      numberForDays = placeCheck.pop();
      $("#a" + i).attr("value", "true");
      $("#a" + i).text(questionHolder[index].a[numberForDays]);
    }
  }
  answersPlaced = true;
}


//need to make this with 15 or less lines
function chosenAnswer(ans) {
  $(".resultList").show();
  if (ans === "true") {
    win++;
    $("#result").show();
    var addImg = $("<IMG>");
    addImg.attr("SRC", "assets/images/win.gif");
    $("#img").append(addImg);

    $("#trivQA").hide();
    stop();
    time = 30;

    $("#result").text("Correct!");
  } else {
    lose++;
    $("#result").show();
    var addImg = $("<IMG>");
    addImg.attr("SRC", "assets/images/lose.gif");
    $("#img").append(addImg);

    $("#trivQA").hide();
    stop();
    time = 30;

    $("#result").text("Wrong!");
    $("#correctAnswer").text("The correct answer is: " + questionHolder[index].a[0]);
  }

  //display visuals before index++
  setTimeout(function () {
    $("#img").empty();
    $("#trivQA").show();
    $("#result").empty();
    $("#correctAnswer").empty();
    setTimer();
    index++;
    if (index < questionHolder.length) {
      gameStart();
    } else {
      endGame();
    }
  }, 5000);
}

function endGame() {
  stop();
  index = 0;
  $("#result").text("I'm stumped, no more questions!");
  $("#correctAnswer").html("Win: " + win + "<br>" + "Lose: " + lose + "<br>" + "Unanswered: " + timeOut);
  $("#trivQA").hide();
  
  win = 0;
  lose = 0;
  $(".start-button").text("Play Again");
  $(".start-button").show();
};

//timer functions
function decrement() {
  $("#time").text("Time Remaining: " + --time + " seconds");
  if (time === 0) {
    stop();
    $("#trivQA").hide();
    timeOut++;
    $("#time").text("Times Up!");
    setTimeout(function () {
      $("#correctAnswer").text("The correct answer is: " + questionHolder[index].a[0]);
    }, 1000);
    setTimeout(function () {
      index++;
      $("#correctAnswer").empty();
      softReset();
    }, 3000);
  }

  if (index === questionHolder.length) {
    endGame();
  }
}

function stop() {
  clearInterval(intervalID);
}

function setTimer() {
  clearInterval(intervalID);
  intervalID = setInterval(decrement, 1000);
}

function softReset() {
  time = 30;
  $("#trivQA").show();
  gameStart();
}


//================================================================
// Future feature ask user if they would like to add trivia question to the list
//if yes then ask for a question
//hide the play again button
//store as an object q+questionHolder.length 
//the answers will be stored in an array and ask for the correct answer. the correct answer will always be stored at index 0
//ask for three random answers
//store object into questionHolder array
//show the play again button
//if no do nothing

//question randomizer. think i might convert my other random number generator for questions also