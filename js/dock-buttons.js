let dock = document.getElementById('dock');

// Generate button from user
const generateFromManual = (id, icon, callback) => {

    let customButtonCallback;

    const dockButton = document.createElement('div');
    dockButton.id = 'button' + id;
    dockButton.className = 'dockButton';
    
    dockButton.onmouseup = callback;
    
    const buttonImage = document.createElement('div');
    buttonImage.id = 'buttonImage' + id;
    buttonImage.className = 'dockButtonImage';
    buttonImage.style.background = "url('assets/buttons/" + icon + ".svg')";
    buttonImage.style.backgroundSize = 'cover';

    dockButton.appendChild(buttonImage);
    dock.appendChild(dockButton);
}


// Generate buttons from array
const generateFromList = () => {

    for (let i = 0; i < (dockSites.length); i++) {

        const site = dockSites[i].site;
        const icon = dockSites[i].icon;
        const url = dockSites[i].url;

        // Create a href
        const aDock = document.createElement('a');
        aDock.className = 'dockLink';
        aDock.href = url;

        // Create div container
        const dockButton = document.createElement('div');
        dockButton.id = 'button' + i;
        dockButton.className = 'dockButton';

        // Create div container for button icon
        const buttonImage = document.createElement('div');
        buttonImage.id = 'buttonImage' + i;
        buttonImage.className = 'dockButtonImage';
        buttonImage.style.background = "url('assets/webcons/" + icon + ".svg')";
        buttonImage.style.backgroundSize = 'cover';

        // Append divs
        dockButton.appendChild(buttonImage);
        aDock.appendChild(dockButton);
        dock.appendChild(aDock);
    };
}

const populateDock = () => {
    
    // Create launcher button
    generateFromManual(
        'Launch',
        'launch', 
        () => {
            // Toggle web menu
            toggleWebMenu();
        }
    );

    // Create dock buttons fetched from sites-list.js
    generateFromList();

    // Create weather button
    generateFromManual(
        'Weather',
        'weather', 
        () => {
            // Toggle weather screen
            toggleWeatherScreen();
        }
    );

    // Create menu button
    generateFromManual(
        'Dashboard',
        'dashboard', 
        () => {
            // Toggle dashboard
            toggleDashboard();
        }
    );

}

// Populate dock
window.onload =  populateDock();

