var localStorage = window.localStorage;

const backgroundTextBox = document.getElementById('backgroundSet');
const backgroundOpacityTextBox = document.getElementById('backgroundOpacitySet');
const foregroundTextBox = document.getElementById('foregroundSet');
const foregroundOpacityTextBox = document.getElementById('foregroundOpacitySet');

const blurTextBox = document.getElementById('blurSet');

const applyTheme = document.getElementById('themeEngineAsDefault');
const resetTheme = document.getElementById('themeEngineReset');

// Save CSS color constiables default in localStorage
// Will only save if you visit the webpage for the very first time
const saveDefaultCSS = () => {

	const origBaseBG = localStorage.getItem('origBaseBG');
	const origBaseColor = localStorage.getItem('origBaseColor');
	const origBlurStrength = localStorage.getItem('origBlurStrength');
	
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
	const colorRGBA = /^#[0-9A-F]{8}$/i.test(colorStr);

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

			const bg = colorStr.slice(0, -2);
			const op = colorStr.slice(-2);

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
	let baseBG = localStorage.getItem('baseBG');
	let baseColor = localStorage.getItem('baseColor');
	let blurStrength = localStorage.getItem('blurStrength');

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
	const backgroundColor = baseBG.slice(0, -2);
	// Get alpha
	const backgroundOpacity = baseBG.slice(-2);


	// Slice to separate RGB and A of foreground color		
	// Slice alpha out
	const foregroundColor = baseColor.slice(0, -2);
	// Get alpha
	const foregroundOpacity = baseColor.slice(-2);

	updateTextBoxValues(
		backgroundColor,
		backgroundOpacity,
		foregroundColor,
		foregroundOpacity,
		blurStrength
	)
}

// Update colors
const updateCSSconstiables = () => {

	// Get value from input fields
	const background = (backgroundTextBox.value || backgroundTextBox.placeholder) +
		(backgroundOpacityTextBox.value || backgroundOpacityTextBox.placeholder);

	const foreground = (foregroundTextBox.value || foregroundTextBox.placeholder) +
		(foregroundOpacityTextBox.value || foregroundOpacityTextBox.placeholder);
	
	const blurPower = (blurTextBox.value || blurTextBox.placeholder);

	// Check color validity
	const bgColor = checkColorValidity(background);
	const fgColor = checkColorValidity(foreground);

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
	updateCSSconstiables();
}

// Apply button event handler
applyTheme.onclick = () => {
	updateCSSconstiables();
	alert('Success!');
}

// Reset button event handler
resetTheme.onclick = () => {
	localStorage.removeItem('baseBG');
	localStorage.removeItem('baseColor');
	localStorage.removeItem('blurStrength');

	saveDefaultCSS();
	processTheme();
	updateCSSconstiables();
	
	alert('Success!');
}

// Initialize
const onStartUp = () => {
	saveDefaultCSS();
	updateOnStartUp();
}

// Call Initialize
window.onload = onStartUp();