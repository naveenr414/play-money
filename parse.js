$(document).ready(function() {
	 $("#submit").click(function() {
		 let textValue = $("#mainArea").val();
		 	$("#text").text(textValue);
	 });
	 
	 $("#mainArea").keydown(function(e) {
			if(e.keyCode == 13) {
				$("#submit").click();
			}
	 });
});

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