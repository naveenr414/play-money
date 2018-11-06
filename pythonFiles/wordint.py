numberDict = {
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

externalWords = ["negative","and","point"]

# Write a function to convert a written number to integer
def convert(s):
    s = s.lower()
    s = s.strip()
    s = s.replace("-"," ")
    words = s.split(" ")
    numbers = []
    neg = False

    for i in range(len(words)):
        if(words[i] in numberDict):
            numbers.append(numberDict[words[i]])
        elif(words[i] == "negative"):
            neg = True
            
    total = 0
    i = 0
    while(i<len(numbers)):
        if(i == len(numbers)-1):
            total+=numbers[i]
            i+=1
        elif(len(str(numbers[i]))<len(str(numbers[i+1]))):
            total+=numbers[i]*numbers[i+1]
            i+=2
        elif(len(str(numbers[i])) == len(str(numbers[i+1]))):
            total+=int(str(numbers[i])+str(numbers[i+1]))
            i+=2
        else:
            total+=numbers[i]
            i+=1

    if(neg):
        total*=-1

    return total

def splitPara(para):
    para = para.replace("$","$ ")
    para = para.replace("-"," ")
    words = para.split(" ")
    return words
    

def rewrite(para):
    words = splitPara(para)
    newPara = ""

    i = 0
    while(i<len(words)):
        currentWord = "".join([c for c in words[i] if c.isalpha()])
        otherShit = "".join(words[i][len(currentWord):])
        
        if(currentWord in numberDict):
            convertWord = ""
            currentWord = "".join([c for c in words[i] if c.isalpha()])

            while((currentWord in numberDict or currentWord in externalWords) and otherShit == ""):
                convertWord+=currentWord
                convertWord+=" "
                i+=1

                currentWord = "".join([c for c in words[i] if c.isalpha()])
                otherShit = "".join(words[i][len(currentWord):])

            if((currentWord in numberDict or currentWord in externalWords)):
                convertWord+=currentWord + " "
                i+=1
                    
            newPara+=str(convert(convertWord))+otherShit+" "
        else:
            newPara+=words[i] + " "
            i+=1

    newPara = newPara.strip()
    return "".join(newPara)
