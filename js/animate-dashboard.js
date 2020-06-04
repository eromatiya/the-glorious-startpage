var dashboard = document.getElementById("rightDashboard");
var dashboardOverlay = document.getElementById("dashboardOverlay");

let rightDashboardVisibility = false;

const showDashboard = () => {
	dashboard.classList.add('showRightDashboard');

	// Show overlay
    dashboardOverlay.classList.add('showDashboardOverlay');

    rightDashboardVisibility = !rightDashboardVisibility;
}

const hideDashboard = () => {
	dashboard.classList.remove('showRightDashboard');
	dashboard.scrollTop = 0;

	// Hide overlay
    dashboardOverlay.classList.remove('showDashboardOverlay');

    rightDashboardVisibility = !rightDashboardVisibility;
}

const toggleDashboard = () => {

    // If profile anim is still running,
    // Return to avoid spam
	if (profileAnimRunning) return;

	// Rotate profile
    rotateProfile();

    if (rightDashboardVisibility) {
    	// Hide search box
    	hideDashboard();  	

    } else {
    	// Show search box
    	showDashboard();
    }

    console.log('toggle dashboard');
}

dashboardOverlay.addEventListener(
	"mouseup",
	() => {
		if (rightDashboardVisibility) {
			toggleDashboard();
		}
	}
);