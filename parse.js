let fillerWords = ["and"];
let punctuationList = [".","?","!",";",",",":",];
let moneyIndices = [];
let textIndices = [];

function updateText() {
	$("#text").text(scaleMoney(parseParagraph($("#mainArea").val()),Math.pow(2,parseInt($("#myRange").val())/2)));
}

$(document).ready(function() {
	 $("#submit").click(function() {
		let textValue = $("#mainArea").val();
		textValue = parseParagraph(textValue);
		findMoney(textValue);
		$("#text").text(textValue);
	 });
	 
	 $("#myRange").click(function() {
		 window.setInterval(updateText,200);
	 });
	 
	 
	 $("#mainArea").keydown(function(e) {
			if(e.keyCode == 13) {
				$("#submit").click();
			}
	 });
});

function scaleMoney(para,scale) {
	para = prePara(para).split(" ");
	for(index of moneyIndices) {
		console.log(index);
		console.log(textIndices);
		para[index] = Math.round(parseInt(para[index])*scale).toString();
		if (textIndices.includes(index)) {
			console.log("HERE");
			para[index] = numToWords(parseInt(para[index]));
		}
	}

	para = postPara(para.join(" "));
	
	return para;
}

function findMoney(para) {
	moneyIndices = [];
	
	word = parseParagraph(prePara(para)).split(" ");
	moneyWords = ["$","dollar","dollars","cents","cent"];
				
	for(let i = 0;i<word.length;i++) {
		if(word[i].length>0 && !isNaN(word[i])) {
			let distanceFront = -1;
			let distanceBack = -1;
			
			let j = i+1;
			while(j<word.length && !(moneyWords.includes(word[j]))) {
				j+=1;
			}
			
			if(j != para.length) {
				distanceFront = j-i;
			}
			else {
				distanceFront = -1;
			}
			
			j = i-1;
			while(j>=0 && !(moneyWords.includes(word[j]))) {
				j-=1;
			}
			
			if(j>=0) {
				distanceBack = i-j;	
			}
			else {
				distanceBack = -1;
			}
						
			let minDistance = Math.min(distanceFront,distanceBack);
			
			if(distanceFront<=2 && distanceFront>=0 || distanceBack<=2 && distanceBack>=0) {
				moneyIndices.push(i);
			}	
		}
	}
}

function replaceAll(string, target, replacement) {
	return string.split(target).join(replacement)
}

function prePara(para) {
	/* This does some preprocessing for the para
		Like replaces $ with $_, etc. 
		*/
		
	para = replaceAll(para,"\n","");
	para = replaceAll(para,"\t","");
		
	// Turn things like $59 to $ 59 
	para = replaceAll(para,"$"," $ ");
	para = replaceAll(para, "-"," - ");
		
	// Turn punctuations like 59. to 59 .
	for(punctuation of punctuationList){
		para = replaceAll(para, punctuation, " "+punctuation + " ");
	}
	
	return para;
}

function postPara(para) {
	// Remove the last space
	//para = para.slice(0,-1);
	// Convert $ a to $a
	
	para = replaceAll(para, " $ ","$");
	para = replaceAll(para, " - ","-");
	// Change a . to a.
	for(punctuation of punctuationList) {
		para = replaceAll(para, " "+punctuation + " ",punctuation);
		}
	
	return para;
}

function parseParagraph(para) {	
	para = prePara(para);
	
	words = para.split(" ");
	let i = 0;
	let index = 0;
	newPara = "";
	
	while(i<words.length) {
		
		if(words[i] in NUMBER_DICT) {
			let end = i;
			
			while(words[end] in NUMBER_DICT || 
						words[end] in fillerWords && end+1 != words.length && words[end+1] in NUMBER_DICT) {
				end+=1;
			}
			
			// Convert all the words from [i,end)
			let combinedWord = ""
			for(var j = i;j<end;j++) {
				combinedWord+=words[j] + " ";
			}
			combinedWord = combinedWord.slice(0,-1);
						
			newPara+=wordsToNum(combinedWord);
			
			textIndices.push(index);
			
			i = end;
			
		}
		else {
			newPara+=words[i];
			i+=1;
		}
		
		index+=1;
		newPara+=" ";		
	}
	newPara = postPara(newPara);


	return newPara
}

