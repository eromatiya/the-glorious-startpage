// Search box
var searchBox = document.getElementById("searchBox");

// Web Search
const webSearch = () => {
	// Search
	window.location.href = encodeURI(searchQueryPrefix + searchBox.value);
};

// Key release event
searchBox.addEventListener(
	"keyup",
	(event) => {
		
		// Number 13 is the "Enter" key on the keyboard
	  	if (event.key === 'Enter') {

			// Don't accept empty strings
			if (searchBox.value < 1) {
				return;
			}

	    	// Cancel the default action, if needed
	    	event.preventDefault();

	    	// Search the web
	    	webSearch()
		};

	}
);