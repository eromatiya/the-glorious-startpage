// Swipe Callbacks

// Dashboard swipe callback
function rightDashboardSwipeEvent(el, d) {

	// Swipe right will close dashboard
	if (d === "right") {
		slideDashboard();
	}
}

// Backgoune body swipe callback

function backgroundBodySwipeEvent(el, d) {

	// Swipe left will open dashboard
	if (d === 'left') {
		slideDashboard();
	}
}

swipeEvent('rightDashboard', rightDashboardSwipeEvent);

swipeEvent('backgroundBody', backgroundBodySwipeEvent);