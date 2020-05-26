// Search box
var searchBox = document.getElementById("searchBox");

// Web Search
function webSearch() {
	// Search
	window.location.href = encodeURI(searchQueryPrefix + searchBox.value);
};

// Key release event
searchBox.addEventListener("keyup", function(event) {
	
	// Number 13 is the "Enter" key on the keyboard
  	if (event.keyCode === 13) {

		// Don't accept empty strings
		if (searchBox.value < 1) {
			return;
		}

    	// Cancel the default action, if needed
    	event.preventDefault();

    	// Search the web
    	webSearch()
	};

});