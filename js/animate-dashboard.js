var dashboard = document.getElementById("rightDashboard");
var dashboardOverlay = document.getElementById("dashboardOverlay");

let rightDashboardVisibility = false;

// Disable/Enable inputs
var disableAllInputs = (status) => {
    var elems = dashboard.getElementsByTagName('input');
    var len = elems.length;

    for (var i = 0; i < len; i++) {
        elems[i].disabled = status;
    }
}

const showDashboard = () => {
	dashboard.classList.add('showRightDashboard');

	// Show overlay
    dashboardOverlay.classList.add('showDashboardOverlay');

    // Enable Inputs
    disableAllInputs(false);

    rightDashboardVisibility = !rightDashboardVisibility;
}

const hideDashboard = () => {
	dashboard.classList.remove('showRightDashboard');
	dashboard.scrollTop = 0;

    // Disable Inputs
    disableAllInputs(true);

	// Hide overlay
    dashboardOverlay.classList.remove('showDashboardOverlay');

    rightDashboardVisibility = !rightDashboardVisibility;
}

const toggleDashboard = () => {

    console.log('toggle dashboard');
 
    if (rightDashboardVisibility) {
    
    	// Hide dashboard
    	hideDashboard();  	
    
    } else {

    	// Show dashboard
    	showDashboard();

        // If centered box is hidden, open it
        if (centeredBox.classList.contains('hiddenBox')) {
            
            console.log('centered box is hidden, reopening...');
            
            // Rotate profile container
            rotateProfile();
            
            // Toggle center box
            toggleCenteredBox();
        }
    }

    // Check if any of these are open, if yes, close it
    if (weatherScreen.classList.contains('showWeatherScreen')) {
        console.log('weather screen is open, closing...');
        hideWeatherScreen();
        return;

    } else if (searchBoxContainer.classList.contains('showSearchBox')) {
        console.log('searchbox is open, closing...');
        hideSearchBox();
        
    } else if (webMenu.classList.contains('showWebMenu')) {
        console.log('web menu is open, closing...');
        hideWebMenu();
        return;
    }
}

dashboardOverlay.addEventListener(
	"mouseup",
	() => {
		if (rightDashboardVisibility) {
			toggleDashboard();
		}
	}
);


// Disable dashboard inputs on startup
window.onload = disableAllInputs(true);