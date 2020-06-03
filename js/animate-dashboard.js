var dashboard = document.getElementById("rightDashboard");
var dashboardHider = document.getElementById("dashboardHider");
var dashboardCloseButton = document.getElementById("closeDashboard");

var floatPanelVisible = false;

function slideDashboard() {

	// Hide search box
	if (searchBoxVisible) {
		toggleSearchBox();
	}
	
	// Toggle right panel
	dashboard.classList.toggle('show');

	// Scroll to top
	rightDashboard.scrollTop = 0;
	
	// Enable overlay
	dashboardHider.classList.toggle('show');
	floatPanelVisible = !floatPanelVisible;
}

dashboardHider.addEventListener(
	"mouseup",
	function() {
		if (floatPanelVisible) {
			slideDashboard();
		}
	}
);