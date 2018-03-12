/*
	Author: Artur Partyka
	Description: Contains the code used by the theme selector.
	Document name: cardSelector.js
	Date: 6/3/2015 (6th March 2015)
*/

$(document).ready(function(){
	$('input[name=cardSelector][type=radio]').change(function(){
		console.log("meme");

		if($("#card_select_1").is(":checked")) {
			console.log("1");
			$(".cardImage").attr("src", "../images/card.jpg");

		} else if($("#card_select_2").is(":checked")) {
			console.log("2");
			$(".cardImage").attr("src", "../images/card2.jpg");

		} else if($("#card_select_3").is(":checked")) {
			console.log("3");
			$(".cardImage").attr("src", "../images/card3.jpg");

		} else {
			console.log("deng");
		}
	});
});