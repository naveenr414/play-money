let fillerWords = ["and"];
let punctuationList = [".","?","!",";",",",":",];
let moneyIndices = [];
let textIndices = [];

let years = {'1928': 1, '1929': 1.006, '1930': 0.942, '1931': 0.854, '1932': 0.766, '1933': 0.772, '1934': 0.784, 
						'1935': 0.808, '1936': 0.819, '1937': 0.843, '1938': 0.819, '1939': 0.819, '1940': 0.825, '1941': 0.907,
						'1942': 0.989, '1943': 1.019, '1944': 1.042, '1945': 1.065, '1946': 1.258, '1947': 1.369, '1948': 1.41, 
						'1949': 1.38, '1950': 1.461, '1951': 1.549, '1952': 1.561, '1953': 1.572, '1954': 1.561, '1955': 1.567, 
						'1956': 1.614, '1957': 1.661, '1958': 1.691, '1959': 1.72, '1960': 1.744, '1961': 1.756, '1962': 1.779, 
						'1963': 1.807, '1964': 1.825, '1965': 1.86, '1966': 1.925, '1967': 1.983, '1968': 2.076, '1969': 2.205, 
						'1970': 2.328, '1971': 2.405, '1972': 2.487, '1973': 2.703, '1974': 3.035, '1975': 3.244, '1976': 3.403, 
						'1977': 3.631, '1978': 3.958, '1979': 4.484, '1980': 5.045, '1981': 5.494, '1982': 5.703, '1983': 5.92, 
						'1984': 6.151, '1985': 6.385, '1986': 6.455, '1987': 6.739, '1988': 7.036, '1989': 7.36, '1990': 7.809, 
						'1991': 8.051, '1992': 8.284, '1993': 8.508, '1994': 8.738, '1995': 8.956, '1996': 9.252, '1997': 9.409, 
						'1998': 9.56, '1999': 9.818, '2000': 10.152, '2001': 10.314, '2002': 10.562, '2003': 10.763, '2004': 11.118, 
						'2005': 11.496, '2006': 11.783, '2007': 12.266, '2008': 12.278, '2009': 12.61, '2010': 12.799, '2011': 13.183, 
						'2012': 13.407, '2013': 13.608, '2014': 13.717, '2015': 13.813, '2016': 14.103, '2017': 14.399, '2018': 14.673}

function updateText() {
	
	let scaleAmount = years[$("#slider").val()]/years['2018'];
	$("#sliderValue").text($("#slider").val());
	let textValue = $("#mainArea").val();
	textValue = parseParagraph(textValue);
	$("#text").text(scaleMoney(textValue,scaleAmount));
	
}

$(document).ready(function() {
	
	 $("#submit").click(function() {
		let textValue = $("#mainArea").val();
		textValue = parseParagraph(textValue);
		findMoney(textValue);
		$("#text").text(textValue);
		updateText();
	 });
	

	 $("#slider").click(function() {
		 updateText();
	 });
	 
	 $("#submit").click(function() {
		 updateText();
	 });
	 
	 $("#mainArea").keydown(function(e) {
			let space = 13;
			if(e.keyCode == space) {
				$("#submit").click();
			}
	 });
	 
});

function scaleMoney(para,scale) {
	/* This scales all the money numbers by scale */ 
	
	para = prePara(para).split(" ");
	for(index of moneyIndices) {
		para[index] = Math.round(parseFloat(para[index])*scale).toString();
		
		/* Check if we need to make the number into text */ 
		if (textIndices.includes(index)) {
			para[index] = numToWords(parseFloat(para[index]));
		}
	}

	para = postPara(para.join(" "));
	
	return para;
}

function findMoney(para) {
	/* Figure out which words in the paragraph are money */
	
	moneyIndices = [];
	
	words = parseParagraph(prePara(para)).split(" ");
	moneyWords = ["$","dollar","dollars","cents","cent"];
				
	for(let word = 0;word<words.length;word++) {
		if(words[word].length>0 && !isNaN(words[word])) {
			
			/* How far the money words are, behind and in front of it */
			let distanceFront = -1;
			let distanceBack = -1;
			
			let j = word+1;
			while(j<words.length && !(moneyWords.includes(words[j]))) {
				j+=1;
			}
			
			if(j != words.length) {
				distanceFront = j-word;
			}
			else {
				distanceFront = -1;
			}
			
			j = word-1;
			while(j>=0 && !(moneyWords.includes(words[j]))) {
				j-=1;
			}
			
			if(j>=0) {
				distanceBack = word-j;	
			}
			else {
				distanceBack = -1;
			}
						
			let minDistance = Math.min(distanceFront,distanceBack);
			
			if(distanceFront<=2 && distanceFront>=0 || distanceBack<=2 && distanceBack>=0) {
				moneyIndices.push(word);
			}	
		}
	}
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
	textIndices = [];
	newPara = "";
	
	while(i<words.length) {
		
		console.log(i);
		if(words[i] in NUMBER_DICT) {
			/* Find the end of the number */ 
			
			let start = i;
			let end = i;
			
			let currentWord = words[end];
			let nextWord = end+1 != words.length? words[end+1] : "";
			
			while(words[end] in NUMBER_DICT || 
						(words[end] in fillerWords && end+1 != words.length? words[end+1] : "" in NUMBER_DICT)		) {
				end+=1;
			}
			
			console.log(words[end] in NUMBER_DICT);
			
			// Convert all the words from [start,end)
			let combinedWord = ""
			for(var j = start;j<end;j++) {
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
	
	console.log("Done");
	
	newPara = postPara(newPara);


	return newPara
}

