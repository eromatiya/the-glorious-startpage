"use strict";

var profileContainer = document.getElementById("profileContainer");
var searchBox = document.getElementById("searchBox");
var blurOverlay = document.getElementById("blurOverlay");

var running = false;
var searchBoxVisible = false

// Paused animation
profileContainer.style.webkitAnimationPlayState = "paused";

// Show searchbox
function toggleSearchBox() {

	// Dont animate again if animation's still running
	if (running) { return; };

    event.preventDefault;

    // Remove anim class
    profileContainer.classList.remove('rotateAnim');

    // Triggering reflow
    void profileContainer.offsetWidth;

    // Re-add animation class
    profileContainer.classList.add('rotateAnim');

    profileContainer.style.webkitAnimationPlayState = "running";
    running = true;

	// Call unfade class to show search box    
    searchBox.classList.toggle('unfade');
    blurOverlay.classList.toggle('show');

    searchBoxVisible = !searchBoxVisible;

    if (panelOpen) {
        slideDashboard();
    }

}

// Reenable animation after death
profileContainer.addEventListener(
    "animationend", 
    function(event) {
        running = false;
    }
); 

// Animate/Show searchbox if profile container was clicked
profileContainer.onclick = function() {
	toggleSearchBox()
};

// Keypress events
document.onkeydown = function keydown (evt) { 
    if (!evt) evt = event; 

    if (searchBoxVisible == false) {

        // Don't accept this keycodes
        if (evt.keyCode === 13 || evt.altKey || 
            evt.ctrlKey || evt.keyCode === 91 || evt.keyCode === 116) { return; };

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

