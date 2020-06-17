class ThemeEngine {
	
	constructor() {
		this._localStorage = window.localStorage;

		this._backgroundTextBox = document.querySelector('#backgroundSet');
		this._backgroundOpacityTextBox = document.querySelector('#backgroundOpacitySet');
		this._foregroundTextBox = document.querySelector('#foregroundSet');
		this._foregroundOpacityTextBox = document.querySelector('#foregroundOpacitySet');

		this._blurTextBox = document.querySelector('#blurSet');
		this._animSpeedTextBox = document.querySelector('#animSpeedSet');
		this._applyTheme = document.querySelector('#themeEngineAsDefault');
		this._resetTheme = document.querySelector('#themeEngineReset');

		this._init();
	}

	// Get CSS variable value
	_getCSSProperty = variable => {
		return window.getComputedStyle(document.documentElement).getPropertyValue(String(variable));
	}

	// Get localStorage item value
	_getStorageItem = item => {
		return this._localStorage.getItem(String(item));
	}

	// Set localStorage item value
	_setStorageItem = (item, value) => {
		this._localStorage.setItem(
			String(item),
			this._getCSSProperty(String(value))
		)
	}

	// Set/Save original CSS Value, useful when reseting theme engine
	_saveOriginalDefaultCSS = () => {

		// Check original default CSS values
		const defaultValues = {
			'origBaseBG': {
				value: this._getStorageItem('origBaseBG'),
				cssVariable: '--base-bg'
			},
			'origBaseColor': {
				value: this._getStorageItem('origBaseColor'),
				cssVariable: '--base-color'
			},
			'origBlurStrength': {
				value: this._getStorageItem('origBlurStrength'),
				cssVariable: '--blur-strength'
			},
			'origAnimSpeed': {
				value: this._getStorageItem('origAnimSpeed'),
				cssVariable: '--transition-speed'
			}
		}

		// If original css variable has has no value, set it
		Object.keys(defaultValues)
		.forEach(item => {
			const itemName = item;
			const itemValue = defaultValues[String(item)].value;

			// If value is null, set
			if (!itemValue) {
				this._setStorageItem(itemName, defaultValues[String(item)].cssVariable);
			}
		});
	}

	_invalidColor = () => {
		alert('Invalid color');
	}

	_checkColorValidity = colorStr => {

		// Check if RGBA - (#RRGGBBAA)
		const colorRGBA = /^#[0-9A-F]{8}$/i.test(colorStr);

		// If not RGBA
		if (!colorRGBA) {

			// If RGB - (#RRGGBB)
			if (/^#[0-9A-F]{3}$/i.test(colorStr)) {
				
				// Add completely opaque alpha
				return colorStr + 'FF';
			
			// If three-charactered HEX color - (#RGB)
			// I feel that this is never used lol
			} else if (/^#[0-9A-F]{3}$/i.test(colorStr)) {

				// Convert it to RRGGBB
				return colorStr.replace(/^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/, '#$1$1$2$2$3$3');

			// If three-charactered HEX Color(#RGB) with AA - (#RGBAA)
			} else if (colorStr.length === 6) {

				const bg = colorStr.slice(0, -2);
				const op = colorStr.slice(-2);

				return bg.replace(/^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/, '#$1$1$2$2$3$3') + op;

			} else {
				this._invalidColor();
				return;
			}
		}

		// It's RGBA and a valid color so just return it
		return colorStr;
	}

	_updateTextBoxValues = (bgColor, bgOpacity, fgColor, fgOpacity, blurPower, animSpeed) => {

		// Set placeholders
		this._backgroundTextBox.value = '';
		this._backgroundTextBox.placeholder = bgColor;

		this._backgroundOpacityTextBox.value = '';
		this._backgroundOpacityTextBox.placeholder = bgOpacity;

		this._foregroundTextBox.value = '';
		this._foregroundTextBox.placeholder = fgColor;
		this._foregroundOpacityTextBox.value = '';
		this._foregroundOpacityTextBox.placeholder = fgOpacity;

		this._blurTextBox.value = '';
		this._blurTextBox.placeholder = blurPower;

		this._animSpeedTextBox.value = '';
		this._animSpeedTextBox.placeholder = animSpeed;

	}

	// Get/Update current css value
	_getCurrentCSSValues = () => {

		// Retrieve current css values
		let currentValues = {
			'baseBG': {
				value: this._getStorageItem('baseBG'),
				origVariable: 'origBaseBG'
			},
			'baseColor': {
				value: this._getStorageItem('baseColor'),
				origVariable: 'origBaseColor'
			},
			'blurStrength': {
				value: this._getStorageItem('blurStrength'),
				origVariable: 'origBlurStrength'
			},
			'animSpeed': {
				value: this._getStorageItem('animSpeed'),
				origVariable: 'origAnimSpeed'
			}
		}

		// If current css variable has has no value, set it
		Object.keys(currentValues)
		.forEach(key => {
			const cssVar = key;
			const cssValue = currentValues[String(cssVar)].value;

			// If value is null, set
			if (!cssValue) {
				currentValues[String(cssVar)].value = this._getStorageItem(currentValues[String(cssVar)].origVariable);
			}
		});
	}




	// _applyOnClickEvent = e => {
	// 	// this._updateCSSVariables();
	// 	alert('Success!');
	// }

	// _registerApplyOnClickEvent = () => {
	// 	this._applyTheme.onclick = this._applyOnClickEvent;
	// }

	// _resetOnClickEvent = e => {
	// 	this._localStorage.removeItem('baseBG');
	// 	this._localStorage.removeItem('baseColor');
	// 	this._localStorage.removeItem('blurStrength');
	// 	this._localStorage.removeItem('animSpeed');

	// 	// this._saveOriginalDefaultCSS();
	// 	// this._processTheme();
	// 	// this._updateCSSVariables();
		
	// 	alert('Success!');
	// }

	// _registerResetOnClickEvent = () => {
	// 	this._resetTheme.onclick = this._resetOnClickEvent;
	// }

	_init = () => {

		this._saveOriginalDefaultCSS();

		// Update
		// this._processTheme();
		// Update settings
		// this._updateCSSVariables();

		// this._registerApplyOnClickEvent();
		// this._registerResetOnClickEvent();
	}

}