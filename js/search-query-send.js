class SearchQuerySend {

	constructor() {
		this._searchBox = document.querySelector('#searchBox');
		this._keyUpEvent = this._keyUpEvent.bind(this);
		
		this._registerKeyUpEvent();
	}

	// Check if search query is a valid url
	_isURL = u => {
		let dummyInput;

		if (!dummyInput) {
			dummyInput = document.createElement('input');
			dummyInput.setAttribute('type', 'url');
		}

		dummyInput.value = u;
		return dummyInput.validity.valid;
	}

	// Search query
	_sendQuery = () => {

		// If search query is a url, open it
		if (this._isURL(this._searchBox.value)) {
			window.location.href = encodeURI(this._searchBox.value);
			return;
		}

		// Web search
		window.location.href = encodeURI(searchEngineSettings.getSearchQueryPrefix() + this._searchBox.value);
	};

	_keyUpEvent = event => {
		// Cancel the default action, if needed
		event.preventDefault();
		
		if (event.key === 'Tab') return;

		// Number 13 is the "Enter" key on the keyboard
	  	if (event.key === 'Enter') {

			// Don't accept empty strings
			if (searchBox.value < 1) {
				return;
			}

			// Search the web
			this._sendQuery();
		}
	}

	_registerKeyUpEvent = () => {
		this._searchBox.addEventListener('keyup', this._keyUpEvent);
	}
}
