var searchBox = document.getElementById('searchBox');

let searchBoxVisility = false;

const showSearchBox = () => {
	searchBox.classList.add('showSearchBox');

	// Focus
    searchBox.focus();

    searchBoxVisility = !searchBoxVisility;
}

const hideSearchBox = () => {
	searchBox.classList.remove('showSearchBox');

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