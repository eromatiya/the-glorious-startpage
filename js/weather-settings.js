class WeatherSettings {

	constructor() {

		this._localStorage = window.localStorage;
		
		this._appID = '';
		this._cityID = '';
		this._units = '';

		this._apiBox = document.querySelector('#apiBox');
		this._cityBox = document.querySelector('#cityBox');

		this._weatherSelectUnits = document.querySelector('#weatherSelectUnits');

		this._weatherSettingsReset = document.querySelector('#weatherSettingsReset');
		this._weatherSettingsApply = document.querySelector('#weatherSettingsApply');

		this.getWeatherData = weatherScreen.getWeatherData;
		this.getForecastData = weatherScreen.getForecastData;

		this._init();
	}

	// Apply credentials
	_applyWeatherSettings = (key, city, units) => {
		this._localStorage.setItem('apiKey', key);
		this._localStorage.setItem('cityID', city);
		this._localStorage.setItem('units', units);
	}

	// Clear credentials
	_resetWeatherSettings = () => {
		this._localStorage.removeItem('apiKey');
		this._localStorage.removeItem('cityID');
		this._localStorage.removeItem('units');
	}

	// Reset textboxes
	_deleteWeatherSettingsValue = () => {
		this._apiBox.value = '';
		this._cityBox.value = '';
		this._weatherSelectUnits.value = 'metric';
	}

	// Update textbox placeholders
	_updateWeatherSettingsPlaceholder = () => {
		this._apiBox.placeholder = String(this._appID) || 'API Key';
		this._cityBox.placeholder = String(this._cityID) || 'City ID';
		this._weatherSelectUnits.value = String(this._units) || 'metric';
	}

	// Update weather settings
	_updateWeatherSettings = () => {
		this._appID = localStorage.getItem('apiKey') || 'API Key';
		this._cityID = localStorage.getItem('cityID') || 'City ID';
		this._units = localStorage.getItem('units') || 'metric';

		// Update weather forecast elements
		this.getWeatherData(this._appID, this._cityID, this._units);
		this.getForecastData(this._appID, this._cityID, this._units);

		this._deleteWeatherSettingsValue();
		this._updateWeatherSettingsPlaceholder();
	}

	_weatherResetOnClickEvent = e => {
		// Reset keys
		this._resetWeatherSettings();
		this._updateWeatherSettings();
		alert('Credentials deleted!');
	}

	_registerWeatherResetOnClickEvent = () => {
		this._weatherSettingsReset.onclick = this._weatherResetOnClickEvent;
	}

	_weatherApplyOnClickEvent = e => {
		this._applyWeatherSettings(
			this._apiBox.value || this._apiBox.placeholder,
			this._cityBox.value || this._cityBox.placeholder,
			this._weatherSelectUnits.options[this._weatherSelectUnits.selectedIndex].value
		);
		this._updateWeatherSettings();
		alert('Successfully updated!');
	}

	_registerWeatherApplyOnClickEvent = () => {
		this._weatherSettingsApply.onclick = this._weatherApplyOnClickEvent;
	}

	_init = () => {
		this._updateWeatherSettings();
		this._registerWeatherResetOnClickEvent();
		this._registerWeatherApplyOnClickEvent();
	}
}