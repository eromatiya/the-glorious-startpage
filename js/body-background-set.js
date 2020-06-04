var backgroundBody = document.getElementById('bodyBackground') 

// High quality background, we'll lazy load this
var hqBackground = document.createElement("img");

// Style body background
const styleBodyBackground = (bgBodyStyle) => {
	bgBodyStyle.backgroundSize = 'cover';
	bgBodyStyle.backgroundRepeat =  "no-repeat";
	bgBodyStyle.backgroundPosition = "center";
	bgBodyStyle.backgroundAttachment = "fixed";
} 

const lazyLoadBackground = (fileName) => {

	// Shorten backgroundBody.style or alias it
	var bgBodyStyle = backgroundBody.style;

	// Set a low quality background image 
	bgBodyStyle.background = "url('assets/backgrounds/" + 
	fileName + "-low" + ".webp')";
	styleBodyBackground(bgBodyStyle);

	// Add a class to blur it
	backgroundBody.classList.add("blurFiltered");

	hqBackground.onload = () => {
		
		// After downloading the HQ image, set it as bg
		backgroundBody.style.background = "url("+ hqBackground.src; + ")";
		styleBodyBackground(bgBodyStyle);

		// Remove class to unblur
		backgroundBody.classList.remove("blurFiltered");
	}

	// Add a delay when to fetch background
	setTimeout(
		() => {
			hqBackground.src = "assets/backgrounds/" + 
			fileName + ".webp";
		},
		50
	);
}

const initLazyLoad = () => {
	var date = new Date();
	var hour = date.getHours();

	if (hour >= 6 && hour < 12) {
		lazyLoadBackground("morning");

	} else if (hour >= 12 && hour < 18 ) {
		lazyLoadBackground("noon");

	} else {
		lazyLoadBackground("evening");
	}
}

// Initialize
window.onload = initLazyLoad();