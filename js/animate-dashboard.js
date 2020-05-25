var dashboard = document.getElementById("rightDashboard");
var dashboardHider = document.getElementById("overlayHider");

var panelOpen = false;

function slideDashboard() {

	// Hide search box
	if (searchBoxVisible) {
		toggleSearchBox();
	}

	// Toggle right panel
	if (!panelOpen) {
		dashboard.style.width = "350px"
	} else {
		dashboard.style.width = "0"
	}
	// Enable overlay
	dashboardHider.classList.toggle('show');
	panelOpen = !panelOpen;

}


dashboardHider.addEventListener(
	"mouseup", function() {
		if (panelOpen) {
			slideDashboard();
		}
	}
);
