var backgroundTextBox = document.getElementById('backgroundSet');
var backgroundOpacityTextBox = document.getElementById('backgroundOpacitySet');

var foregroundTextBox = document.getElementById('foregroundSet');
var foregroundOpacityTextBox = document.getElementById('foregroundOpacitySet');

var blurTextBox = document.getElementById('blurSet');

var applyTheme = document.getElementById('themeEngineAsDefault');

// Must be RGBA
function checkColorValidity(colorStr) {

	var colorBool = /^#[0-9A-F]{8}$/i.test(colorStr);

	if (!colorBool) {

		if (colorStr.length  == 4) {
			if (/^#([0-9A-F]{3}){1,2}$/i.test(colorStr)) {
				return colorStr.replace(/^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/, "#$1$1$2$2$3$3");
			}
		}

	}
	return colorStr;
}

// Get root var value
// window.getComputedStyle(document.documentElement).getPropertyValue('--color-font-general');

// Set root var value
// document.documentElement.style.setProperty('--color-font-general', '#000');

// Six-charactered HEX Color(R,G,B,A)
// alert(/^#[0-9A-F]{8}$/i.test('#AABBCCDD'));


// Three-charactered HEX Color
// alert(/^#([0-9A-F]{3}){1,2}$/i.test('#ABC'));

// var tester = '#abc';
// alert(tester.replace(/^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/, "#$1$1$2$2$3$3"));


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

	blurTextBox.placeholder = blurStrength;

}


function updateCSSVariables() {

	var bgColor = checkColorValidity(backgroundTextBox.value || backgroundTextBox.placeholder) + 
		(backgroundOpacityTextBox.value || backgroundOpacityTextBox.placeholder);

	var fgColor = checkColorValidity(foregroundTextBox.value || foregroundTextBox.placeholder) + 
		(foregroundOpacityTextBox.value || foregroundOpacityTextBox.placeholder);

	var blurPower = (blurTextBox.value || blurTextBox.placeholder);

	document.documentElement.style.setProperty('--base-bg', bgColor);
	document.documentElement.style.setProperty('--base-color', fgColor);
	document.documentElement.style.setProperty('--blur-strength', blurPower);


	updateTextBoxValues();
}

function updateOnStartUp() {

	updateTextBoxValues();

	// Update settings
	updateCSSVariables();
}

applyTheme.onmouseup = function() {
	updateCSSVariables();
}

window.onload = updateOnStartUp();