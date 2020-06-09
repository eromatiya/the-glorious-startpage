class SearchQuerySend extends SearchEngineSettings {

	constructor() {
		super();
		this._searchBox = document.querySelector('#searchBox');
		this._keyUpEvent = this._keyUpEvent.bind(this);
		this._registerKeyUpEvent();
	}

	_sendQuery = () => {
		// Search
		window.location.href = encodeURI(this._getSearchQueryPrefix() + this._searchBox.value);
	};

	_keyUpEvent = event => {
		if (event.key === 'Tab') return;

		// Number 13 is the "Enter" key on the keyboard
	  	if (event.key === 'Enter') {

			// Don't accept empty strings
			if (searchBox.value < 1) {
				return;
			}

	    	// Cancel the default action, if needed
	    	event.preventDefault();

	    	// Search the web
	    	this._sendQuery()
		};
	}

	_registerKeyUpEvent = () => {
		this._searchBox.addEventListener('keyup', this._keyUpEvent);
	}
}
