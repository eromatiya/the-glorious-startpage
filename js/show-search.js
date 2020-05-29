var searchBox = document.getElementById("searchBox");
var blurOverlay = document.getElementById("blurOverlay");

var searchBoxVisible = false

// Show searchbox
function toggleSearchBox() {

	// Dont animate again if animation's still profileRotating
	if (profileRotating) { return; };

    // Rotate
    rotateProfile();

	// Call unfade class to show search box    
    searchBox.classList.toggle('unfade');
    blurOverlay.classList.toggle('show');

    searchBoxVisible = !searchBoxVisible;

    if (searchBoxVisible) {
        searchBox.focus();
    } 

    // If float panel is visible, hide
    if (floatPanelVisible) {
        slideDashboard();
    }
}

