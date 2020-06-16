// Set constiable
let appID, cityID, units;

// Input elements

// Textboxes
const apiBox = document.getElementById("apiBox");
const cityBox = document.getElementById("cityBox");

// Select menu
const weatherSelectUnits = document.getElementById("weatherSelectUnits");

// Div buttons
const weatherSettingsReset = document.getElementById("weatherSettingsReset");
const weatherSettingsApply = document.getElementById("weatherSettingsApply");

// Apply credentials
const applyWeatherSettings = (key, city, units) => {
	localStorage.setItem('apiKey', key);
	localStorage.setItem('cityID', city);
	localStorage.setItem('units', units);
}

// Clear credentials
const resetWeatherSettings = () => {
	localStorage.removeItem('apiKey');
	localStorage.removeItem('cityID');
	localStorage.removeItem('units');
}

// Update functions
const deleteWeatherSettingsValue = () => {
	apiBox.value = '';
	cityBox.value = '';
	weatherSelectUnits.value = "metric";
}

const updateWeatherSettingsPlaceholder = () => {
	apiBox.placeholder = String(appID) || "API Key";
	cityBox.placeholder = String(cityID) || "City ID";
	weatherSelectUnits.value = String(units) || "metric";
}

const updateWeatherSettings = () => {
	appID = localStorage.getItem('apiKey') || "API Key";
	cityID = localStorage.getItem('cityID') || "City ID";
	units = localStorage.getItem('units') || "metric";

	// Update weather forecast elements
	getWeatherData(appID, cityID, units);
	getForecastData(appID, cityID, units);

	deleteWeatherSettingsValue();
	updateWeatherSettingsPlaceholder();
}

// Reset button was pressed
weatherSettingsReset.onclick = () => {
	// Reset keys
	resetWeatherSettings();
	updateWeatherSettings();
	alert('Credentials deleted!');
}

// Apply settings
weatherSettingsApply.onclick = () => {
	applyWeatherSettings(
		apiBox.value || apiBox.placeholder,
		cityBox.value || cityBox.placeholder,
		weatherSelectUnits.options[weatherSelectUnits.selectedIndex].value
	);
	updateWeatherSettings();
	alert('Successfully updated!');
}

window.onload = updateWeatherSettings();
