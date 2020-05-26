var weatherSettingsIconContainer = document.getElementById("weatherSettingsIconContainer");
var weatherSettingsContainer = document.getElementById("weatherSettingsContainer");

var weatherSettingsVisible = false;

weatherSettingsIconContainer.onmouseup = function() {

		weatherSettingsContainer.classList.toggle('show');
	// if (weatherSettingsVisible) {
	// 	// Hide
	// } else {
	// 	// Show
	// 	weatherSettingsContainer.classList.toggle('unfade');
	// }
}


// var txt = "Height with padding and border: " + weatherSettingsContainer.offsetHeight + "px<br>";
// txt += "Width with padding and border: " + weatherSettingsContainer.offsetWidth + "px";

// alert(txt);