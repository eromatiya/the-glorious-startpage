var localStorage = window.localStorage;

var weatherSettingsIconContainer = document.getElementById("weatherSettingsIconContainer");
var weatherSettingsContainer = document.getElementById("weatherSettingsContainer");

let weatherSettingsVisible = false;

// Apply credentials
function applyWeatherSettings(key, city, units) {
	localStorage.setItem('apiKey', key);
	localStorage.setItem('cityID', city);
	localStorage.setItem('units', units);
}

// Update on startup

// Set variable
let appID;
let cityID;
let units;

// Input elements

// Textboxes
var apiBox = document.getElementById("apiBox");
var cityBox = document.getElementById("cityBox");

// Select menu
var weatherSelectUnits = document.getElementById("weatherSelectUnits");

// Div buttons
var weatherSettingsReset = document.getElementById("weatherSettingsReset");
var weatherSettingsApply = document.getElementById("weatherSettingsApply");

// Update functions
function deleteWeatherSettingsValue() {
	apiBox.value = '';
	cityBox.value = '';
	weatherSelectUnits.value = "metric";
}

function updateWeatherSettingsPlaceholder() {
	apiBox.placeholder = String(appID) || "API Key";
	cityBox.placeholder = String(cityID) || "City ID";
	weatherSelectUnits.value = String(units) || "metric";
}

function updateWeatherSettings() {
	appID = localStorage.getItem('apiKey') || "API Key";
	cityID = localStorage.getItem('cityID') || "City ID";
	units = localStorage.getItem('units') || "metric";

	deleteWeatherSettingsValue();
	updateWeatherSettingsPlaceholder();
}

// Call
updateWeatherSettings();

// Button events
weatherSettingsIconContainer.onmouseup = function() {
	weatherSettingsContainer.classList.toggle('show');
	weatherSettingsVisible = !weatherSettingsVisible;
}

// Reset button was pressed
weatherSettingsReset.onmouseup = function() {
	// Reset keys
	applyWeatherSettings('', '', '');
	updateWeatherSettings();
	getWeatherData();
	alert('Credentials deleted!');
}

// Apply settings
weatherSettingsApply.onmouseup = function() {
	applyWeatherSettings(
		apiBox.value || apiBox.placeholder,
		cityBox.value || cityBox.placeholder,
		weatherSelectUnits.options[weatherSelectUnits.selectedIndex].value
	);
	updateWeatherSettings();
	getWeatherData();
	alert('Successfully updated!');
}