// Swipe Callbacks

// Dashboard swipe callback
function rightDashboardSwipeEvent(el, d) {

	// Swipe right will close dashboard
	if (d === "right") {
		slideDashboard();
	}
}

// Backgound body swipe callback
function backgroundBodySwipeEvent(el, d) {

	// Swipe left will open dashboard
	if (d === 'left') {
		slideDashboard();
	} else if (d === 'down') {
		// Swiping down will open search box
		toggleSearchBox();
	}
}

// Blur overlay swipe event
function blurOverlaySwipeEvent(el, d) {

	// Swiping up will close search box
	if (d === 'up') {
		toggleSearchBox();
	}
}

swipeEvent('rightDashboard', rightDashboardSwipeEvent);

swipeEvent('backgroundBody', backgroundBodySwipeEvent);

swipeEvent('blurOverlay', blurOverlaySwipeEvent);