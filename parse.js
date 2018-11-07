$(document).ready(function() {
	 $("#submit").click(function() {
		 var textValue = $("#mainArea").val();
		 	$("#text").text(textValue);
	 });
	 
	 $("#mainArea").keydown(function(e) {
			if(e.keyCode == 13) {
				$("#submit").click();
			}
	 });
});

function parseParagraph(para) {
	
}