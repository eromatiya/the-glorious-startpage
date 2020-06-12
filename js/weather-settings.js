class WeatherSettings {

	constructor() {

		this._localStorage = window.localStorage;
		
		this._appID = '';
		this._cityID = '';
		this._units = '';

		this._apiKeySet = document.querySelector('#apiKeySet');
		this._cityIDSet = document.querySelector('#cityIDSet');

		this._weatherSelectUnits = document.querySelector('#weatherSelectUnits');

		this._weatherSettingsReset = document.querySelector('#weatherSettingsReset');
		this._weatherSettingsApply = document.querySelector('#weatherSettingsApply');

		this.getWeatherData = weatherScreen.getWeatherData;
		this.getForecastData = weatherScreen.getForecastData;

		this._init();
	}

	_init = () => {
		// this._updat2eWeatherSettings();
		this._registerWeatherResetOnClickEvent();
		this._registerWeatherApplyOnClickEvent();
	}

	// Clear credentials
	_clearWeatherCredentials = () => {
		this._localStorage.removeItem('apiKey');
		this._localStorage.removeItem('cityID');
		this._localStorage.removeItem('units');
	}

	// Reset textboxes
	_deleteWeatherSettingsValue = () => {
		this._apiKeySet.value = '';
		this._cityIDSet.value = '';
		this._weatherSelectUnits.value = 'metric';
	}

	// Apply credentials
	_applyWeatherSettings = (key, city, units) => {
		this._localStorage.setItem('apiKey', key);
		this._localStorage.setItem('cityID', city);
		this._localStorage.setItem('units', units);
	}

	// Update credential variables
	_updateCredentialVariables = () => {
		this._appID = localStorage.getItem('apiKey') || 'API Key';
		this._cityID = localStorage.getItem('cityID') || 'City ID';
		this._units = localStorage.getItem('units') || 'metric';
	}

	// Update textbox placeholders
	_updateWeatherSettingsPlaceholder = () => {
		this._apiKeySet.placeholder = this._appID;
		this._cityIDSet.placeholder = this._cityID;
		this._weatherSelectUnits.value = this._units;
	}

	// Update weather settings
	_updateWeatherSettings = () => {
		
		// Update cred vars
		this._updateCredentialVariables();

		// Update weather forecast elements
		this.getWeatherData(this._appID, this._cityID, this._units);
		this.getForecastData(this._appID, this._cityID, this._units);

		this._deleteWeatherSettingsValue();
		this._updateWeatherSettingsPlaceholder();

	}

	// Reset
	_weatherResetOnClickEvent = e => {
		// Reset keys
		this._clearWeatherCredentials();

		this._updateCredentialVariables();
		this._deleteWeatherSettingsValue();
		this._updateWeatherSettingsPlaceholder();
		alert('Credentials deleted!');
	}

	// Apply Onclick event
	_weatherApplyOnClickEvent = e => {

		// Update credentials/Settings
		this._applyWeatherSettings(
			this._apiKeySet.value || this._apiKeySet.placeholder,
			this._cityIDSet.value || this._cityIDSet.placeholder,
			this._weatherSelectUnits.options[this._weatherSelectUnits.selectedIndex].value
		);

		this._updateWeatherSettings();
		alert('Successfully updated!');
	}

	_registerWeatherResetOnClickEvent = () => {
		this._weatherSettingsReset.onclick = this._weatherResetOnClickEvent;
	}

	_registerWeatherApplyOnClickEvent = () => {
		this._weatherSettingsApply.onclick = this._weatherApplyOnClickEvent;
	}

}