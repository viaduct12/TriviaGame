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
var time = 30;
var timeOut = 0;
var intervalID;
$(document).ready(function (){

  $("#start").on("click", function(){
    gameStart();
    $("#start").hide();
  });

  $(".questB").on("click", function(){
    answersPlaced = true;
    // console.log(index + " please tell me why? " + answersPlaced);
    if(answersPlaced !== false){
      // console.log(index + " inside if " + answersPlaced);
      var ans = $(this).val();
      console.log(ans);
      chosenAnswer(ans);
      answersPlaced = false;
    }
  });

// end of document  
});

function gameStart(){
  setTimer();
  // console.log(index + " wtf man");
  $("#questionText").text(questionHolder[index].quest);
  populateAnswer();
  // console.log(answersPlaced + " before the call in game start " + index);
  // console.log(answersPlaced + " after the call in game start " + index);  
  $(".questB").show();
}

// gets a random number from 0 - 3
function getRandom(){
  var x = Math.floor(Math.random() * 4);
  while(placeCheck.indexOf(x) === -1){
    placeCheck.push(x);
  }
  // console.log(placeCheck.length + " length");
}

function populateAnswer(){
  var numberForDays;

  while(placeCheck.length !== 4){
    getRandom();
  }

  for(var i = 0; i < 4; i++){
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
  } else {
    lose++;
  }
  // console.log("am i here? "); 
  index++;
  if(index < 4){
    gameStart();
  }
}

function decrement(){
  $("#time").html("<h2>" + --time + "</h2>");
  if (time === 0){
    stop();
    timeOut++;
    index++;
    $("#time").html("<h2>Times Up!</h2>");
    softReset();
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
  time = 30;
  gameStart();
}