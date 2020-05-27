// Manage buttons

function openSite(url) {
    // Open website in new tab
    window.open(encodeURI(url));
};

// Button click events

// Launch search bar
document.getElementById('button0').onclick = function() {
    webMenuLaunch();
};
// Reddit
document.getElementById('button1').onclick = function() {
    openSite('https://reddit.com');
};
// Github
document.getElementById('button2').onclick = function() {
    openSite('https://github.com');
};
// Facebook
document.getElementById('button3').onclick = function() {
    openSite('https://facebook.com');
};
// Gmail
document.getElementById('button4').onclick = function() {
    openSite('https://mail.google.com');
};
// YT
document.getElementById('button5').onclick = function() {
    openSite('https://youtube.com');
};
// Gdrive
document.getElementById('button6').onclick = function() {
    openSite('https://drive.google.com');
};
// Twitter
document.getElementById('button7').onclick = function() {
    openSite('https://twitter.com');
};
// Instagram
document.getElementById('button8').onclick = function() {
    openSite('https://instagram.com');
};
// Instagram
document.getElementById('button9').onclick = function() {
    slideDashboard()
};