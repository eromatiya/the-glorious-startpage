"use strict";

var profileContainer = document.getElementById("profileContainer");

let profileRotating = false;

// Paused animation
profileContainer.style.webkitAnimationPlayState = "paused";

function rotateProfile() {
    event.preventDefault;

    // Remove anim class
    profileContainer.classList.remove('rotateProfile');

    // Triggering reflow
    void profileContainer.offsetWidth;

    // Re-add animation class
    profileContainer.classList.add('rotateProfile');

    profileContainer.style.webkitAnimationPlayState = "running";
    profileRotating = true;
}

function scaleProfile() {

}

// Reenable animation after death
profileContainer.addEventListener(
    "animationend", 
    function(event) {
        profileRotating = false;
    }
); 

// Animate/Show searchbox if profile container was clicked
profileContainer.onclick = function() {
	toggleSearchBox()
};
