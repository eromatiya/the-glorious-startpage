var profileContainer = document.getElementById("profileImageContainer");

let profileAnimRunning = false;

// Don't run animation on startup
profileContainer.style.webkitAnimationPlayState = "paused";

// Rotate profile
const rotateProfile = () => {
    event.preventDefault;

    // Remove anim class
    profileContainer.classList.remove('rotateProfileAnim');

    // Triggering reflow
    void profileContainer.offsetWidth;

    // Re-add animation class
    profileContainer.classList.add('rotateProfileAnim');

    // Start rotation animation
    profileContainer.style.webkitAnimationPlayState = "running";
    profileAnimRunning = true;
}

// Re-enable animation after death
profileContainer.addEventListener(
    "animationend", 
    (event) => {
        profileAnimRunning = false;
    }
);

// Animate/Show searchbox if profile container was clicked
profileContainer.onclick = () => {
    if (profileAnimRunning) return;

    // Rotate profile
	// rotateProfile();

    // Toggle search box
    toggleSearchBox();
};
