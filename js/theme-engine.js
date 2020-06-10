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

	_saveDefaultCSS = () => {

		const origBaseBG = this._localStorage.getItem('origBaseBG');
		const origBaseColor = this._localStorage.getItem('origBaseColor');
		const origBlurStrength = this._localStorage.getItem('origBlurStrength');
		const origAnimSpeed = this._localStorage.getItem('origAnimSpeed');
		
		if ((origBaseBG === null) || (origBaseColor === null) || (origBlurStrength === null) || (origAnimSpeed === null)) {

			this._localStorage.setItem(
				'origBaseBG',
				window.getComputedStyle(document.documentElement).getPropertyValue('--base-bg')
			);
			this._localStorage.setItem(
				'origBaseColor',
				window.getComputedStyle(document.documentElement).getPropertyValue('--base-color')
			);
			this._localStorage.setItem(
				'origBlurStrength',
				window.getComputedStyle(document.documentElement).getPropertyValue('--blur-strength')
			);
			this._localStorage.setItem(
				'origAnimSpeed',
				window.getComputedStyle(document.documentElement).getPropertyValue('--transition-speed')
			);
		}
	}

	_checkColorValidity = colorStr => {

		// Check if RGBA - (#RRGGBBAA)
		const colorRGBA = /^#[0-9A-F]{8}$/i.test(colorStr);

		// If not RGBA
		if (!colorRGBA) {

			// If RGB - (#RRGGBB)
			if (/^#([0-9A-F]{3}){1,2}$/i.test(colorStr)) {
				
				// Add completely opaque alpha
				return colorStr + 'FF';
			
			// If three-charactered HEX color - (#RGB)
			} else if (/^#([0-9A-F]{3}){1,2}$/i.test(colorStr)) {

				// Convert it to RRGGBB
				return colorStr.replace(/^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/, '#$1$1$2$2$3$3');

			// If three-charactered HEX Color(#RGB) with AA - (#RGBAA)
			} else if (colorStr.length === 6) {

				const bg = colorStr.slice(0, -2);
				const op = colorStr.slice(-2);

				return bg.replace(/^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/, '#$1$1$2$2$3$3') + op;

			} else {
				alert('Invalid color');
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

	_processTheme = () => {

		// Retrieve custom colors
		let baseBG = this._localStorage.getItem('baseBG');
		let baseColor = this._localStorage.getItem('baseColor');
		let blurStrength = this._localStorage.getItem('blurStrength');
		let animSpeed = this._localStorage.getItem('animSpeed');

		// If custom color doesn't exist, use the value in CSS
		if (baseBG === null) {
			baseBG = this._localStorage.getItem('origBaseBG');
		}

		if (baseColor === null) {
			baseColor = this._localStorage.getItem('origBaseColor');
		}

		if (blurStrength === null) {
			blurStrength = this._localStorage.getItem('origBlurStrength');
		}

		if (animSpeed === null) {
			animSpeed = this._localStorage.getItem('origAnimSpeed');
		}

		// Remove whitespace
		baseBG = baseBG.replace(/ /g,'');
		baseColor = baseColor.replace(/ /g,'');
		blurStrength = blurStrength.replace(/ /g,'');
		animSpeed = animSpeed.replace(/ /g,'');

		// Check validity
		baseBG = this._checkColorValidity(baseBG);
		baseColor = this._checkColorValidity(baseColor);

		// Slice to separate RGB and A of background color
		// Slice alpha out
		const backgroundColor = baseBG.slice(0, -2);
		// Get alpha
		const backgroundOpacity = baseBG.slice(-2);


		// Slice to separate RGB and A of foreground color		
		// Slice alpha out
		const foregroundColor = baseColor.slice(0, -2);
		// Get alpha
		const foregroundOpacity = baseColor.slice(-2);

		this._updateTextBoxValues(
			backgroundColor,
			backgroundOpacity,
			foregroundColor,
			foregroundOpacity,
			blurStrength,
			animSpeed
		)
	}

	_updateCSSconstiables = () => {

		// Get value from input fields
		const background = (this._backgroundTextBox.value || this._backgroundTextBox.placeholder) +
			(this._backgroundOpacityTextBox.value || this._backgroundOpacityTextBox.placeholder);

		const foreground = (this._foregroundTextBox.value || this._foregroundTextBox.placeholder) +
			(this._foregroundOpacityTextBox.value || this._foregroundOpacityTextBox.placeholder);
		
		const blurPower = (this._blurTextBox.value || this._blurTextBox.placeholder);

		const animSpeed = (this._animSpeedTextBox.value || this._animSpeedTextBox.placeholder);

		// Check color validity
		const bgColor = this._checkColorValidity(background);
		const fgColor = this._checkColorValidity(foreground);

		// Change CSS colors
		document.documentElement.style.setProperty('--base-bg', bgColor);
		document.documentElement.style.setProperty('--base-color', fgColor);
		document.documentElement.style.setProperty('--blur-strength', blurPower);
		document.documentElement.style.setProperty('--transition-speed', animSpeed);

		// Save custom color
		this._localStorage.setItem('baseBG', bgColor);
		this._localStorage.setItem('baseColor', fgColor);
		this._localStorage.setItem('blurStrength', blurPower);
		this._localStorage.setItem('animSpeed', animSpeed);

		this._processTheme();
	}

	_applyOnClickEvent = e => {
		this._updateCSSconstiables();
		alert('Success!');
	}

	_registerApplyOnClickEvent = () => {
		this._applyTheme.onclick = this._applyOnClickEvent;
	}

	_resetOnClickEvent = e => {
		this._localStorage.removeItem('baseBG');
		this._localStorage.removeItem('baseColor');
		this._localStorage.removeItem('blurStrength');
		this._localStorage.removeItem('animSpeed');

		this._saveDefaultCSS();
		this._processTheme();
		this._updateCSSconstiables();
		
		alert('Success!');
	}

	_registerResetOnClickEvent = () => {
		this._resetTheme.onclick = this._resetOnClickEvent;
	}

	_init = () => {

		this._saveDefaultCSS();

		// Update
		this._processTheme();
		// Update settings
		this._updateCSSconstiables();

		this._registerApplyOnClickEvent();
		this._registerResetOnClickEvent();
	}

}