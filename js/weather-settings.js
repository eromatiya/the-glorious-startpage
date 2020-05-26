var localStorage = window.localStorage;

var weatherSettingsIconContainer = document.getElementById("weatherSettingsIconContainer");
var weatherSettingsContainer = document.getElementById("weatherSettingsContainer");

// Apply credentials
function applyWeatherSettings(key, city, units) {
	localStorage.setItem('apiKey', key);
	localStorage.setItem('cityID', city);
	localStorage.setItem('units', units);
}

// Update on startup

let appID = configData.weather.appID;
let cityID = configData.weather.cityID;
let units = configData.weather.units;

function updateWeatherSettings() {
	var appID = localStorage.getItem('apiKey');
	var cityID = localStorage.getItem('cityID');
	var units = localStorage.getItem('units');
}

// Input elements

// Textboxes
var apiBox = document.getElementById("apiBox");
var cityBox = document.getElementById("cityBox");

// Select menu
var weatherSelectUnits = document.getElementById("weatherSelectUnits");

// Div buttons
var weatherSettingsReset = document.getElementById("weatherSettingsReset");
var weatherSettingsApply = document.getElementById("weatherSettingsApply");

// Button events
weatherSettingsIconContainer.onmouseup = function() {
	weatherSettingsContainer.classList.toggle('show');
}

// Reset button was pressed
weatherSettingsReset.onmouseup = function() {
	// Reset keys
	applyWeatherSettings('', '', '')
}

// Apply settings
weatherSettingsApply.onmouseup = function() {
	applyWeatherSettings(
		apiBox.value,
		cityBox.value,
		weatherSelectUnits.options[weatherSelectUnits.selectedIndex].value
	);
	alert('Successfully updated!');
}