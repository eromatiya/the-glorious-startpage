var webMenu = document.getElementById("webMenu");
var webMenuList = document.getElementById("webMenuList");
var webMenuSearchBox = document.getElementById("webMenuSearchBox");

// Data
var webSites = [
{ site: 'Reddit', icon: 'reddit', url: 'https://redit.com/'},
{ site: 'Github', icon: 'github', url: 'https://github.com/'},
{ site: 'Facebook', icon: 'facebook', url: 'https://facebook.com/'},
{ site: 'Gmail', icon: 'gmail', url: 'https://mail.google.com/'},
{ site: 'Youtube', icon: 'youtube', url: 'https://youtube.com/'},
{ site: 'GDrive', icon: 'gdrive', url: 'https://drive.google.com/'},
{ site: 'Twitter', icon: 'twitter', url: 'https://twitter.com/'},
{ site: 'Instagram', icon: 'instagram', url: 'https://instagram.com/'},

{ site: 'Bitbucket', icon: 'bitbucket', url: 'https://bitbucket.org/'},
{ site: 'Gitlab', icon: 'gitlab', url: 'https://gitlab.com/'},
{ site: 'Deviantart', icon: 'deviantart', url: 'https://deviantart.com/'},
{ site: 'Duckduckgo', icon: 'duckduckgo', url: 'https://duckduckgo.com/'},
{ site: 'Ecosia', icon: 'ecosia', url: 'https://ecosia.org/'},
{ site: 'Google', icon: 'google', url: 'https://google.com/'},
{ site: 'Wikipedia', icon: 'wikipedia', url: 'https://wikipedia.org/'},
{ site: 'Unsplash', icon: 'unsplash', url: 'https://unsplash.com/'},

{ site: 'Twitch', icon: 'twitch', url: 'https://twitch.tv/'},
{ site: 'Yahoo', icon: 'yahoo', url: 'https://mail.yahoo.com/'},
{ site: 'Pornhub', icon: 'pornhub', url: 'https://pornhub.com/'},
{ site: 'Material.io', icon: 'materialio', url: 'https://material.io/'},
{ site: 'Netflix', icon: 'netflix', url: 'https://netflix.com/'},
{ site: 'Office 365', icon: 'office365', url: 'https://office.com/'}
];

// Create mouse event on passed div
function addMouseUpEvent(div, url) {
	div.onmouseup = function() {
		window.location.href = encodeURI(url);
	}
}

// Generate a list
for (i = 0; i < (webSites.length); i++) {

	var site = webSites[i].site;
	var icon = webSites[i].icon;
	var url = webSites[i].url;

	var li = document.createElement('li');

	// Create an outer div, child of li
	let webItemDiv = document.createElement('div')
	webItemDiv.className = 'webItem';
	webItemDiv.tabIndex = '0';
	webItemDiv.id = "id" + site;
	
	// Add mouseup event
	addMouseUpEvent(webItemDiv, url);

	// Create a second div, webItemContainer
	var webItemContainer = document.createElement('div');
	webItemContainer.className = 'webItemContainer';

	// Create the innermost div, contains icon and label
	var webItemBody = document.createElement('div');
	webItemBody.className = 'webItemBody';

	// Create div for webItemIcon
	var webItemIcon = document.createElement('div');
	webItemIcon.className = 'webItemIcon';
	webItemIcon.style.background = "url('assets/webcons/" + icon + ".svg')";
	webItemIcon.style.backgroundSize = 'cover';

	// Create webItemName
	var webItemName = document.createElement('div');
	webItemName.className = 'webItemName';
	webItemName.innerHTML = site;

	// Append divs with heirarchy
	webItemDiv.appendChild(webItemContainer);
	webItemContainer.appendChild(webItemBody);

	webItemBody.appendChild(webItemIcon);
	webItemBody.appendChild(webItemName);

	li.appendChild(webItemDiv);
	webMenuList.appendChild(li);
}

let firstEntry;

// Search through the list
webMenuSearchBox.onkeyup = function(event) {
	// Declare variables
	var input, filter, ul, li, a, i, txtValue;
	input = webMenuSearchBox;
	filter = input.value.toUpperCase();
	ul = webMenuList;
	li = ul.getElementsByTagName('li');
	
	// Loop through all list items, and hide those who don't match the search query
	for (i = 0; i < li.length; i++) {
		a = li[i].getElementsByClassName("webItem")[0];
		txtValue = a.innerHTML || a.textContent || a.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			// Filtered tile/s
			li[i].style.display = "";
			firstEntry = li[i];
		} else {
			// Hidden tile/s
			li[i].style.display = "none";
		}
	}


	scrollList();
}


function webMenuLaunch() {
	// alert('123');
	hideMainContainer();
	webMenu.classList.toggle("show");
	rotateProfile();
}




// function scrollList() {
// 	var list = document.getElementById('webMenuList');
     
//      // Get first child
//      var first = list.firstChild;


//      var maininput = webMenuSearchBox;  // targets the input, which triggers the functions populating the list
//      document.onkeydown = function(e) { // listen to keyboard events
//      switch (e.keyCode) {

//      	// Up key
//         case 38:
//         	if (document.activeElement == (maininput || first)) { break; } // stop the script if the focus is on the input or first element
//             else { document.activeElement.parentNode.previousSibling.firstChild.focus(); } // select the element before the current, and focus it
//             break;

//         // Down key
//         case 40:
//             if (document.activeElement == maininput) { first.firstChild.focus(); } // if the currently focused element is the main input --> focus the first <li>
//             else { document.activeElement.parentNode.nextSibling.firstChild.focus(); } // target the currently focused element -> <a>, go up a node -> <li>, select the next node, go down a node and focus it
//             break;
//         }
//     }
// }

