## A bloated and modern-looking startpage

[![maintained](https://img.shields.io/maintenance/yes/2020?label=maintained&style=flat-square)](https://github.com/manilarome/the-glorious-startpage/commits/master) [![contributions](https://img.shields.io/badge/contribution-welcome-brightgreen&?style=flat-square)](https://github.com/manilarome/the-glorious-startpage/pulls) [![HitCount](http://hits.dwyl.com/manilarome/the-glorious-startpage.svg)](http://hits.dwyl.com/manilarome/the-glorious-startpage) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/d942895baf48442d8c9df54306887aa0)](https://www.codacy.com/manual/manilarome/the-glorious-startpage?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=manilarome/the-glorious-startpage&amp;utm_campaign=Badge_Grade)

## [Live Preview](https://manilarome.github.io/the-glorious-startpage/)

## Gallery

<div align='center'>
	<h3>
		<img src='/scrots/idle.png' align='center'>
	</h3>
</div>


| Search Autosuggestion | Settings |
| --- | --- |
| ![screenshot](/scrots/autosuggestion.png) | ![screenshot](/scrots/settings.png) |

| Web Menu | Weather Forecast |
| --- | --- |
| ![screenshot](/scrots/webmenu.png) | ![screenshot](/scrots/weather.png) |


## Features

+ Responsive UI
+ Web Search Suggestions
+ Mobile Support with Swipe Gestures
+ Theme Settings - Change colors on-the-fly
+ Weather Forecast - OpenWeatherMap and Geolocation Integration
+ Search Engine Selection
+ Dynamic Background
+ Web Menu with Fuzzy Search
+ Keyboard Navigation
+ Vanilla Javascript!
+ And many bugs!

## Keybindings

+ <kbd>alt + S</kbd> - toggles dashboard
+ <kbd>alt + E</kbd> - toggles web menu
+ <kbd>alt + X</kbd> - toggles weather screen
+ <kbd>Escape</kbd> - close panels/toggles web menu
+ <kbd>Backspace</kbd> - toggles search box

## Swipe gestures

+ <kbd>swipe right</kbd> - opens web menu
+ <kbd>swipe left</kbd> - opens dashboard
+ <kbd>swipe up</kbd> - opens weather screen
+ <kbd>swipe down</kbd> - opens search box

## Quick search

+ `r/` + `subreddit name` will open the subreddit.
+ `w/` + `search query` to search in wikipedia.
+ `u/` + `search query` to search for an image/photo in unsplash.
+ `a/` + `search query` to search a product in amazon.
+ `e/` + `search query` to search a product in ebay.
+ `y/` + `search query` to search a video in youtube.
+ `n/` + `comic id` to search a "comic" in a certain "comic" website.

## Customization and Settings

#### Changing the colors, blur strength, and animation speed on-the-fly

+ Open the dashboard by clicking the settings button on the dock.
+ Change the color and blur strength by setting it on the `Theme Engine` section.
+ Color settings supports `#RGB`, `#RRGGBB`, and `#RRGGBBAA`.
+ Blur strength settings only allows integer with `px` suffix.
+ Animation speed supports `s` and `ms`. 

#### Adding more buttons on the web menu

Add more buttons or web shortcuts in web menu by editing the `webSites` array in `js/config.js`. Make sure to put an icon with `svg` format for the shortcut in `assets/webcons/` folder. 

```js
const webSites = [
	{
		site: 'Reddit',
		icon: 'reddit',
		url: 'https://reddit.com/',
		category: 'social'
	},
	...
]
```

#### Adding more buttons on the dock

To add more web shortcuts/buttons in the dock, you have to edit the `dockSites` array in `js/config.js`. Make sure to put an icon with `svg` format for the shortcut in `assets/webcons/` folder.

```js
const dockSites = [
	{
		site: 'Reddit',
		icon: 'reddit',
		url: 'https://reddit.com/'
	},
	...
]
```

#### Adding more search engine in selection

Add more search engine in selection by editing the `searchEngines` object in `js/config.js`. Make sure to follow the format below:

```js
const searchEngines = {
	'duckduckgo': {
		name: 'Duckduckgo',
		prefix: 'https://duckduckgo.com/?q='
	},
	...
}
```

#### Adding more quick search urls

Add more quick search shortcuts by editing the `quickSearchData` object in `js/config.js`. Make sure to follow the format below:

```js
const quickSearchData = {
	'r/': {
		urlPrefix: 'https://reddit.com/r/'
	},
	...
```

#### Set your OpenWeatherMap API key

Setting up your OpenWeatherMap credential is a breeze. 

+ If you don't have an API key, follow this guide:

	How to get a credentials for the weather forecast?

	- OpenWeatherMap is the weather provider, so go to OpenWeatherMap's [website](https://home.openweathermap.org/).
	- Register, log-in, and then go [here](https://home.openweathermap.org/api_keys) to generate your very own API keys.

+ After this you can choose two locator modes - `Geolocation` and `City`.
+ In City Mode, you have to get your City ID in OpenWeatherMap website.
+ While `Geolocation` mode offers GPS tracking. You don't need to get an ID. Note that you must allow the location permission request.
+ Put your API key in the `Weather Settings`.
+ It's recommended to still put your City ID if you plan to use the `geolocation` mode.
+ Apply.

**Note:**

+ If you're using firefox and you're planning to use the `geolocation`, make sure to set the value of `geo.provider.network.url` to `https://location.services.mozilla.com/v1/geolocate?key=test` in `about:config`. *Google changed its policies, so now it requires a valid API key when accessing their geolocation service. This tells us that you need a valid API key in place of* `%GOOGLE_LOCATION_SERVICE_API_KEY%`. <sup>[Citation](https://stackoverflow.com/questions/61032115/unknown-error-acquiring-position-geolocationpositionerror-code-2-firefox-linux).</sup>

+ If you're on mobile, make sure to enable your GPS and allow the location permission if you want to use `geolocation`.

+ If you just set the startpage locally, the location permission will always pop-up even if you already accept/denied it. It's better to run it on a web server.


#### Changing the default search engine

Google is the default search engine of the search bar, if you want to change it to DuckDuckGo or something:

+ Open the dashboard by clicking the settings button on the dock.
+ Find the `Search Engine` section and select your preferred search engine.
+ Set it as default.

#### Changing the profile picture

+ Replace the `user.png` image file in `assets/`.

#### Changing the background image

The background image changes based on time.

+ Change the background images in `assets/backgrounds/`.
+ Make sure that it is in a `webp` format. 
+ A lower resolution of each images are also required.

#### Keybindings

+ You can add, replace, or remove a keybinding by editing `js/keybindings.js`.

### Important Note

+ Make sure that javascript is enabled!

+ If you're using `NoScript` and `Dark Mode Reader` extensions make sure to disable them on the starpage! NoScript will disable javascript making this startpage useless. While, Dark Mode Reader will change the ligher CSS colors to dark, ruining the design.

+ If you're using firefox and blur effect is not enabled, open `about:config`, accept the risks, find `layout.css.backdrop-filter.enabled`, and set it to true to enable it. Refresh the startpage.

+ If you're using firefox and planning to use the geolocation, set the value of `geo.provider.network.url` to `https://location.services.mozilla.com/v1/geolocate?key=test` in `about:config`.

+ The code could be better, this is my first time writing a startpage from the ground up. I will improve this from time to time.

+ Found a bug, error or do you have a suggestion? Feel free to open an issue or pull request.

+ Tested only on Firefox and Google Chrome.

### TODO

- [x] GUI Settings  
- [x] Weather Forecast  
- [x] Dynamic Background   
- [x] Cleaner code<sup>WIP</sup>  
- [x] Keyboard navigation  
- [x] Swipe gestures for mobile  