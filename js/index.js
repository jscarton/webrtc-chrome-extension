var kandyx,callIdx;
$(document).ready(function(){
	chrome.runtime.onMessage.addListener(
  		function(req, sender, sendResponse) {
  			if (req.kandy) {
  				alert("entro aqui 2");
  				kandyx=req.kandy;
  				apikey=req.apikey
			    username=req.username;
			    password=req.password;
			    callIdx=req.callId;
  			}
		}
	);

	$('#btnAnswer').on('click', function(){
		alert("entra aqui"+callIdx);
		console.log("Answering call with ID:"+callIdx);
		kandyx.phone.answerCall(callIdx, false);
	});
});