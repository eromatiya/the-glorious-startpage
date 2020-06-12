class WeatherSettings {

	constructor() {

		this._localStorage = window.localStorage;
		
		this._appID = '';
		this._cityID = '';
		this._units = '';
		this._locatorMode = '';

		// Geolocation data
		this._origLongitude = 0;
		this._origLatitude = 0;
		this._watchPositionID = 0;

		this._watchPositionOptions = {
			enableHighAccuracy: false,
			timeout: 10000,
			maximumAge: 0
		};

		this._apiKeySet = document.querySelector('#apiKeySet');
		this._cityIDSet = document.querySelector('#cityIDSet');

		this._weatherSelectLocator = document.querySelector('#weatherSelectLocator');
		this._weatherSelectUnits = document.querySelector('#weatherSelectUnits');

		this._weatherSettingsReset = document.querySelector('#weatherSettingsReset');
		this._weatherSettingsApply = document.querySelector('#weatherSettingsApply');

		this._weatherSettingsCityIDGroup = document.querySelector('#weatherSettingsCityID');

		this.getWeatherData = weatherScreen.getWeatherData;
		this.getForecastData = weatherScreen.getForecastData;

		this._init();
	}

	_init = () => {
		this._updateWeatherSettings();
		this._registerWeatherResetOnClickEvent();
		this._registerWeatherApplyOnClickEvent();
		this._registerWeatherSelectLocatorOnChangeEvent();
	}

	// Clear credentials
	_clearWeatherCredentials = () => {
		this._localStorage.removeItem('apiKey');
		this._localStorage.removeItem('cityID');
		this._localStorage.removeItem('units');
		this._localStorage.removeItem('locatorMode');
	}

	// Reset textboxes
	_deleteWeatherSettingsValue = () => {
		this._apiKeySet.value = '';
		this._cityIDSet.value = '';
		this._weatherSelectUnits.value = 'metric';
		this._weatherSelectLocator.value = 'geolocation';
	}

	// Apply credentials
	_applyWeatherSettings = (key, city, units, locator) => {
		this._localStorage.setItem('apiKey', key);
		this._localStorage.setItem('cityID', city);
		this._localStorage.setItem('units', units);
		this._localStorage.setItem('locatorMode', locator);
	}

	// Update credential variables
	_updateCredentialVariables = () => {
		this._appID = this._localStorage.getItem('apiKey') || 'API Key';
		this._cityID = this._localStorage.getItem('cityID') || 'City ID';
		this._units = this._localStorage.getItem('units') || 'metric';
		this._locatorMode = this._localStorage.getItem('locatorMode') || 'geolocation';
	}

	// Update textbox placeholders
	_updateWeatherSettingsPlaceholder = () => {
		this._apiKeySet.placeholder = this._appID;
		this._cityIDSet.placeholder = this._cityID;
		this._weatherSelectUnits.value = this._units;
		this._weatherSelectLocator.value = this._locatorMode;
	}

	_weatherSelectLocatorOnChangeEvent = e => {

		this._locatorMode = this._weatherSelectLocator.options[this._weatherSelectLocator.selectedIndex].value;

		if (this._locatorMode === 'geolocation') {

			console.log('geolocation');

			this._weatherSettingsCityIDGroup.classList.add('hideWeatherSettings');

		} else if (this._locatorMode === 'city') {

			console.log('city');

			this._weatherSettingsCityIDGroup.classList.remove('hideWeatherSettings');

		}

	}

	_registerWeatherSelectLocatorOnChangeEvent = () => {

		this._weatherSelectLocator.onchange = this._weatherSelectLocatorOnChangeEvent;

	}

	// Update weather settings
	_updateWeatherSettings = () => {


		// Update cred vars
		this._updateCredentialVariables();

		if (this._locatorMode === 'geolocation') {

			this._weatherSettingsCityIDGroup.classList.add('hideWeatherSettings');

		} else if (this._locatorMode === 'city') {

			this._weatherSettingsCityIDGroup.classList.remove('hideWeatherSettings');

			// Update weather forecast elements
			this.getWeatherData(this._appID, this._cityID, this._units);
			this.getForecastData(this._appID, this._cityID, this._units);

		}

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
			this._weatherSelectUnits.options[this._weatherSelectUnits.selectedIndex].value,
			this._weatherSelectLocator.options[this._weatherSelectLocator.selectedIndex].value
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