def categorize():
    f = open("testList.txt").read().split("\n")
    numDone = len(open("answerList.txt").read().split("\n"))-1
    f = f[numDone:-1]
    w = open("answerList.txt","a")
    
    f = f[::-1]
    while(len(f)):
        print(f.pop())
        a = int(input("1 for money, 0 for not money "))
        if(a == 0):
            w.write("0")
        elif(a==1):
            w.write("1")
        else:
            break
        w.write("\n")

    w.close()

    
