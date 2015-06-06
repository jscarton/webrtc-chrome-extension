
$(function(){
	

	$('#btnAnswer').on('click', function(){
		chrome.extension.sendMessage({
			from: 'index'
		});
	});
});