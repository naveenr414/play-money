import tensorflow as tf
from tensorflow import keras
from wordindex import index
from sklearn.model_selection import train_test_split

import numpy as np 

d = {"#":-1}
reverseD = {-1:"#"}

test = open("testList.txt").read().split("\n")[:-1]
answers = open("answerList.txt").read().split("\n")[:-1]

for i in range(len(test)):
    test[i] = index(test[i])

test = [i[:20] for i in test if len(i)>=20]
test = test[:len(answers)]

for i in range(len(answers)):
    answers[i] = [int(answers[i])]

allData = np.array(test)
allAnswers = np.array(answers)

X_train, X_test, y_train, y_test = train_test_split(allData, allAnswers, test_size=0.33, random_state=42)

vocabSize = max(np.max(X_train),np.max(X_test))

model = keras.Sequential()
model.add(keras.layers.Dense(len(X_train), input_shape=X_train[0].shape)) 
model.add(keras.layers.Dense(16, activation=tf.nn.relu))
model.add(keras.layers.Dense(1, activation=tf.nn.sigmoid))

model.compile(optimizer=tf.train.AdamOptimizer(),
              loss='binary_crossentropy',
              metrics=['accuracy'])

history = model.fit(X_train,
                    y_train,
                    epochs=40,
                    batch_size=512,
                    validation_data=(X_test, y_test),
                    verbose=1)

