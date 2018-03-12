/*
	Author: Artur Partyka
	Description: Contains some short code that the settings menu uses
	Document name: settingsMenu.js
	Date: 6/3/2015 (6th March 2015)
*/


// theme selector
$(document).ready(function(){
	$("#settingsButton").click(function(){
		$("#settingsPanel").slideToggle("slow");
	});
});

// reload button
$(document).ready(function(){
	$("#reloadButton").click(function(){
		location.reload(true);
	});
});