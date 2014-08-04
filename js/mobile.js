function onDeviceReady() {
    // remember to install org.apache.cordova.statusbar
    // StatusBar.overlaysWebView(false);
	angular.element(document).ready(function() {
		angular.bootstrap(document);
	});
}
  
document.addEventListener('deviceready', this.onDeviceReady, false);

// PhoneGap is loaded and it is now safe to make calls PhoneGap methods

