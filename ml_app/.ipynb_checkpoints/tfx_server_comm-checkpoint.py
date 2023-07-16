import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
import requests
import json

if __name__=='__main__':
    # response=requests.get('http://localhost:8501/v1/models/digit_GPT')
    # response2=requests.get('http://localhost:8501/v1/models/digit_GPT/metadata')
    (x_train,y_train),(x_test,y_test)=tf.keras.datasets.mnist.load_data()
    x=x_test[:10]
    print(x_test.shape)
    obj={"instances":x_test[:10].tolist()}
    json_obj=json.dumps(obj)
    response3=requests.post('http://localhost:8501/v1/models/digit_GPT:predict',data=json_obj)
    # print(response.text)
    # print(response2.text)
    response3=json.loads(response3.text)['predictions']
    tf.print(tf.argmax(response3,1))