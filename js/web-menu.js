var webMenu = document.getElementById("webMenu");
var webMenuList = document.getElementById("webMenuList");
var webMenuSearchBox = document.getElementById("webMenuSearchBox");

let webMenuVisible = false;

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
{ site: 'Office 365', icon: 'office365', url: 'https://office.com/'},

{ site: '4chan', icon: '4chan', url: 'https://4chan.org/'},
{ site: 'Discord', icon: 'discord', url: 'https://discord.com/'},
{ site: 'Spotify', icon: 'spotify', url: 'https://spotify.com/'},
{ site: 'Ebay', icon: 'ebay', url: 'https://ebay.com/'}
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
	// webItemDiv.tabIndex = '1';
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
function filterWebList() {
	var input, filter, ul, li, a, i, txtValue;
	
	input = webMenuSearchBox;
	filter = input.value.toUpperCase();
	li = webMenuList.getElementsByTagName('li');
	
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
}



webMenuSearchBox.onkeyup = function(event) {
	filterWebList();

	// if (webMenuVisible) {
	// 	scrollList();
	// }
}


function webMenuToggle() {

	hideMainContainer();
	webMenu.classList.toggle("show");
	rotateProfile();

	if (webMenuVisible) {
		// Clear searchbox
		webMenuSearchBox.value = '';
		filterWebList();
	} else {
		webMenuSearchBox.focus();
		// scrollList();
	}

	webMenuVisible = !webMenuVisible;
}

// function scrollList() {
// 	var list = document.getElementById('webMenuList');

//     // Get first child
//     var first = list.firstChild;
//     alert(first.firstChild);

//     var maininput = webMenuSearchBox;  // targets the input, which triggers the functions populating the list
//     webMenu.onkeydown = function(e) { // listen to keyboard events
//     switch (e.keyCode) {

//      	// Up key
//         case 38:
//         	if (document.activeElement == (maininput || first)) {
//         		// Stop if the focus is on the input or first element
//         		break;
//         	} else {
//         		// Select the element before the current, and focus it
//         		document.activeElement.parentNode.previousSibling.firstChild.focus();
//         	}
//         	alert('up');

//         	break;

//         // Down key
//         case 40:
//             // If the currently focused element is the main input --> focus the first <li>
//             if (document.activeElement == maininput) { 
//             	if (first.firstChild) { first.firstChild.focus(); }; 
//             } else {
//             	// Target the currently focused element -> <a>, go up a node -> <li>, select the next node, go down a node and focus it
//             	document.activeElement.parentNode.nextSibling.firstChild.focus();
//             }
//             alert('down');

//             break;
//         }
//     }
// }

var liSelected;
var index = -1;
let ul = document.getElementById("webMenuList");

function removeClass(el, className) {
	if(el.classList) {
		el.classList.remove(className);
	} else {
		el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	}
};

function addClass(el, className) {
	if(el.classList) {
		el.classList.add(className);
	} else {
		el.className += ' ' + className;
	}
};

webMenu.addEventListener(
	'keydown',
	function(event) {

		if (!webMenuVisible) { return; };

		var len = webMenuList.getElementsByTagName('li').length-1;

		if(event.which === 40) {
			// alert('40');
			index++;
			//down 
			if (liSelected) {
				removeClass(liSelected, 'selected');
				next = webMenuList.getElementsByTagName('li')[index];
				
				if(typeof next !== undefined && index <= len) {
					liSelected = next;
				} else {
					index = 0;
					liSelected = webMenuList.getElementsByTagName('li')[0];
				}

				addClass(liSelected, 'selected');

	            // Scroll into view
	            liSelected.scrollIntoView();
	            console.log(index);
	        } else {
	        	index = 0;

	        	liSelected = webMenuList.getElementsByTagName('li')[0];
	        	addClass(liSelected, 'selected');
	        }
	    } else if (event.which === 38) {
	    	if (liSelected) {
	    		removeClass(liSelected, 'selected');
	    		index--;
	    		console.log(index);
	    		next = webMenuList.getElementsByTagName('li')[index];

	    		if(typeof next !== undefined && index >= 0) {
	    			liSelected = next;
	    		} else {
	    			index = len;
	    			liSelected = webMenuList.getElementsByTagName('li')[len];
	    		}

				// Scroll into view
				liSelected.scrollIntoView();
				addClass(liSelected, 'selected');
			} else {
				index = 0;
				liSelected = webMenuList.getElementsByTagName('li')[len];
				addClass(liSelected, 'selected');
			}
		}
	}
);



// Keypress events
webMenu.onkeydown = function keydown (evt) { 
	if (!evt) evt = event; 


	if (webMenuVisible && evt.keyCode === 27) {
		webMenuToggle();
	}
}


