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
    a: ["1/8 inch per hour", "1/4 cm per sec", "2500 ft per sec","1/3 inch per hour"]
  }
  
]
var index = 0;
var placeCheck = [];
var answersPlaced = false;
var lose = 0;
var win = 0;
var time = 5; //5 secs for testing purposes
var timeOut = 0;
var intervalID;
$(document).ready(function (){

  $(".start").on("click", function(){
    gameStart();
    $(".start").hide();
  });

  $(".questB").on("click", function(){
    answersPlaced = true;
    if(answersPlaced !== false){
      var ans = $(this).val();
      chosenAnswer(ans);
      answersPlaced = false;
    }
  });

// end of document  
});

function gameStart(){
  $(".timeText").show();
  setTimer();
  $("#questionText").text(questionHolder[index].quest);
  populateAnswer();
  $(".questB").show();
}

// gets a random number from 0 - 3
function getRandom(){
  var x = Math.floor(Math.random() * 4);
  while(placeCheck.indexOf(x) === -1){
    placeCheck.push(x);
  }
}

function populateAnswer(){
  var numberForDays;

  while(placeCheck.length !== 4){
    getRandom();
  }

  for(var i = 0; i < questionHolder.length; i++){
    // console.log(placeCheck + " inside of loop");
    if (placeCheck[placeCheck.length - 1] !== 0){
      numberForDays = placeCheck.pop();
      // console.log(numberForDays + " not equal 0");
      $("#a" + i).attr("value", "false");
      $("#a" + i).text(questionHolder[index].a[numberForDays]);
    } else {
      numberForDays = placeCheck.pop();
      // console.log(numberForDays + " equals 0");
      $("#a" + i).attr("value", "true");
      $("#a" + i).text(questionHolder[index].a[numberForDays]);
    }    
  }
  answersPlaced = true;
}

function chosenAnswer(ans){
  console.log("answer choice " + (ans === "true"));
  if(ans === "true"){
    win++;
    
    $("#trivQA").hide();
    stop();
    time = 5;
    
    $("#result").text("Correct!");
  } else {
    lose++;
    
    $("#trivQA").hide();
    stop();
    time = 5;
    
    $("#result").text("Wrong!");
    $("#correctAnswer").text("The correct answer is: " + questionHolder[index].a[0]);
  }
  
  //display visuals before i index++
  setTimeout(function(){
    $("#trivQA").show();
    $("#result").empty();
    $("#correctAnswer").empty();
    setTimer();
    index++;
    if(index < questionHolder.length){
      gameStart();
    } else {
      endGame();
    }
  }, 5000);
}

function endGame(){
  stop();
  $("#trivQA").hide();
  $("#result").html("Win: " + win + "<br>" + "Lose: " + lose + "<br>" + "Unanswered: " + timeOut);
};

//timer functions
function decrement(){
  $("#time").text("Time Remaining: " + --time + " seconds");
  if (time === 0){
    stop();
    timeOut++;
    $("#time").text("Times Up!");
    setTimeout(function(){
      $("#correctAnswer").text("The correct answer is: " + questionHolder[index].a[0]);
    }, 1000);
    setTimeout(function(){
      index++;
      $("#correctAnswer").empty();
      softReset();
    },3000);
  }
  
  if (index === questionHolder.length){
    endGame();
  }
}

function stop(){
  clearInterval(intervalID);
}

function setTimer(){
  clearInterval(intervalID);
  intervalID = setInterval(decrement, 1000);
}

function softReset(){
  time = 5;
  gameStart();
}