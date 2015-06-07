
$(document).ready(function(){
	var APIKey = 'DAK00068abf414f4e6fa818a123a1f3fd4d'; 
	var username, password, user_access_token;

	chrome.browserAction.setPopup({popup: "popup.html"});

	chrome.extension.onMessage.addListener(function(request, sender, response){
		//console.log('User: ' + request.username + ' Pass: ' + request.password + ' from: ' + request.from);

		if(request.from == 'popup'){
			username = request.username;
			password = request.password;

			var $audioRingIn = $('<audio>', { loop: 'loop', id: 'ring-in' });
	    	var $audioRingOut = $('<audio>', { loop: 'loop', id: 'ring-out' });
	      
		  	var audioSource = {
		    	ringIn: [
					      { src: 'https://kandy-portal.s3.amazonaws.com/public/sounds/ringin.mp3', type: 'audio/mp3' },
					      { src: 'https://kandy-portal.s3.amazonaws.com/public/sounds/ringin.ogg', type: 'audio/ogg' }
					    ],
					    ringOut: [
					      { src: 'https://kandy-portal.s3.amazonaws.com/public/sounds/ringout.mp3', type: 'audio/mp3' },
					      { src: 'https://kandy-portal.s3.amazonaws.com/public/sounds/ringout.ogg', type: 'audio/ogg' }]
		     };

		      audioSource.ringIn.forEach(function(entry) {
		        var $source = $('<source>').attr('src', entry.src);
		        $audioRingIn.append($source);
		      });
		      
		      audioSource.ringOut.forEach(function(entry) {
		        var $source = $('<source>').attr('src', entry.src);
		        $audioRingOut.append($source);
		      });

			kandy.setup({
				localVideoContainer: $("#videoBodyLocal")[0],
				remoteVideoContainer: $("#videoBodyRemote")[0],
				listeners: {
					loginsuccess: onLoginSuccess,
					loginfailed: onLoginFailed,
					callincoming: onCallIncoming,
					oncall: oncall,
		            callanswered: onCallAnswer,
		            callended: onCallTerminate,
		            callrejected: onCallRejected,
		            remotevideoinitialized:onRemoteVideoInitialized,
		            localvideoinitialized:onLocalVideoInitialized
				}
			});


		   /********** KANDY SETUP ********/

		  function onLoginSuccess(){
			console.log("=======> Login Success!");			  	
		  }

		  function onLoginFailed(){
			console.log("=======> Login Failed");
		  }

		  function onRemoteVideoInitialized(videoTag) {
  			$('#videoBodyRemote').append(videoTag);
		  }

		  function onLocalVideoInitialized(videoTag) {
  			$('#videoBodyLocal').append(videoTag);
		  }
		  function onCallIncoming(call, isAnonymous){
		  	console.log("=======> Incoming Call");

		  	$audioRingIn[0].play();

		  	callId = call.getId();
		  	console.log('Call Id = ' + callId);

		  	var noti_opt = {
					type: "basic",
					title: "Incoming Call!",
					message: "Click Here To Answer the Call!",
					iconUrl: "assets/icon-phone.ico"
				}

			chrome.notifications.create("incoming_call!", noti_opt, function(){});
			var details = {}

			chrome.notifications.onClicked.addListener(function(){
				
				chrome.tabs.create({'url': chrome.extension.getURL('index.html')}, function(){
					chrome.runtime.sendMessage({kandy:kandy,callId:callId},function (response){});			
				});

			});
		  	

		  	//chrome.tabs.create({'url': chrome.extension.getURL('index.html')});
		  	//localStorage["callId"] = call.getId();
		  }

		  function oncall(call){
		  	console.log('on call!');
		  	$audioRingOut[0].pause();
		  }

		  function onCallTerminate(call){
		  	console.log('call ended!!');
		  	callId = null;

	        $audioRingIn[0].pause();
	        $audioRingOut[0].pause();
		  }

		  function onCallAnswer(call){
		  	callId = call.getId();
		  	console.log("on call!!");
		  	
		  	$audioRingOut[0].pause();
	        $audioRingIn[0].pause();
		  }

		  function onCallAnsweredFailed(call){
		  	console.log('Call Answered Failed!!');
		  	callId = null;
		  }

		  function onCallRejected(){
		  	console.log('call Rejected!');
		  	callId = null;
		  	$audioRingIn[0].pause();
		  }

		   function onCallRejectFailed() {
	        console.debug('callrejectfailed');
	      }
	      if(request.from == 'index'){
	      	alert("HOLA MUNDO!!!");
	      }
		  kandy.login(APIKey, username, password, onLoginSuccess, onLoginFailed);	

		}
	});



	/*function receiveMessages(){
		console.log("MESSAGE ===>");
		KandyAPI.Phone.getIm(function(data){
			data.messages.forEach(function(msg){
				var username = msg.sender.user_id;
				var message = msg.message.text;
				var noti_opt = {
					type: "basic",
					title: "Incoming Message",
					message: message,
					iconUrl: "message.ico"
				}

				 if(msg.messageType == 'chat' && msg.contentType === 'text' && msg.message.mimeType == 'text/plain') {
				 	console.log("MESSAGE ===>" + message);
				 	chrome.notifications.create("incoming_message", noti_opt, function(){});			
				 }else{
				 	console.log('received ' + msg.messageType + ': ');
				 }

				//chrome.notifications.create("incoming_message", noti_opt, function(){});	
			})
		})
	}*/
});


function loadFile(filename){
	var file = document.createElement('script');
	file.setAttribute('type', 'text/javascript');
	file.setAttribute('src', filename);

	document.getElementsByTagName("head")[0].appendChild(file);

}