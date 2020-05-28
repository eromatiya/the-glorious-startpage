var dockContainer = document.getElementById('dockContainer');


var dockSites = [
{ site: 'Reddit', icon: 'reddit', url: 'https://reddit.com/'},
{ site: 'Github', icon: 'github', url: 'https://github.com/'},
{ site: 'Facebook', icon: 'facebook', url: 'https://facebook.com/'},
{ site: 'Gmail', icon: 'gmail', url: 'https://mail.google.com/'},
{ site: 'Youtube', icon: 'youtube', url: 'https://youtube.com/'},
{ site: 'GDrive', icon: 'gdrive', url: 'https://drive.google.com/'},
{ site: 'Twitter', icon: 'twitter', url: 'https://twitter.com/'},
{ site: 'Unsplash', icon: 'unsplash', url: 'https://unsplash.com/'},
{ site: 'Material.io', icon: 'materialio', url: 'https://material.io/'}
];


// Create mouse event for passed div
function addMouseUpEvent(li, url) {
    li.onmouseup = function() {
        window.location.href = encodeURI(url);
    }
}

// Generate button from user
function generateFromManual(id, icon,callback) {

    var customButtonCallback;

    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'button' + id;
    buttonContainer.className = 'buttonContainer';
    
    buttonContainer.onmouseup = callback;
    
    var buttonImage = document.createElement('div');
    buttonImage.id = 'buttonImage' + id;
    buttonImage.className = 'bottomButton';
    buttonImage.style.background = "url('assets/buttons/" + icon + ".svg')";
    buttonImage.style.backgroundSize = 'cover';

    buttonContainer.appendChild(buttonImage);
    dockContainer.appendChild(buttonContainer);
}

// Create callback event for onmouse up
function addCallbackEvent(element, callback) {
    element.onmouseup = callback;
}

// Generate buttons from array
function generateFromList() {

    // Create launcher button
    generateFromManual(
        'Launch',
        'launch', 
        function() {
            webMenuToggle();
        }
    );

    for (i = 0; i < (dockSites.length); i++) {

        var site = dockSites[i].site;
        var icon = dockSites[i].icon;
        var url = dockSites[i].url;

        var buttonContainer = document.createElement('div');
        buttonContainer.id = 'button' + i;
        buttonContainer.className = 'buttonContainer';
        addMouseUpEvent(buttonContainer, url);

        var buttonImage = document.createElement('div');
        buttonImage.id = 'buttonImage' + i;
        buttonImage.className = 'bottomButton';
        buttonImage.style.background = "url('assets/webcons/" + icon + ".svg')";
        buttonImage.style.backgroundSize = 'cover';

        // Append divs
        buttonContainer.appendChild(buttonImage);
        dockContainer.appendChild(buttonContainer);
    };

    // Create menu button
    generateFromManual(
        'Menu',
        'menu', 
        function() {
            if (webMenuVisible) {
                webMenuToggle();
            }
            slideDashboard()
        }
    );
}

window.onload =  generateFromList();

