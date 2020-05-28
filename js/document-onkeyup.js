var searchBox = document.getElementById("searchBox");

// Keypress events
document.onkeyup = function keydown (event) { 

    if (event.keyCode === 27) {

        // If searchbox is visible, hide and clear input field
        if (searchBoxVisible) {
            // Hide searchbox
            toggleSearchBox();
            searchBox.value = '';
            return;
        };

        // If dashboard is visible, hide
        if (floatPanelVisible) {
            slideDashboard();
        }

        // Show web menu
        webMenuToggle();
        return;
    }

    // If searchbox is not visible, open and focus
    if (searchBoxVisible === false) {

        // Don't show searchbox when web menu is open
        if (webMenuVisible) {
            return;
        }

        // Dont accept alt, ctrl,
        // left/right window key, f5, return
        if (event.altKey ||
            event.ctrlKey ||
            event.keyCode === 91 ||
            event.keyCode === 92 ||
            event.keyCode === 116 || 
            event.keyCode === 13)
            { return; };


        // Check if weather settings is open
        if (weatherSettingsVisible) { return; };

        // Open and focus
        toggleSearchBox();
        searchBox.focus();
    
    } else {
        
        // Backspacing while there's no search query will hide searhbox
        // Will also hide if you hit enter
        if ((event.keyCode === 8 || event.keyCode === 13) && 
            searchBox.value < 1) { toggleSearchBox(); return; };

        // Clear searchbox
        if (event.shiftKey && event.keyCode === 32 ) { 
            searchBox.value = '';
            return; 
        };
    }
}

