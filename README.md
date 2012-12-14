# Firefox OS Tester

A simple harness for Firefox OS features in a packaged app, based on the [mortar-app-stub](https://github.com/mozilla/mortar-app-stub).


## To use the Tester:
1. Clone or download a zip of the repo. 
2. Download the Firefox OS Simulator, an addon for the Firefox browser, from [https://addons.mozilla.org/en-US/firefox/addon/firefox-os-simulator/](https://addons.mozilla.org/en-US/firefox/addon/firefox-os-simulator/)
3. Launch the Simulator from the (OS X) Tools > Web Developer > Firefox OS Simulator menu.
4. Click Add Directory, browse to the manifest.webapp, and choose open. 


## Tests:

There are currently four tests: two test loading external data via xhr, and two via jsonp. 

It appears that jsonp is blocked by the default content security policy (CSP) for packaged apps. 
XHR requests may require CORS, but I haven't found documentation on this, and it seems like CORS should be unnecessary for a packaged app.


## Notes:

[Documentation for manifests](https://marketplace.firefox.com/developers/docs/manifests) says that you should use network-http and network-tcp but the source code only has systemXHR. 
For an example see: [https://github.com/mozilla-b2g/gaia/blob/master/apps/communications/manifest.webapp](https://github.com/mozilla-b2g/gaia/blob/master/apps/communications/manifest.webapp)
