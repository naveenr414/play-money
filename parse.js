let NUMBER_DICT = {
	"zero":"0",
	"one":1,
	"two":2,
	"three":3,
	"four":4,
	"five":5,
	"six":6,
	"seven":7,
	"eight":8,
	"nine":9,
	"ten":10,
	"eleven":11,
	"twelve":12,
	"thirteen":13,
	"fourteen":14,
	"fifteen":15,
	"sixteen":16,
	"seventeen":17,
	"eighteen":18,
	"nineteen":19,
	"twenty":20,
	"thirty":30,
	"forty":40,
	"fifty":50,
	"sixty":60,
	"seventy":70,
	"eighty":80,
	"ninety":90,
	"hundred":100,
	"thousand":1000,
	"million":1000000,
	"billion":1000000000,
}

let fillerWords = ["and"];
let punctuationList = [".","?","!",";",",",":",]
let moneyIndices = []

$(document).ready(function() {
	 $("#submit").click(function() {
		 let textValue = $("#mainArea").val();
		 	$("#text").text(parseParagraph(textValue));
			findMoney(parseParagraph(textValue));
	 });
	 
	 $("#mainArea").keydown(function(e) {
			if(e.keyCode == 13) {
				$("#submit").click();
			}
	 });
});

function findMoney(para) {
	moneyIndices = [];
	
	word = prePara(para).split(" ");
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
	para = para.slice(0,-1);
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
						
			newPara+=writtenToNumber(combinedWord);
			
			i = end;
		}
		else {
			newPara+=words[i];
			i+=1;
		}
		
		newPara+=" ";		
	}
	
	newPara = postPara(newPara);

	return newPara
}

function writtenToNumber(num) {
	/* This function converts written numbers to numerics 
	So twenety three -> 23
	*/
	
	/* The algorithm basically works as follows
	Convert each word to the appropriate number 
	Then go through the list of numbers, and keep a stack of 
	numbers parsed
	
	When we move from a smaller number to a bigger number, keep popping 
	till we reach a smaller number
	Then multiply the sum of the number popped, with the new number
	
	So for example
	One million Eight hundred twenty three thousand 
	
	= [1M, 800,20,3,1000]
	
	stack = [1M]
	stack = [1M,800]
	stack = [1M,800,20]
	stack = [1M,800,20,3]
	3<1000, so pop off 800, 20, 3 from the stack
	Add these together to get 823*1000 = 823000
	stack = [1M,823000]
	return the sum of the stack 
	
	*/ 
		
	num = num.toLowerCase();
	
	let negative = false;
	let numbers = [];
	
	for(let i of num.split(" ")) {
			if(i in NUMBER_DICT) {
				numbers.push(NUMBER_DICT[i]);
			}
			else if(i === "negative"){
				negative = true;
			}
	}
		
	let stack = [];
	
	for(let i of numbers) {
		let stackTop = stack[stack.length-1];
		if(i<stackTop || stack.length == 0) {
			stack.push(i);
		}
		else {
			let tot = 0;
			while(stack.length>=0 && stack[stack.length-1]<i) {
				tot+=stack.pop();
			}
			tot*=i;
			stack.push(tot);
		}		
	}
	
	let total = stack.reduce((a,b) => a+b);
	
	if(negative) 
		total*=-1;
	
	return total;
	
}