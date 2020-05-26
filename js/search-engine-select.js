var selectEngine = document.getElementById("searchEngineSelect");

// Get default search engine
var defaultEngine = configData.searchEngine;

// Use this to select the default search engine on startup
function selectTheEngine() {
	// Available values: google, duckduckgo, ecosia
    selectEngine.value = defaultEngine;
}

// Call
selectTheEngine();

// Execute something if the value changes
selectEngine.onchange = function() { 
	
	// Get Value
	var selectedEngine = selectEngine.options[selectEngine.selectedIndex].value;
	defaultEngine = selectedEngine;

}
