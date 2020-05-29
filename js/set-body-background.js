// High quality background, we'll lazy load this
var hqBG = document.createElement("img");
var backgroundImage = document.getElementById('backgroundBody') 

function styleBodyBackground() {
	backgroundBody.style.backgroundSize = 'cover';
	backgroundBody.style.backgroundRepeat =  "no-repeat";
	backgroundBody.style.backgroundPosition = "center";
	backgroundBody.style.backgroundAttachment = "fixed";
} 

function lazyLoad(fileName) {

	// Set a low quality background image 
	backgroundBody.style.background = "url('assets/backgrounds/" + 
	fileName + "-low" + ".webp')";
	styleBodyBackground();
	backgroundBody.className = "blurBody";

	hqBG.onload = function() {
		// After downloading the HQ image, set it as bg
		backgroundBody.style.background = "url("+ hqBG.src; + ")";
		styleBodyBackground();
		backgroundBody.className = "noBlurBody";
	}

	// Add a delay when to fetch background
	setTimeout(
		function() {
			hqBG.src = "assets/backgrounds/" + 
			fileName + ".webp";
		},
		50
	);
}

function initBG() {
	var date = new Date();
	var hour = date.getHours();

	if (hour >= 6 && hour < 12) {
		lazyLoad("morning");

	} else if (hour >= 12 && hour < 18 ) {
		lazyLoad("noon");

	} else {
		lazyLoad("evening");
	}
}

window.onload = initBG();