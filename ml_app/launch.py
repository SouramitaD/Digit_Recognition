from threading import Thread
import os
TFX_PORT=8501
FLASK_PORT=5000
TFX_DOMAIN='digitnet'
FLASK_DOMAIN='digitweb'

def launch_tfx():
    os.system("bash serve_model.sh")
    while(1):pass

def launch_flask():
    os.system('python server.py')
    while(1):pass

def tfx_tunnel():
    os.system("lt -p {} -s {}".format(TFX_PORT,TFX_DOMAIN))
    while(1):pass

def flask_tunnel():
    os.system("lt -p {} -s {}".format(FLASK_PORT,FLASK_DOMAIN))
    while(1):pass


registered_task=[launch_tfx,tfx_tunnel,launch_flask,flask_tunnel]

if __name__=='__main__':
    def launch_task(task):
        task_thread=Thread(target=task)
        task_thread.start()
        return task_thread
    tasks=list(map(launch_task,registered_task))
    for task in tasks:
        task.join()