var searchBox = document.getElementById('searchBox');
const searchBoxContainer = document.getElementById('searchBoxContainer');
const centeredBoxOverlay = document.getElementById('centeredBoxOverlay');

let searchBoxVisility = false;

const showSearchBox = () => {
	searchBoxContainer.classList.add('showSearchBox');

	// Focus
    searchBox.focus();

    searchBoxVisility = !searchBoxVisility;

    // Toggle overlay
    centeredBoxOverlay.classList.toggle('showOverlay');
}

const hideSearchBox = () => {
	searchBoxContainer.classList.remove('showSearchBox');

    // Toggle overlay
    centeredBoxOverlay.classList.toggle('showOverlay');

    searchBox.value = '';

    // Hide suggestions
    hideSuggestions();

    searchBoxVisility = !searchBoxVisility;
}

const toggleSearchBox = () => {

    // If profile anim is still running,
    // Return to avoid spam
	if (profileAnimRunning) return;

	// Rotate profile
    rotateProfile();

    if (searchBoxVisility) {
    	// Hide search box
    	hideSearchBox();

    } else {
    	// Show search box
    	showSearchBox();  	
    }

	console.log('toggle searchbox');
}