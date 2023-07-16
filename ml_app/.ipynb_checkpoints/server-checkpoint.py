from flask import Flask,render_template,request,jsonify
import numpy as np
import matplotlib.pyplot as plt
from predict_image import AI
import json
my_app=Flask(__name__)
# MODEL_PATH='digit_AI'
MODEL_PATH='http://localhost:8501/v1/models/digit_GPT:predict'
ai=AI(MODEL_PATH)
@my_app.route('/',methods=['POST','GET'])
def home():
    
    return render_template('base.html')
@my_app.route('/predict',methods=['POST'])
def page2():
    prediction=0
    if request.method=='POST':
        # data=request.form.get('image')
        #data=np.fromstring(data,sep=',')
        #data=np.reshape(data,(500,500,-1))
        #prediction=ai(data[:,:,:3])
        # plt.imshow(data[:,:,3])
        # plt.show()
        #print(data.shape)
        #print('client send something')
        data=list(request.get_data())
        #print(len(data))
        data=np.reshape(data,(500,500,-1))
        prediction=ai(data[:,:,:3])
        #print('data processed')
        return jsonify({'digit':str(prediction)})
        # print('client sent something')
        # return json.dumps({'data':'hello'})
    

if __name__=='__main__':
    my_app.run(debug=True)
