$(document).ready(function(){
	$('#form-login').submit(function(e){
		e.preventDefault();

		var username = $("#txt_username").val();
	    var password = $("#txt_password").val();
		
		chrome.extension.sendMessage({from: 'popup',
									  username: username,
									  password: password});

	   /* var APIKey = 'DAK00068abf414f4e6fa818a123a1f3fd4d';
	    var username = $("#txt_username").val();
	    var password = $("#txt_password").val();
	    var UIState;

		KandyAPI.Phone.setup({
			listeners: {
				loginsuccess: onLoginSuccess,
				loginfailed: onLoginFailed,
				callincoming: onCallIncoming
			}
		});

		function onLoginSuccess(){
			console.log("==============");
			console.log("Login Succeed!! :-)");
  			//chrome.windows.create({'url': 'redirect.html', 'type': 'popup'}, function(window) {});
  			
  			//window.location.href="index.html";
  			//chrome.browserAction.setPopup({popup: "index.html"});
  			$('#context-container').css('display', 'block');
  			$('#form-login').css('display', 'none');

		}

		function onLoginFailed(){
			console.log("===============");
			console.log("Login failed!! :-(");	
		}

		function onCallIncoming(){
			console.log('Incoming Call!');
		}

		KandyAPI.Phone.login(APIKey, username, password);*/
	});
});