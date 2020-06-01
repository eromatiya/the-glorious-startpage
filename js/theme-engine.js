var localStorage = window.localStorage;

var backgroundTextBox = document.getElementById('backgroundSet');
var backgroundOpacityTextBox = document.getElementById('backgroundOpacitySet');

var foregroundTextBox = document.getElementById('foregroundSet');
var foregroundOpacityTextBox = document.getElementById('foregroundOpacitySet');

var blurTextBox = document.getElementById('blurSet');

var applyTheme = document.getElementById('themeEngineAsDefault');
var resetTheme = document.getElementById('themeEngineReset');

function saveDefaultCSS() {

	var origBaseBG = localStorage.getItem('origBaseBG');
	var origBaseColor = localStorage.getItem('origBaseColor');
	var origBlurStrength = localStorage.getItem('origBlurStrength');
	
	if ((origBaseBG === null) || (origBaseColor === null) || (origBlurStrength) === null) {
		localStorage.setItem('origBaseBG', window.getComputedStyle(document.documentElement).getPropertyValue('--base-bg'));
		localStorage.setItem('origBaseColor', window.getComputedStyle(document.documentElement).getPropertyValue('--base-color'));
		localStorage.setItem('origBlurStrength', window.getComputedStyle(document.documentElement).getPropertyValue('--blur-strength'));
	}
}

// Must be RGBA
function checkColorValidity(colorStr) {

	// Check if RGBA - (#RRGGBBAA)
	var colorRGBA = /^#[0-9A-F]{8}$/i.test(colorStr);

	// If not RGBA
	if (!colorRGBA) {

		// If RGB - (#RRGGBB)
		if (/^#([0-9A-F]{3}){1,2}$/i.test(colorStr)) {
			
			// Add completely opaque alpha
			return colorStr + 'FF';
		
		// If three-charactered HEX color - (#RGB)
		} else if (/^#([0-9A-F]{3}){1,2}$/i.test(colorStr)) {

			// Convert it to RRGGBB
			return colorStr.replace(/^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/, "#$1$1$2$2$3$3");

		// If three-charactered HEX Color(#RGB) with AA - (#RGBAA)
		} else if (colorStr.length == 6) {

			var bg = colorStr.slice(0, -2);
			var op = colorStr.slice(-2);

			return bg.replace(/^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/, "#$1$1$2$2$3$3") + op;

		} else {

			alert('Invalid color');

		}

	}
	// It's RGBA and a valid color so just return it
	return colorStr;
}


// Update textboxes
function updateTextBoxValues() {

	// Retrieve custom colors
	var baseBG = localStorage.getItem('baseBG');
	var baseColor = localStorage.getItem('baseColor');
	var blurStrength = localStorage.getItem('blurStrength');

	// If custom color doesn't exist, use the value in CSS
	if (baseBG === null) {
		baseBG = localStorage.getItem('origBaseBG');
	}

	if (baseColor === null) {
		baseColor = localStorage.getItem('origBaseColor');
	}

	if (blurStrength === null) {
		blurStrength = localStorage.getItem('origBlurStrength');
	}

	// Remove whitespace
	baseBG = baseBG.replace(/ /g,'');
	baseColor = baseColor.replace(/ /g,'');
	blurStrength = blurStrength.replace(/ /g,'');

	// Check validity
	baseBG = checkColorValidity(baseBG);
	baseColor = checkColorValidity(baseColor);

	// Slice to separate RGB and A of background color
	// Slice alpha out
	var backgroundColor = baseBG.slice(0, -2);
	// Get alpha
	var backgroundOpacity = baseBG.slice(-2);


	// Slice to separate RGB and A of foreground color		
	// Slice alpha out
	var foregroundColor = baseColor.slice(0, -2);
	// Get alpha
	var foregroundOpacity = baseColor.slice(-2);


	// Set placeholders
	backgroundTextBox.value = '';
	backgroundTextBox.placeholder = backgroundColor;

	backgroundOpacityTextBox.value = '';
	backgroundOpacityTextBox.placeholder = backgroundOpacity;

	foregroundTextBox.value = '';
	foregroundTextBox.placeholder = foregroundColor;
	foregroundOpacityTextBox.value = '';
	foregroundOpacityTextBox.placeholder = foregroundOpacity;

	blurTextBox.value = '';
	blurTextBox.placeholder = blurStrength;

}

// Update colors
function updateCSSVariables() {

	// Get value from input fields
	var background = (backgroundTextBox.value || backgroundTextBox.placeholder) +
		(backgroundOpacityTextBox.value || backgroundOpacityTextBox.placeholder);

	var foreground = (foregroundTextBox.value || foregroundTextBox.placeholder) +
		(foregroundOpacityTextBox.value || foregroundOpacityTextBox.placeholder);
	
	var blurPower = (blurTextBox.value || blurTextBox.placeholder);

	// Check color validity
	var bgColor = checkColorValidity(background);
	var fgColor = checkColorValidity(foreground);

	// Change CSS colors
	document.documentElement.style.setProperty('--base-bg', bgColor);
	document.documentElement.style.setProperty('--base-color', fgColor);
	document.documentElement.style.setProperty('--blur-strength', blurPower);

	// Save custom color
	localStorage.setItem('baseBG', bgColor);
	localStorage.setItem('baseColor', fgColor);
	localStorage.setItem('blurStrength', blurPower);

	updateTextBoxValues();
}

// Run on window onload
function updateOnStartUp() {
	// Update
	updateTextBoxValues();

	// Update settings
	updateCSSVariables();
}

// Apply button event handler
applyTheme.onmouseup = function() {
	updateCSSVariables();
}

// Reset button event handler
resetTheme.onmouseup = function() {
	localStorage.removeItem('baseBG');
	localStorage.removeItem('baseColor');
	localStorage.removeItem('blurStrength');

	saveDefaultCSS();
	updateTextBoxValues();
	updateCSSVariables();
}

function onStartUp() {
	saveDefaultCSS();

	updateOnStartUp();

}

window.onload = onStartUp();