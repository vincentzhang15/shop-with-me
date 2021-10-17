
# pip install mysql-connector-python

from config import *

# pip install mysql-connector-python

import mysql.connector

def connectdb():
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="root", # "skl9834bs67TY^&67*(&)",
        database="learning"
    )
    return mydb

mydb = connectdb()
#print(mydb) 
mycursor = mydb.cursor()
# mycursor.execute("create table `tfimages` ( `id` int not null, `label` varchar(100) not null, score int not null, last_updated datetime default current_timestamp, primary key(`id`)) engine=InnoDB default charset=utf8mb4;")
# sys.exit()

import sys

mycursor.execute(f"select label, x, y from iteminfo;")
myresult = mycursor.fetchall()
objs = {} # coordinates of every object
for x in myresult:
    objs[x[0]] = [x[1], x[2]]
print("objs:", objs)    

from PIL import Image

import time

# Load Train Model From Checkpoint

import os
import tensorflow as tf
from object_detection.utils import label_map_util
from object_detection.utils import visualization_utils as viz_utils
from object_detection.builders import model_builder
from object_detection.utils import config_util

# Load pipeline config and build a detection model
configs = config_util.get_configs_from_pipeline_file(files['PIPELINE_CONFIG'])
detection_model = model_builder.build(model_config=configs['model'], is_training=False)

# Restore checkpoint
ckpt = tf.compat.v2.train.Checkpoint(model=detection_model)
ckpt.restore(os.path.join(paths['CHECKPOINT_PATH'], 'ckpt-3')).expect_partial()

# detect objects
@tf.function
def detect_fn(image):
    image, shapes = detection_model.preprocess(image)
    prediction_dict = detection_model.predict(image, shapes)
    detections = detection_model.postprocess(prediction_dict, shapes)
    return detections


#############################################

label_to_search = None
import math

# Draw arrow
def draw_something(img, lb, x__, y__):
    h = len(img)
    w = len(img[0])

    xf = objs[lb][0]
    yf = objs[lb][1]
    xt = objs[label_to_search][0]
    yt = objs[label_to_search][1]
    dx = xt - xf
    dy = yf - yt
    if dx == 0 and dy == 0:
        return

    theta = math.atan2(dy, dx)
    s = math.sin(theta)
    c = math.cos(theta)
    x = w*0.5 + (h-100)*0.5*c
    y = h*0.5 + (h-100)*0.5*s
    x1 = int(x - 50 * c)
    y1 = int(y - 50 * s)
    x2 = int(x + 50 * c)
    y2 = int(y + 50 * s)

    print("draw line", lb, xf, yf, xt, yt, dx, dy, "theta", theta, w, h, x, y)

    print("  c s", c, s, " p1 ", x1, y1, " p2 ", x2, y2)

    # Draw arrowed line, in green with thickness 8 pixels
    img = cv2.arrowedLine(img, (x1, y1), (x2, y2), (0,0xff,0), 8)
    #print("drawline",x1, y1, x2, y2, thickness, red)

# check if search is requested based on state
def find_label():
    global label_to_search
    global mycursor

    #my1db = connectdb()
    #my1cursor = mydb.cursor()
    mycursor.execute("select label from findlabel where state=1;")
    myresult = mycursor.fetchall()
    xx = {}
    for x in myresult:
        label_to_search = x[0]
        break
    #mycursor.close()

    #if my1db.is_connected():
    #    my1db.close()


#############################################

import cv2 
import numpy as np
#from matplotlib import pyplot as plt
category_index = label_map_util.create_category_index_from_labelmap(files['LABELMAP']) # retreive all label names

# Real Time Detections from your Webcam
#!pip uninstall opencv-python-headless -y

# open camera
cap = cv2.VideoCapture(0)
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

while cap.isOpened(): 
    find_label()
    
    # read image
    ret, frame = cap.read()
    image_np = np.array(frame)
    
    # detect object from captured image with TensorFlow
    input_tensor = tf.convert_to_tensor(np.expand_dims(image_np, 0), dtype=tf.float32)
    detections = detect_fn(input_tensor)
    
    # Process detection results
    num_detections = int(detections.pop('num_detections'))
    detections = {key: value[0, :num_detections].numpy()
                  for key, value in detections.items()}
    detections['num_detections'] = num_detections

    # detection_classes should be ints.
    detections['detection_classes'] = detections['detection_classes'].astype(np.int64)

    label_id_offset = 1
    image_np_with_detections = image_np.copy()

    # draw boxes and labels on detected objects
    viz_utils.visualize_boxes_and_labels_on_image_array(
                image_np_with_detections,
                detections['detection_boxes'],
                detections['detection_classes']+label_id_offset,
                detections['detection_scores'],
                category_index,
                use_normalized_coordinates=True,
                max_boxes_to_draw=5,
                min_score_thresh=.8,
                agnostic_mode=False)

    
    # draw arrow if needed
    if label_to_search:
        target = 0
        lb = None
        x = -1
        y = -1
        for i in range(len(detections['detection_scores'])):
            if detections['detection_scores'][i] >= 0.9:
                lb = category_index[(detections['detection_classes']+label_id_offset)[i]]['name'].lower()
                if lb == label_to_search:
                    target = 1
                    break
                box = detections['detection_boxes'][i]
                x = box[0]
                y = box[1]
        if target == 0:
            if x >= 0:
                draw_something(image_np_with_detections, lb, x, y)

    #print("detections boxes", detections['detection_boxes'])
    #print("detections classes", detections['detection_classes']+label_id_offset)
    #print(" category_index", category_index)
    #print(" detection score", detections['detection_scores'])




        
    # display augmented reality images
    img = cv2.resize(image_np_with_detections, (800, 600))
    cv2.imshow('object detection',  img)

    imageid = round(time.time()*100) % 1000 + 1000
    imagescore = round(detections['detection_scores'][0]*100)

    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    im = Image.fromarray(img_rgb)

    # save image as file
    im.save("D:\Hackathons\HackTheValley2021\images\captured"+str(imageid)+".jpg")

    val = (category_index[(detections['detection_classes']+label_id_offset)[0]]['name'], imagescore, imageid)
    type = "update"
    need_insert = 0

    # save image id and info to database
    # udpate
    try:
        sql = "UPDATE tfimages SET label=%s, score=%s, last_updated=now() WHERE id=%s"
        mycursor.execute(sql, val)
        mydb.commit()  
        type = sql + " " + str(mycursor.rowcount)
        if(mycursor.rowcount < 1):
            print("== update rows = ", mycursor.rowcount, sql, val)
            need_insert = 1
    except mysql.connector.Error as err:
        print("===== update Error: {}".format(err), sql, val)
        need_insert = 1

    # insert
    if(need_insert > 0):
        try:
            type = "insert"
            sql = "INSERT INTO tfimages (label, score, id) VALUES (%s, %s, %s)"
            mycursor.execute(sql, val)
            mydb.commit()
            type = sql + " " + str(mycursor.rowcount)
        except mysql.connector.Error as err1:
            print("===== insert Error: {}".format(err1), sql, val)

    print(" top detection:", category_index[(detections['detection_classes']+label_id_offset)[0]], detections['detection_scores'][0], imageid, val, type)

    if cv2.waitKey(10) & 0xFF == ord('q'):
        cap.release()
        cv2.destroyAllWindows()
        break

    time.sleep(0.5)


# sys.exit()
