var questionCount = 1;
var cardCount = 4;
var counter = 0;

var answerCard = $("#answerCardContainer");

function addQuestions() {
	var questionCard = document.getElementById("questionCardContainer");

	console.log("addQuestions");
	var questionText = document.createElement("h1");
	questionText.id = "niceMeme";
	questionText.innerHTML = "lol top kek nice meme";

	questionCard.appendChild(questionText);
}	