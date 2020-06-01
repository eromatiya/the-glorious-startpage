var backgroundTextBox = document.getElementById('backgroundSet');
var opacityTextBox = document.getElementById('opacitySet');
var blurTextBox = document.getElementById('blurSet');

function updateTextBoxValues() {

	var baseBG = window.getComputedStyle(document.documentElement).getPropertyValue('--base-bg');
	var blurStrength = window.getComputedStyle(document.documentElement).getPropertyValue('--blur-strength');
	
	// Slice to separate RGB and A
	var background = baseBG.slice(0, -2);
	var opacityLevel = baseBG.slice(-2); 

	// Slice to remove px in blur strength
	var blur = blurStrength.slice(0, -2);

	backgroundTextBox.placeholder = background;
	blurTextBox.placeholder = blur;
	opacityTextBox.placeholder = opacityLevel;
}


window.onload = updateTextBoxValues();