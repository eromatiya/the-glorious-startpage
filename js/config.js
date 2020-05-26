// Change default settings in this JSON string:

let configJSON = '{"weather":{"appID":"N/A","cityID":"N/A","units":"imperial"},"searchEngine":"google"}';

// OpenWeatherMap API Key is not provided! Use your own!
// 		OpenWeatherMap is our weather provider. So go to OpenWeatherMap's website: https://home.openweathermap.org/
// 		Register, log-in, and then go to https://home.openweathermap.org/api_keys, to generate your very own API keys. 
// 		Units can be imperial or metric.

// SearchEngine can be google, duckduckgo or ecosia

// Parse configJSON
let configData = JSON.parse(configJSON);