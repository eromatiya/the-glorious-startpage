// High quality background, we'll lazy load this
var hqBG = document.createElement("img");

function styleBodyBackground() {
	document.body.style.backgroundSize = 'cover';
	document.body.style.backgroundRepeat =  "no-repeat";
	document.body.style.backgroundPosition = "center";
	document.body.style.backgroundAttachment = "fixed";
} 

function lazyLoad(fileName) {

	// Set a low quality background image 
	document.body.style.background = "url('assets/backgrounds/" + 
	fileName + "-low" + ".webp')";
	styleBodyBackground();
	document.body.className = "blurBody";

	hqBG.onload = function() {
		// After downloading the HQ image, set it as bg
		document.body.style.background = "url("+ hqBG.src; + ")";
		styleBodyBackground();
		document.body.className = "noBlurBody";
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