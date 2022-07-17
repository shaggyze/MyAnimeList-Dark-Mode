document.head.insertAdjacentHTML('beforeend', '<div class="switch"><input class="switch__input" type="checkbox" id="themeSwitch"><label aria-hidden="true" class="switch__label" for="themeSwitch">On</label><div aria-hidden="true" class="switch__marker"></div></div>'); //Add Switch to MAL
(function() {
	// Theme switch
	var themeSwitch = document.getElementById('themeSwitch');
	if(themeSwitch) {
		initTheme(); // if user has already selected a specific theme -> apply it
		themeSwitch.addEventListener('change', function(event){
    	resetTheme(); // update color theme
    });

    function initTheme() {
    	var darkThemeSelected = (localStorage.getItem('themeSwitch') !== null && localStorage.getItem('themeSwitch') === 'dark');
    	// update checkbox
    	themeSwitch.checked = darkThemeSelected;
			// update body data-theme attribute
			darkThemeSelected ? document.body.setAttribute('data-theme', 'dark') : document.body.removeAttribute('data-theme');
    };

    function resetTheme() {
    	if(themeSwitch.checked) { // dark theme has been selected
    		document.body.setAttribute('data-theme', 'dark');
    		localStorage.setItem('themeSwitch', 'dark');
    	} else {
    		document.body.removeAttribute('data-theme');
    		localStorage.removeItem('themeSwitch');
    	} 
    };
	}
}());