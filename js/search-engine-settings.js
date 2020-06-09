class SearchEngineSettings {

	constructor() {
		this._localStorage = window.localStorage;

		this._searchBox = document.querySelector('#searchBox');
		this._selectSearchEngine = document.querySelector('#searchEngineSelect');
		this._selectSearchEngineApply = document.querySelector('#searchEngineAsDefault');
		
		this._defaultSearchEngine = this._localStorage.getItem('searchEngine') || 'google';
		this._placeholderPrefix = '  Search with ';
		this._searchQueryPrefix = 'http://www.google.com/search?q=';

		this._onClickEvent = this._onClickEvent.bind(this);
		this._onChangeEvent = this._onChangeEvent.bind(this);

		this._init();
	}

	_init = () => {
		this._selectQueryString();
		this._selectTheEngine();
		this._registerOnChangeEvent();
		this._registerOnClickEvent();
	}

	// Update query string and placeholder
	_selectQueryString = () => {

		if (this._defaultSearchEngine === 'google') {
			this._searchQueryPrefix = 'http://www.google.com/search?q=';
			this._searchBox.placeholder = this._placeholderPrefix + 'Google';

		} else if (this._defaultSearchEngine === 'duckduckgo') {
			this._searchQueryPrefix = 'https://duckduckgo.com/?q=';
			this._searchBox.placeholder = this._placeholderPrefix + 'Duckduckgo';

		} else if (this._defaultSearchEngine === 'ecosia') {
			this._searchQueryPrefix = 'https://www.ecosia.org/search?q=';
			this._searchBox.placeholder = this._placeholderPrefix + 'Ecosia';

		} else if (this._defaultSearchEngine === 'yahoo') {
			this._searchQueryPrefix = 'http://search.yahoo.com/search?p=';
			this._searchBox.placeholder = this._placeholderPrefix + 'Yahoo';

		} else if (this._defaultSearchEngine === 'bing') {
			this._searchQueryPrefix = 'https://www.bing.com/search?q=';
			this._searchBox.placeholder = this._placeholderPrefix + 'Bing';
		
		} else {
			this._searchQueryPrefix = 'http://www.google.com/search?q=';
			this._searchBox.placeholder = this._placeholderPrefix + 'Google';
		}
	}

	_getSearchQueryPrefix = () => {
		return this._searchQueryPrefix;
	}

	// Use this to select the default search engine on startup
	_selectTheEngine = () => {
		// Available values: google, duckduckgo, ecosia, etc.
	    this._selectSearchEngine.value = this._defaultSearchEngine;
	    this._selectQueryString();
	}

	_onChangeEvent = e => {
		const selectedEngine = this._selectSearchEngine.options[this._selectSearchEngine.selectedIndex].value;
		this._defaultSearchEngine = selectedEngine;
		this._selectTheEngine()
	}

	_registerOnChangeEvent = () => {
		this._selectSearchEngine.onchange = this._onChangeEvent;
	}

	_onClickEvent = e => {
		const selectCurrentIndex = this._selectSearchEngine.options[this._selectSearchEngine.selectedIndex]
		alert('Success! ' + selectCurrentIndex.text + 
			' is now your default search engine!');

		// Save search engine
		this._localStorage.setItem('searchEngine', selectCurrentIndex.value);
	}

	_registerOnClickEvent = () => {
		this._selectSearchEngineApply.onclick = this._onClickEvent;
	}

}