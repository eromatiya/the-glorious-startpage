var ul = document.getElementById("webMenuList");

var webSites = [
	'Youtube', 
	'Google',
	'Google',
	'Google',
	'Google',
	'Google',
	'Google',
	'Google',
	'Google',
	'Google',
	'Google',
	'Google',
	'Google',
	'Google',
	'Google',
	'Google',
	'Google',
	'Google',
];

for (let site of webSites) {
	var name = site;

	var li = document.createElement('li');

	// Create an outer div, child of li
	var webItem = document.createElement('div')
	webItem.className = 'webItem';

	// Create a second div, webItemContainer
	var webItemContainer = document.createElement('div');
	webItemContainer.className = 'webItemContainer';


	// Create the innermost div, contains icon and label
	var webItemBody = document.createElement('div');
	webItemBody.className = 'webItemBody';

	// Create div for webItemIcon
	var webItemIcon = document.createElement('div');
	webItemIcon.className = 'webItemIcon';

	// Create webItemName
	var webItemName = document.createElement('div');
	webItemName.className = 'webItemName';
	webItemName.innerHTML = name;
		    
	// Append divs with heirarchy
	webItem.appendChild(webItemContainer);
	webItemContainer.appendChild(webItemBody);

	webItemBody.appendChild(webItemIcon);
	webItemBody.appendChild(webItemName);

	li.appendChild(webItem);
	ul.appendChild(li);
}