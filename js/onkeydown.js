// Keypress events
document.onkeydown = function keydown (evt) { 
    if (!evt) evt = event; 

    if (searchBoxVisible == false) {

        // Don't accept this keycodes
        if (evt.keyCode === 13 || evt.altKey || 
            evt.ctrlKey || evt.keyCode === 91 || evt.keyCode === 116) { return; };

        // Check if weather settings is open
        if (weatherSettingsVisible) { return; };

        // Don't show searchbox when web menu is open
        if (webMenuVisible) {
            return;
        }

    	// Show search box
	    toggleSearchBox();
    	searchBox.focus();

    } else {

        // Backspacing while there's no search query will hide searhbox
        if ((evt.keyCode === 8 || evt.keyCode === 13) && 
            searchBox.value < 1) { toggleSearchBox(); return; };

        // Ctrl and space hides searchbox
        if ((evt.ctrlKey && evt.keyCode === 32) || evt.keyCode === 27 ) {
        	searchBox.value = '';
        	toggleSearchBox()

        // Shift and space clears searchbox
        } else if (evt.shiftKey && evt.keyCode === 32 ) {
            // Clear searchbox
            searchBox.value = '';
        }
    }
}

