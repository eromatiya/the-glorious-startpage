var backgroundTextBox = document.getElementById('backgroundSet');
var backgroundOpacityTextBox = document.getElementById('backgroundOpacitySet');

var foregroundTextBox = document.getElementById('foregroundSet');
var foregroundOpacityTextBox = document.getElementById('foregroundOpacitySet');

var blurTextBox = document.getElementById('blurSet');


function checkAlpha(colorStr) {
	if (colorStr.length <= 7) {
		return colorStr + 'FF';
	};
	return colorStr;
}

// Must be RGBA
function checkColorValidity(colorStr) {
	var colorBool = /^#[0-9A-F]{8}$/i.test(colorStr);

	if (!colorBool) {
		var checkedColor = checkAlpha(colorStr);
		return checkedColor;
	}
	return colorStr;
}

alert(checkColorValidity("#ff00ff20"))

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
	var baseColor = window.getComputedStyle(document.documentElement).getPropertyValue('--base-color');
	var blurStrength = window.getComputedStyle(document.documentElement).getPropertyValue('--blur-strength');

	// Remove whitespace
	baseBG = baseBG.replace(/ /g,'');
	baseColor = baseColor.replace(/ /g,'');
	blurStrength = blurStrength.replace(/ /g,'');

	baseBG = baseBG;

	var backgroundColor;
	var backgroundOpacity;

	// var foregroundColor;
	// var foregroundOpacity;

	// Check BG validity
	if (baseBG) {
		// Slice to separate RGB and A of background color
		
		// Slice alpha out
		backgroundColor = baseBG.slice(0, -2);

		// Get alpha
		backgroundOpacity = baseBG.slice(-2);
	}

	// Check FG validity
	// if (checkColorValidity(baseColor)) {
	// 	// Slice to separate RGB and A of background color
		
	// 	// Slice alpha out
	// 	foregroundColor = baseColor.slice(0, -2);

	// 	// Get alpha
	// 	foregroundOpacity = baseColor.slice(-2);
	// }

	// Set placeholders
	backgroundTextBox.placeholder = backgroundColor;
	backgroundOpacityTextBox.placeholder = backgroundOpacity;

	// foregroundTextBox.placeholder = foregroundColor;
	// foregroundOpacityTextBox.placeholder = foregroundOpacity;


	// Slice to remove px in blur strength
	var blur = blurStrength.slice(0, -2);
	blurTextBox.placeholder = blur;
}


window.onload = updateTextBoxValues();