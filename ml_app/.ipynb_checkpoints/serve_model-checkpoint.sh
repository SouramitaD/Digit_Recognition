MODEL_PATH="digit_AI"
REST_PORT=8501
MODEL_NAME="digit_GPT"
tensorflow_model_server  --rest_api_port=$REST_PORT   \
                         --model_base_path=$(pwd)/$MODEL_PATH \
                         --model_name=$MODEL_NAME