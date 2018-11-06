from wordint import splitPara, rewrite

d = {"#":-1}
reverseD = {-1:"#"}

def index(para):
    global d

    w = open("wordList.txt","r").read().split("\n")[:-1]
    for i in w:
        d[i.split("\t")[0]] = int(i.split("\t")[1])
        reverseD[int(i.split("\t")[1])] = i.split("\t")[0]
        
    para = splitPara(rewrite(para))
    nums = []

    for word in para:
        if(word.replace(".","1").isnumeric()):
            nums.append(-1)
        elif(word in d):
            nums.append(d[word])
        else:   
            d[word] = len(d)
            reverseD[len(d)-1] = word
            nums.append(d[word])

    w = open("wordList.txt","w")
    for i in d.keys():
        w.write(i)
        w.write("\t")
        w.write(str(d[i]))
        w.write("\n")
    w.close()

    return nums

def indexToWord(indices):
    return " ".join([reverseD[i] for i in indices])

def printNumbers(paraNum):
    numList = [i for i in range(len(paraNum)) if(paraNum[i] == -1)]
    contexts = []
    for i in numList:
        before = indexToWord(paraNum[max(i-10,0):i])
        after = indexToWord(paraNum[i+1:min(i+10,len(paraNum))])

        contexts.append(before + " # "+after)

    return contexts

def writeNumbers(paraNum):
    r = list(set(open("testList.txt").read().split("\n")))
    for i in printNumbers(paraNum):
        r.append(i)

    r = list(set(r))

    w = open("testList.txt","w")
    w.write("\n".join(r))
    w.close()    
r = """Some of these titans, like Marc Benioff and Jack Dorsey, are fighting in their own backyards. Others, like Michael Bloomberg and Thomas Steyer, are pouring money into out-of-state races. And amid the political-spending arms race—a record-breaking $5.2 billion has gone into this election cycle—one billionaire set a new record high for self-financing.

Here are seven of the most prominent billionaire battles.


ANDRES JAUREGUI. PHOTOS: THE FORBES COLLECTION, GETTY IMAGES

1. San Francisco’s tech billionaires are battling over how to fix their city’s growing homeless problem. Salesforce cofounder Marc Benioff is a staunch supporter of Proposition C, which would levy a tax on the city’s big businesses to raise money for homeless programs. Not only has he personally spent $2 million to support Prop C, with Salesforce ponying up another $5 million, but he’s also been trying to rally other tech titans to do something about homelessness for months. “I’m challenging tech to step up,” he said at the opening ceremony of the 1,070-foot-tall Salesforce Tower in May.

But several billionaires are vocally opposed to the prop including Twitter’s Jack Dorsey (who took to Twitter), Sequoia Capital’s Michael Moritz (who wrote an op-ed in the Wall Street Journal) and Stripe's Patrick Collison. All of them say the program lacks accountability and point out that San Francisco already spends heavily on the homeless, reportedly $430 per person every year, compared with $260 in New York City and $110 in L.A. They also back newly elected mayor London Breed, who grew up in city housing and doesn’t think Prop C will fix the homeless problem. 


ANDRES JAUREGUI. PHOTOS: THE FORBES COLLECTION, GETTY IMAGES

2. In what has long been a solid purple state, billionaires are taking sides in the gubernatorial race between progressive Democrat Andrew Gillum and Trump-backed Republican Ron DeSantis.


Palm Beach resident Isaac Perlmutter and his wife have donated $2.5 million to DeSantis, while out-of-state billionaires Thomas Steyer, George Soros (and son Alex) and Michael Bloomberg have shelled out $10 million, $1.25 million and $250,000, respectively, in support of Gillum. Perlmutter—an Israeli immigrant, member of Mar-a-Lago and Veterans Affairs unofficial aide under Trump—was drawn to DeSantis due to his support for Israel (DeSantis attended the opening of the new U.S. embassy in Jerusalem), for veterans (DeSantis served in the Iraq war) and for Trump’s policies in general.

Gillum, who would be Florida’s first black governor, is decidedly anti-Trump, endorsing a $15 minimum wage, gun control, single-payer health care for all and raising the state’s corporate tax rate to fund education.  

ANDRES JAUREGUI. PHOTOS: THE FORBES COLLECTION, GETTY IMAGES
3. Hyatt Hotel heir J.B. Pritzker has raised the bar for billionaires eyeing public office. Pritzker, a Democrat seeking to unseat current Illinois Governor Bruce Rauner (a Republican), has spent $164 million on his own campaign—breaking the record for self-financed gubernatorial candidates. The former record belonged to billionaire Meg Whitman, a Republican who poured $144 million into her failed bid for California governor in 2010. Pritzker leads his opponent by double digits in polls, despite the $22.5 million that Rauner’s campaign received from Chicago hedge fund billionaire Ken Griffin in 2017.
ANDRES JAUREGUI. PHOTOS: THE FORBES COLLECTION, GETTY IMAGES
4. George Soros made the news in October, when an explosive device was sent to his home outside of New York City. The device was allegedly mailed by the same person who targeted other prominent Democratic figures like former president Barack Obama and former attorney general Eric Holder.
The Hungarian-born hedge fund billionaire has put over $16 million this election cycle toward liberal candidates, including $5 million to Priorities USA Action, a political action committee that has spent more than $4.5 million backing Missouri senator Claire McCaskill against her Republican challenger, Josh Hawley. Koch-affiliated American for Prosperity has come out against the Democratic senator, spending over $4.5 million against McCaskill.  
ANDRES JAUREGUI. PHOTOS: THE FORBES COLLECTION, GETTY IMAGES
5. The Oracle of Omaha is duking it out with Sheldon Adelson over who lights up the glittering Las Vegas Strip and the rest of the state. On Tuesday, Nevada voters will decide whether to pass a constitutional amendment that would require the state legislature to pass laws to open up the retail energy market, so residents and businesses would have a choice.
Warren Buffett, whose Berkshire Hathaway’s NV Energy currently has a monopoly on providing electricity in Nevada, is against the proposal. Adelson, who owns the majority of Las Vegas Sands and spends big bucks to keep the lights on at his two Vegas casinos, could have paid the state a fee to take his business to another provider. That’s what some other casino tycoons have done. But he wants to pull the plug on NV Energy’s monopoly for good and see some (presumably cheaper) options for all.
To defend its turf, Buffett’s company has outspent its opponent by nearly three to one: NV Energy has shelled out $63 million to convince voters to strike down the proposal, while Las Vegas Sands has doled out nearly $22 million.
ANDRES JAUREGUI. PHOTOS: THE FORBES COLLECTION, GETTY IMAGES
6. It's a tight race in New Jersey, with incumbent Bob Menendez pitted against private-sector challenger Bob Hugin. Menendez has had no trouble attracting support, despite his legal troubles. He was indicted on corruption charges in 2015, though the case ended in a mistrial and the Justice Department dropped all charges in January.
Patients for Affordable Drugs, a political action committee backed by prodigious energy investor John Arnold and his wife, Laura, has spent $3.5 million on the race. Much of that has been used on attack ads against Hugin, the former CEO of biopharmaceuticals giant Celgene, who they claim doubled the price of cancer drugs while leading the firm. Hugin has contributed $27.5 million to his own campaign, according to the Center for Responsive Politics. He’s raised just a few million dollars from donors. Among his supporters are hedge fund billionaire John Overdeck and his wife, Laura, who have given $200,000 plus, mostly through a Super PAC supporting Hugin, as well as Cargill heir Whitney MacMillan.
ANDRES JAUREGUI. PHOTOS: THE FORBES COLLECTION, GETTY IMAGES
7. In addition to committing $110 million to help Democrats in Senate and House races, Michael Bloomberg has thrown his weight behind former Tennessee governor Philip Bredesen in his U.S. Senate bid. The former New York City mayor, who may have presidential aspirations, hosted a fundraiser for the Democratic senatorial candidate in his Manhattan home in October.
Meanwhile, the Koch-backed nonprofit Americans for Prosperity and its sister PAC Americans for Prosperity Action have spent more than $5 million to support Bredesen’s rival, sitting Republican senator Marsha Blackburn. Americans for Prosperity is part of Charles Koch’s Seminar Network—a collection of nonprofits, super PACs and other entities with support from outside donors—that has spent hundreds of millions in past elections to support its politics, policy and education initiatives."""
r = r.replace("\n"," ")

writeNumbers(index(r))
