
// This uses require.js to structure javascript:
// http://requirejs.org/docs/api.html#define

define(function(require){

	// Grab the output and run the identified test.
	var output = document.getElementById("output");
	var btn = document.getElementById("btn");
	
	if (!btn) return;
	
	btn.onclick = function(){
		runTest();
	};
	

	function runTest(){
		var test = btn.getAttribute("data-main").toString();	
		switch(test){
			case "xhr-local":
				test_xhr_local();
			break;
			case "xhr-remote":
				test_xhr_remote();
			break;
			case "jsonp-local":
				test_jsonp_local();
			break;
			case "jsonp-remote":
				test_jsonp_remote();
			break;
		};
	};
	
	
	function log(str){
		console.log(str);
		var tnode = document.createElement("div");
		tnode.innerHTML = str;
		output.appendChild(tnode);
	};
	
	
	function test_xhr_local(){
		var xhr = createXHR("local-data.txt", "json");
		xhr.send();
	};
	
	
	function test_xhr_remote(){
		var url = "http://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=aerych&count=1";
		var xhr = createXHR(url, "json");
		xhr.send();		
	};
	
	
	function test_jsonp_local(){
		if(!window.jsonpcallback) {
			window.jsonpcallback = jsonpcallback;
		};
		
		loadjsonp("jsonp-data.js");
	};
	
	
	function test_jsonp_remote(){
		if(!window.jsonpcallback) {
			window.jsonpcallback = jsonpcallback;
		};
			
		var query = escape('select item from weather.forecast where woeid=2480894');
        var url = ("http://query.yahooapis.com/v1/public/yql?q=" +
                   query +
                   "&format=json&callback=jsonpcallback");
		loadjsonp(url);
	};
	
	
	function createXHR(url, format){
		var xhr = XMLHttpRequest({mozSystem: true});
		
		xhr.open("GET", url, true);
				
		if(format){
			xhr.responseType = format;
		};
		
		xhr.onreadystatechange = function(){
			log("onreadystatechange: " + xhr.readyState);
		};
		
		xhr.onload = function(){
			log("onload: status is " + xhr.status);
		};
		
		xhr.onerror = function(e){
			log("onerror: " + e.toString());
			log("ERROR");
		};

		xhr.onloadend = function(){
			log("onloadend");
			if(xhr.response){
				log("response: " + xhr.response.toString());
				log("SUCCESS");
			} else {
				log("no response");
				log("FAILED");
			};
		};
		
		return xhr;
	};
	
	
	function loadjsonp(url) {
		log("loadjsponp: url = " + url);
		var s = document.createElement('script');
		s.setAttribute('src',url);
		document.getElementsByTagName('head')[0].appendChild(s);
	};
	
	
	function jsonpcallback(data){
		log("jsonpcallback");
		log(data.toString());
		log("SUCCESS");
	};
});

