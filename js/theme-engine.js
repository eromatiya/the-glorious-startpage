var backgroundTextBox = document.getElementById('backgroundSet');
var backgrouneOpacityTextBox = document.getElementById('backgroundOpacitySet');

var foregroundTextBox = document.getElementById('foregroundSet');
var foregrouneOpacityTextBox = document.getElementById('foregroundOpacitySet');

var blurTextBox = document.getElementById('blurSet');


// function checkAlpha(colorStr) {
// 	if (colorStr.length <= 7) {
// 		// Add ff to bottom
// 		// var colorStr 
// 	}
// }

// Must be RGBA
function checkColorValidity(colorStr) {

	alphaBool = /^#[0-9A-F]{8}$/i.test(colorStr);
	return alphaBool;
}

// Get root var value
// window.getComputedStyle(document.documentElement).getPropertyValue('--color-font-general');

// Set root var value
// document.documentElement.style.setProperty('--color-font-general', '#000');

// Six-charactered HEX Color(R,G,B,A)
// alert(/^#[0-9A-F]{8}$/i.test('#AABBCCDD'));


// Three-charactered HEX Color
// alert(/^#([0-9A-F]{3}){1,2}$/i.test('#ABC'));


// Remove newline
// STR.replace(/(\r\n|\n|\r)/gm, "");

function updateTextBoxValues() {

	var baseBG = window.getComputedStyle(document.documentElement).getPropertyValue('--base-bg');
	var blurStrength = window.getComputedStyle(document.documentElement).getPropertyValue('--blur-strength');

	// Remove whitespace
	baseBG = baseBG.replace(/ /g,'');
	blurStrength = blurStrength.replace(/ /g,'');
	
	var backgroundColor;
	var backgroundOpacity;

	if (checkColorValidity(baseBG)) {
		// Slice to separate RGB and A of background color
		
		// Slice alpha out
		backgroundColor = baseBG.slice(0, -2);

		// Get alpha
		backgroundOpacity = baseBG.slice(-2);
	}

	backgroundTextBox.placeholder = baseBG;
	backgrouneOpacityTextBox.placeholder = backgroundOpacity;


	// Slice to remove px in blur strength
	var blur = blurStrength.slice(0, -2);
	blurTextBox.placeholder = blur;
}


window.onload = updateTextBoxValues();