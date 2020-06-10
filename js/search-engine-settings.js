class SearchEngineSettings {

	constructor() {
		this._localStorage = window.localStorage;

		this._searchBox = document.querySelector('#searchBox');
		this._selectSearchEngine = document.querySelector('#searchEngineSelect');
		this._selectSearchEngineApply = document.querySelector('#searchEngineAsDefault');
		
		this._placeholderPrefix = '  Search with ';
		this._searchQueryPrefix = 'http://www.google.com/search?q=';

		this._searchEngines = config.getSearchEngines();

		this._onClickEvent = this._onClickEvent.bind(this);
		this._onChangeEvent = this._onChangeEvent.bind(this);

		this._init();
	}

	_init = () => {
		this._updateDefaultSearchEngine();
		this._createSearchEngineOptions();
		this._selectTheEngine();
		this._registerOnChangeEvent();
		this._registerOnClickEvent();
	}

	_updateDefaultSearchEngine = () => {
		// Update default search engine and current search engine
		this._defaultSearchEngine = this._localStorage.getItem('searchEngine') || 'google';
		this._currentSearchEngine = this._defaultSearchEngine;
	}

	// Get query prefix
	getSearchQueryPrefix = () => {
		return this._searchQueryPrefix;
	}

	// Parse the this._searchEngines object to automatically create a selection
	_createSearchEngineOptions = () => {
		Object.keys(this._searchEngines)
		.forEach(key => {
			const seValue = key;
			const seData = this._searchEngines[key];
			const seOption = document.createElement('option');

			// Generate search engine suggestions
			this._selectSearchEngine.insertAdjacentHTML(
				'beforeend',
				`
				<option value='${seValue}'>${seData.name}</option>
				`
			)
		})

		// Call to update query string and placeholder
		this._updateSearchEngineElements();
	}

	// Update query string and placeholder
	_updateSearchEngineElements = () => {

		const seData = this._searchEngines[this._currentSearchEngine];

		this._searchQueryPrefix = seData.prefix;
		this._searchBox.placeholder = this._placeholderPrefix + seData.name;
	}

	// Use this to select the current/default search engine on startup
	_selectTheEngine = () => {
	    this._selectSearchEngine.value = this._currentSearchEngine;
	    this._updateSearchEngineElements();
	}

	// Execute this on change event of <select>
	_onChangeEvent = e => {
		const selectedEngine = this._selectSearchEngine.options[this._selectSearchEngine.selectedIndex].value;
		this._currentSearchEngine = selectedEngine;
		this._selectTheEngine();
	}

	_registerOnChangeEvent = () => {
		this._selectSearchEngine.onchange = this._onChangeEvent;
	}

	// Apply button callback
	_onClickEvent = e => {
		// Get selected <options>
		const selectCurrentIndex = this._selectSearchEngine.options[this._selectSearchEngine.selectedIndex];

		// Alert
		alert('Success! ' + selectCurrentIndex.text + 
			' is now your default search engine!');

		// Save and apply default search engine
		this._localStorage.setItem('searchEngine', selectCurrentIndex.value);

		// Update default search engine and current search engine
		this._updateDefaultSearchEngine();
	}

	_registerOnClickEvent = () => {
		this._selectSearchEngineApply.onclick = this._onClickEvent;
	}

}