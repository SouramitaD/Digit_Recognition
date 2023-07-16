# MODEL_PATH="digit_AI"
REST_PORT=8501
# MODEL_NAME="digit_GPT"
tensorflow_model_server  --rest_api_port=$REST_PORT   \
                         --model_config_file=model_config.proto \
                         --rest_api_enable_cors_support=true  \
                         --model_config_file_poll_wait_seconds=30