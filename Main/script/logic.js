/*
	Author: Artur Partyka
	Description: Main logic section of the game.
	Document name: logic.js
	Date: 6/3/2015 (6th March 2015)
*/

/*
	TODO: Tidy code up
*/

// variables to track the game
var cardCount = 4;
var questionCount = 1;
var previousAnswer = 4;
var previousQuestion;
var counter = 0;

// when the document has loaded ans is ready draw the cards to the screen and flip the first card
$(document).ready(function(){
	drawCards(false);

	setTimeout(function(){
		$("#card_" + previousAnswer).toggleClass('active');
	}, 200);
});

// function that draws the cards to the screen. 
function drawCards() {
	// loop around (4) times and output each card
	for(i = 1; i <= cardCount; i++) {

		// create some (JavaScript) elements
		var card_container = document.createElement("div");
		var card_container2 = document.createElement("div");
		var frontFace = document.createElement("div");
		var card = document.createElement("img");
		var back = document.createElement("div");
		var question = document.createElement("p");
	

		// assign the id's, classes and other attributes to the cards.
		card_container.className += "card_container";

		card_container.id = "card_" + i;

		card_container2.className += "shadow";
		card_container2.className += " card";

		frontFace.className += "front";
		frontFace.className += " face";

		card.className += "cardImage";
		card.src = "../images/card.jpg";
		
		back.className += "back";
		back.className += " face";
		back.className += " center";
		back.id = "backCard" + i;

		question.id = "questionID" + i;

		// set the text of the question with the current question from the array
		question.innerHTML = questions[questionCount - 1].question;
	
		// append (JavaScript) each new element to their respective parent
		back.appendChild(question);
		frontFace.appendChild(card);
		card_container2.appendChild(frontFace);
		card_container.appendChild(card_container2);
		card_container2.appendChild(back);

		// define the container as the <div> #container
		var container = document.getElementById("container");

		// append (JavaScript) the elements to the container
		container.appendChild(card_container);
		
		// Print each answer button to each card
		for(x = 1; x <= 4; x++){
			var answerButton = document.createElement("input");

			answerButton.id = x;
			answerButton.type = "button";
			answerButton.name = "answer";
			answerButton.className = "answerButton";
			answerButton.onclick = function() { buttonPress(this.id); }

			// assign the buttons based on which ID the for loop is at
			switch(x) {
				case 1:
					answerButton.value = questions[questionCount - 1].answer_A + "  =>  " + questions[questionCount - 1].answer_A_Route;
					break;
				case 2:
					answerButton.value = questions[questionCount - 1].answer_B + "  =>  " + questions[questionCount - 1].answer_B_Route;
					break;
				case 3:
					answerButton.value = questions[questionCount - 1].answer_C + "  =>  " + questions[questionCount - 1].answer_C_Route;
					break;
				case 4:
					answerButton.value = questions[questionCount - 1].answer_D + "  =>  " + questions[questionCount - 1].answer_D_Route;
					break;
			}
			document.getElementById("backCard" + i).appendChild(answerButton);
		}
	}
}

var drawAnswer = true;
// function to slide the cards using the JQuery animate function editing the CSS 'right' property
function slideCards(x) {
	if(x == true) {
		if(document.body.clientHeight <= 800) {
			$("input[name=answer]").attr("disabled", true);
			setTimeout(function(){
				$("#card_2").animate({"right": "200"}, 500);
				$("#card_3").animate({"right": "400"}, 500);
				$("#card_4").animate({"right":  "600"}, 500);
			}, 500);

			setTimeout(function(){
				
				$("#card_2").animate({"right": "0"}, 500);
				$("#card_3").animate({"right": "0"}, 500);
				$("#card_4").animate({"right": "0"}, 500);
			}, 500);
			setTimeout(function(){ $("input[name=answer]").removeAttr("disabled"); }, 2000);
		} else {
			$("input[name=answer]").attr("disabled", true);
			setTimeout(function(){
				$("#card_2").animate({"right": "250"}, 500);
				$("#card_3").animate({"right": "500"}, 500);
				$("#card_4").animate({"right": "750"}, 500);
			}, 500);

			setTimeout(function(){
				
				$("#card_2").animate({"right": "0"}, 500);
				$("#card_3").animate({"right": "0"}, 500);
				$("#card_4").animate({"right": "0"}, 500);
			}, 500);
			setTimeout(function(){ $(".answerButton").removeAttr("disabled"); }, 2000);
		}
		setTimeout(function(){
			$("#card_" + previousAnswer).toggleClass('active');
		}, 1500);
	} else {
		if(document.body.clientHeight <= 800) {
			setTimeout(function(){
				$("input[name=answer]").attr("disabled", true);
				$("#card_2").animate({"right": "200"}, 500);
				$("#card_3").animate({"right": "400"}, 500);
				$("#card_4").animate({"right":  "600"}, 500);
			}, 500);
		} else {
			setTimeout(function(){
				$("#card_2").animate({"right": "250"}, 500);
				$("#card_3").animate({"right": "500"}, 500);
				$("#card_4").animate({"right": "750"}, 500);
				setTimeout(function(){ $(".answerButton").removeAttr("disabled"); }, 2000);
			}, 500);
		}
	}
}

// function to change the value (JQuery) of the answer buttons
// I created a function to do this because it is reused a lot and nothing needs to change
function changeAnswer() {
	$("#1.answerButton").attr('value', questions[questionCount - 1].answer_A + "  =>  " + questions[questionCount - 1].answer_A_Route);
	$("#2.answerButton").attr('value', questions[questionCount - 1].answer_B + "  =>  " + questions[questionCount - 1].answer_B_Route);
	$("#3.answerButton").attr('value', questions[questionCount - 1].answer_C + "  =>  " + questions[questionCount - 1].answer_C_Route);
	$("#4.answerButton").attr('value', questions[questionCount - 1].answer_D + "  =>  " + questions[questionCount - 1].answer_D_Route);
}

// function that is called each answer button press. The button passes its ID to the function
function buttonPress(answer) {
	// collect and create the scoreboard
	previousQuestion = questionCount;
	var scoreboard = document.getElementById("scoreboardContent");
	var scoreQuestion = document.createElement("h3");
	var scoreItem = document.createElement("p");

	// assign the answer to the scoreboard
	counter++;
	scoreQuestion.className = "score_Question";
	scoreItem.id = "score_answer_" + answer;
	scoreQuestion.innerHTML = "(" + counter + ") " + questions[questionCount - 1].question;

	console.log("Previous Question: " + previousQuestion);

	// flip the current question card around and then initialise the card slide animation
	$("#card_" + previousAnswer).toggleClass('active');

	// use a switch to select the next question and set the question text for it.
	switch(answer) {
		case '1':
			// to track the score we use an array which we concatenate the question and selected answer which gets pushed to the end
			answers.push(questions[questionCount - 1].question + ": " + questions[questionCount - 1].answer_A);

			scoreItem.innerHTML = questions[questionCount - 1].answer_A;
			
			// we need to check the last question is the final one. If it is we display the results page, if not we carry on
			if(questions[previousQuestion - 1].final == "true") {
				slideCards(false);
				drawAnswer = false;
			} else {
			slideCards(true);
				setTimeout(function(){
					changeAnswer();
					$("#questionID1").text(questions[questionCount - 1].question);
				}, 500);
			}

			// pick the next question
			questionCount = questions[questionCount - 1].answer_A_Route;

			previousAnswer = 1;
			break;
		case '2':
			answers.push(questions[questionCount - 1].question + ": " + questions[questionCount - 1].answer_B);
			scoreItem.innerHTML = questions[questionCount - 1].answer_B;

			if(questions[previousQuestion - 1].final == "true") {
				slideCards(false);
				drawAnswer = false;
			} else {
				slideCards(true);
				setTimeout(function(){
					changeAnswer();
					$("#questionID2").text(questions[questionCount - 1].question);
				}, 500);
			}

			questionCount = questions[questionCount - 1].answer_B_Route;

			previousAnswer = 2;
			break;
		case '3':
			answers.push(questions[questionCount - 1].question + ": " + questions[questionCount - 1].answer_C);
			console.log("press 111 for chin chin sacrifice");
			scoreItem.innerHTML = questions[questionCount - 1].answer_C;

			if(questions[previousQuestion - 1].final == "true") {
				slideCards(false);
				drawAnswer = false;
			} else {
				slideCards(true);
				setTimeout(function(){
					changeAnswer();
					$("#questionID3").text(questions[questionCount - 1].question);
				}, 500);
			}

			questionCount = questions[questionCount - 1].answer_C_Route;

			previousAnswer = 3;
			break;
		case '4':
			answers.push(questions[questionCount - 1].question + ": " + questions[questionCount - 1].answer_D);
			
			scoreItem.innerHTML = questions[questionCount - 1].answer_D;

			if(questions[previousQuestion - 1].final == "true") {
				slideCards(false);
				drawAnswer = false;
			} else {
				slideCards(true);
				setTimeout(function(){	
					changeAnswer();
					$("#questionID4").text(questions[questionCount - 1].question);
				}, 500);
			}
			questionCount = questions[questionCount - 1].answer_D_Route;

			previousAnswer = 4;
			break;

		default:
			break;
	}

	if(drawAnswer) {
		// draw the scoreboard content to the page.
		$("#scoreboardContent").prepend(scoreItem);
		$("#scoreboardContent").prepend(scoreQuestion);
	} else {
		$("#scoreboardContent").prepend(scoreItem);
		$("#scoreboardContent").prepend(scoreQuestion);
		for(i = 0; i < answers.length; i++) {
			$("#resultsContainer").append("<p>" + answers[i] + "</p>");
			console.log(answers[i]);
		}

		setTimeout(function(){
			$(".resultsPage").fadeIn("slow");
		}, 1000);
		
	}
}

// function used to download the results to the user's download directory on their machine
function downloadInnerHtml() {
	 var elHtml = "Results: \r\n";
	for(i = 0; i < answers.length; i++) {
		elHtml += answers[i] + "\r\n";
	}
   
    var link = document.createElement('a');

    link.setAttribute('download', "results");
    link.setAttribute('href', 'data: text/plain;charset=utf-8,' + encodeURIComponent(elHtml));
    link.click(); 
}