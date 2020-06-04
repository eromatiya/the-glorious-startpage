var localStorage = window.localStorage;

var searchBox = document.getElementById("searchBox");
var selectEngine = document.getElementById("searchEngineSelect");
var searchEngineAsDefault = document.getElementById("searchEngineAsDefault");

// Get default search engine
var defaultEngine = localStorage.getItem('searchEngine') || 'google';

let searchQueryPrefix;

// Update query string and placeholder
const selectQueryString = () => {

	if (defaultEngine === "google") {
		searchQueryPrefix = 'http://www.google.com/search?q=';
		searchBox.placeholder = "Search with Google";

	} else if (defaultEngine === "duckduckgo") {
		searchQueryPrefix = 'https://duckduckgo.com/?q=';
		searchBox.placeholder = "Search with Duckduckgo";

	} else if (defaultEngine === "ecosia") {
		searchQueryPrefix = 'https://www.ecosia.org/search?q=';
		searchBox.placeholder = "Search with Ecosia";

	} else if (defaultEngine === "yahoo") {
		searchQueryPrefix = 'http://search.yahoo.com/search?p=';
		searchBox.placeholder = "Search with Yahoo";

	} else if (defaultEngine === "bing") {
		searchQueryPrefix = 'https://www.bing.com/search?q=';
		searchBox.placeholder = "Search with Bing";
	
	} else {
		searchQueryPrefix = 'http://www.google.com/search?q=';
		searchBox.placeholder = "Search with Google";
	}

}

// Use this to select the default search engine on startup
const selectTheEngine = () => {
	// Available values: google, duckduckgo, ecosia, etc.
    selectEngine.value = defaultEngine;
    selectQueryString();
}

// Update settings if the value changes
selectEngine.onchange = () => {
	// Get Value
	var selectedEngine = selectEngine.options[selectEngine.selectedIndex].value;
	defaultEngine = selectedEngine;
	selectTheEngine()
}

searchEngineAsDefault.onmouseup = () => {
	var selectCurrentIndex = selectEngine.options[selectEngine.selectedIndex]
	alert('Success! ' + selectCurrentIndex.text + 
		' is now your default search engine!');

	// Save search engine
	localStorage.setItem('searchEngine', selectCurrentIndex.value);
}

// Initialize
window.onload = selectTheEngine();
