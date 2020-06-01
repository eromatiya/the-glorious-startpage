var backgroundTextBox = document.getElementById('backgroundSet');
var opacityTextBox = document.getElementById('opacitySet');
var blurTextBox = document.getElementById('blurSet');

function updateTextBoxValues() {

	var baseBG = window.getComputedStyle(document.documentElement).getPropertyValue('--base-bg');
	var opacityLevel = baseBG.slice(-2); 

	backgroundTextBox.placeholder = baseBG;
	blurTextBox.placeholder = window.getComputedStyle(document.documentElement).getPropertyValue('--blur-strength');
	opacityTextBox.placeholder = opacityLevel;
}


window.onload = updateTextBoxValues();