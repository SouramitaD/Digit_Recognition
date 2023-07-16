import tensorflow as tf
import numpy as np
import requests
import json
from tensorflow.python.ops.numpy_ops import np_config
np_config.enable_numpy_behavior()
      
class AI:
    def __init__(self,model_path):
        # self.model=tf.keras.models.load_model(model_path)
        self.model=model_path
    
    def __process(self,img):
        img=tf.image.rgb_to_grayscale(img)
        img=tf.image.resize(img,(28,28))
        return img
    
    
    
    def __call__(self,image):
        image=self.__process(image)
        image=tf.expand_dims(image,0)
        # res=self.model(image)
        obj={"instances":image.tolist()}
        json_obj=json.dumps(obj)
        res=requests.post(self.model,data=json_obj)
        res=json.loads(res.text)['predictions']
        res=tf.argmax(res,1)
        return res[0].numpy()
    
if __name__=='__main__':
    ai=AI('digit_AI')
    img=np.ones((500,500,3))
    print(ai(img))
    