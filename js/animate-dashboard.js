var dashboard = document.getElementById("rightDashboard");

let rightDashboardVisibility = false;


const showDashboard = () => {
	dashboard.classList.add('showRightDashboard');

    rightDashboardVisibility = !rightDashboardVisibility;
}

const hideDashboard = () => {
	dashboard.classList.remove('showRightDashboard');
	dashboard.scrollTop = 0;

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

    // Show overlay
    // centeredBoxOverlay.classList.toggle('showOverlay');

	console.log('toggle dashboard');
}