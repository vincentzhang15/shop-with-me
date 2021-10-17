import os
import sys

def syscall(cmd):
    print("syscall:", cmd)
    stream = os.popen(cmd)
    output = stream.read()
    print(output)
    print("syscall:", cmd, "finished == ")


def mkdir(path):
    if not os.path.exists(path):
        if os.name == 'posix':
            #!mkdir -p {path}
            stream = os.popen("mkdir -p " + path)
            output = stream.read()
            output
        if os.name == 'nt':
            #!mkdir {path}
            stream = os.popen("mkdir " + path)
            output = stream.read()
            output

# CUSTOM_MODEL_NAME = 'my_ssd_mobnet' 
CUSTOM_MODEL_NAME = 'shop_with_me' 

PRETRAINED_MODEL_NAME = 'ssd_mobilenet_v2_fpnlite_320x320_coco17_tpu-8'
PRETRAINED_MODEL_URL = 'http://download.tensorflow.org/models/object_detection/tf2/20200711/ssd_mobilenet_v2_fpnlite_320x320_coco17_tpu-8.tar.gz'
TF_RECORD_SCRIPT_NAME = 'generate_tfrecord.py'
LABEL_MAP_NAME = 'label_map.pbtxt' # for object detection/training

paths = {
    'WORKSPACE_PATH': os.path.join('Tensorflow', 'workspace'),
    'SCRIPTS_PATH': os.path.join('Tensorflow','scripts'),
    'APIMODEL_PATH': os.path.join('Tensorflow','models'),
    'ANNOTATION_PATH': os.path.join('Tensorflow', 'workspace','annotations'),
    'IMAGE_PATH': os.path.join('Tensorflow', 'workspace','images'),
    'MODEL_PATH': os.path.join('Tensorflow', 'workspace','models'),
    'PRETRAINED_MODEL_PATH': os.path.join('Tensorflow', 'workspace','pre-trained-models'),
    'CHECKPOINT_PATH': os.path.join('Tensorflow', 'workspace','models',CUSTOM_MODEL_NAME), 
    'OUTPUT_PATH': os.path.join('Tensorflow', 'workspace','models',CUSTOM_MODEL_NAME, 'export'), 
    'TFJS_PATH':os.path.join('Tensorflow', 'workspace','models',CUSTOM_MODEL_NAME, 'tfjsexport'), 
    'TFLITE_PATH':os.path.join('Tensorflow', 'workspace','models',CUSTOM_MODEL_NAME, 'tfliteexport'), 
    'PROTOC_PATH':os.path.join('Tensorflow','protoc')
 }
files = {
    'PIPELINE_CONFIG':os.path.join('Tensorflow', 'workspace','models', CUSTOM_MODEL_NAME, 'pipeline.config'), # used for detection / training
    'TF_RECORD_SCRIPT': os.path.join(paths['SCRIPTS_PATH'], TF_RECORD_SCRIPT_NAME), 
    #'LABELMAP': os.path.join(paths['ANNOTATION_PATH'], LABEL_MAP_NAME)
    'LABELMAP': os.path.join('Tensorflow', 'workspace','models', CUSTOM_MODEL_NAME, LABEL_MAP_NAME)
}
