// var date = new Date();
// var hour = date.getHours();

// var wallName;

// if (hour >= 6 && hour < 12) {
// 	wallName = "morning";

// } else if (hour >= 12 && hour < 18 ) {
// 	wallName = "noon";

// } else {
// 	wallName = "evening";

// }

// document.body.style.background = "url('assets/backgrounds/" + wallName + ".webp')";
// document.body.style.backgroundSize = "cover";
// document.body.style.backgroundRepeat =  "no-repeat";
// document.body.style.backgroundPosition = "center";
// document.body.style.backgroundAttachment = "fixed";


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

	hqBG.src = "url('assets/backgrounds/" + 
	fileName + ".webp')";

	hqBG.onload = function() {
		// After downloading the HQ image, set it as bg
		document.body.style.background = "url("+ hqBG.src; + ")";
		styleBodyBackground();
	}
}

var date = new Date();
var hour = date.getHours();

if (hour >= 6 && hour < 12) {
	lazyLoad("morning");

} else if (hour >= 12 && hour < 18 ) {
	lazyLoad("noon");

} else {
	lazyLoad("evening");

}