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

    if (rightDashboardVisibility) {
    	// Hide dashboard
    	hideDashboard();  	

    } else {
    	// Show dashboard
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