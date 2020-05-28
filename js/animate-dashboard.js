var dashboard = document.getElementById("rightDashboard");
var dashboardHider = document.getElementById("overlayHider");

var floatPanelVisible = false;

function slideDashboard() {

	// Hide search box
	if (searchBoxVisible) {
		toggleSearchBox();
	}
	
	// Toggle right panel
	dashboard.classList.toggle('show');
	
	// Enable overlay
	dashboardHider.classList.toggle('show');
	floatPanelVisible = !floatPanelVisible;

}


dashboardHider.addEventListener(
	"mouseup", function() {
		if (floatPanelVisible) {
			slideDashboard();
		}
	}
);
