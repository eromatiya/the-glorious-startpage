var localStorage = window.localStorage;

var backgroundTextBox = document.getElementById('backgroundSet');
var backgroundOpacityTextBox = document.getElementById('backgroundOpacitySet');
var foregroundTextBox = document.getElementById('foregroundSet');
var foregroundOpacityTextBox = document.getElementById('foregroundOpacitySet');

var blurTextBox = document.getElementById('blurSet');

var applyTheme = document.getElementById('themeEngineAsDefault');
var resetTheme = document.getElementById('themeEngineReset');

// Save CSS color variables default in localStorage
// Will only save if you visit the webpage for the very first time
const saveDefaultCSS = () => {

	var origBaseBG = localStorage.getItem('origBaseBG');
	var origBaseColor = localStorage.getItem('origBaseColor');
	var origBlurStrength = localStorage.getItem('origBlurStrength');
	
	if ((origBaseBG === null) || (origBaseColor === null) || (origBlurStrength) === null) {

		localStorage.setItem(
			'origBaseBG',
			window.getComputedStyle(document.documentElement).getPropertyValue('--base-bg')
		);
		localStorage.setItem(
			'origBaseColor',
			window.getComputedStyle(document.documentElement).getPropertyValue('--base-color')
		);
		localStorage.setItem(
			'origBlurStrength',
			window.getComputedStyle(document.documentElement).getPropertyValue('--blur-strength')
		);
	}
}

// Check color validity
const checkColorValidity = (colorStr) => {

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
const updateTextBoxValues = (bgColor, bgOpacity, fgColor, fgOpacity, blurPower) => {
	// Set placeholders
	backgroundTextBox.value = '';
	backgroundTextBox.placeholder = bgColor;

	backgroundOpacityTextBox.value = '';
	backgroundOpacityTextBox.placeholder = bgOpacity;

	foregroundTextBox.value = '';
	foregroundTextBox.placeholder = fgColor;
	foregroundOpacityTextBox.value = '';
	foregroundOpacityTextBox.placeholder = fgOpacity;

	blurTextBox.value = '';
	blurTextBox.placeholder = blurPower;
}

// Theme processing
const processTheme = () => {

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

	updateTextBoxValues(
		backgroundColor,
		backgroundOpacity,
		foregroundColor,
		foregroundOpacity,
		blurStrength
	)
}

// Update colors
const updateCSSVariables = () => {

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

	processTheme();
}

// Run on window onload
const updateOnStartUp = () => {
	// Update
	processTheme();

	// Update settings
	updateCSSVariables();
}

// Apply button event handler
applyTheme.onmouseup = () => {
	updateCSSVariables();
	alert('Success!');
}

// Reset button event handler
resetTheme.onmouseup = () => {
	localStorage.removeItem('baseBG');
	localStorage.removeItem('baseColor');
	localStorage.removeItem('blurStrength');

	saveDefaultCSS();
	processTheme();
	updateCSSVariables();
	
	alert('Success!');
}

// Initialize
const onStartUp = () => {
	saveDefaultCSS();
	updateOnStartUp();
}

// Call Initialize
window.onload = onStartUp();