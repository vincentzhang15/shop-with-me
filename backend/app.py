# Based on https://nordicapis.com/how-to-create-an-api-from-a-dataset-using-python-and-flask/

# pip install flask

import mysql.connector

import flask
from flask import request, make_response, send_file, jsonify

app = flask.Flask(__name__)
app.config["DEBUG"] = True

PASS = "root" # "skl9834bs67TY^&67*(&)"

# test data for testing Flask
books = [
    {'id': 0,
     'title': 'A Fire Upon the Deep',
     'author': 'Vernor Vinge',
     'first_sentence': 'The coldsleep itself was dreamless.',
     'year_published': '1992'},
    {'id': 1,
     'title': 'The Ones Who Walk Away From Omelas',
     'author': 'Ursula K. Le Guin',
     'first_sentence': 'With a clamor of bells that set the swallows soaring, the Festival of Summer came to the city Omelas, bright-towered by the sea.',
     'published': '1973'},
    {'id': 2,
     'title': 'Dhalgren',
     'author': 'Samuel R. Delany',
     'first_sentence': 'to wound the autumnal city.',
     'published': '1975'}
]

# testing flask backend connect with react frontend
# Testing based on https://blog.miguelgrinberg.com/post/how-to-create-a-react--flask-project
import time
@app.route('/time')
def get_current_time():
    resp = make_response( jsonify({'time': time.time()}) )
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Headers'] = '*'
    resp.headers['Content-Type'] = 'application/json'
    return resp    

# database connections
def connectdb():
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password=f"{PASS}",
        database="learning"
    )
    return mydb

# Testing flask
@app.route('/', methods=['GET'])
def home():
    return '''<h1>Distant Reading Archive</h1>
<p>A prototype API for distant reading of science fiction novels.</p>'''

# testing flask: route to return all available entries
@app.route('/api/v1/resources/books/all', methods=['GET'])
def api_all():
    return jsonify(books)

# get the last captured image with label information if the label is detected
@app.route('/api/v1/label', methods=['GET'])
def api_label():
    # database connections
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password=f"{PASS}",
        database="learning"
    )

    # retrieve from SQL database
    mycursor = mydb.cursor()
    mycursor.execute("select id, label, score, last_updated from tfimages order by last_updated desc, id desc limit 1")
    myresult = mycursor.fetchall()
    xx = {0}
    for x in myresult:
        print(x)
        xx = {'id':x[0], 'label':x[1], 'score':x[2], 'time':x[3] } # id: image id, label: detected object label, score: percentage match, time: capture time 
        break
    mycursor.close()

    # return JSON result
    resp = make_response( jsonify(xx) )
    # Cross-Origin Resource Sharing (CORS) header
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Headers'] = '*'
    resp.headers['Content-Type'] = 'application/json'
    return resp    

# captured image
@app.route('/image')
def get_image():
    imageid = request.args.get('id')
    filename = "D:\Hackathons\HackTheValley2021\images\captured"+str(imageid)+".jpg"
    return send_file(filename, mimetype='image/jpeg')

# get TensorFlow model, for client-side object detection use
@app.route('/tfmodel/<res_name>')
def get_tfod_model(res_name):
    filename = "Tensorflow\\workspace\\models\\my_ssd_mobnet\\tfjsexport\\"+res_name
    response = make_response(send_file(filename))
    #response.headers['Content-Type'] = 'application/json'
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    return response    

# get item information
@app.route('/api/v1/item/<item_id>')
def get_tfod_item(item_id):
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password=f"{PASS}",
        database="learning"
    )

    mycursor = mydb.cursor()
    mycursor.execute(f"select label, image, type, `desc` from iteminfo where label='{item_id}';")
    # mycursor.execute("select id, label, score, last_updated from tfimages order by last_updated desc, id desc limit 1")
    myresult = mycursor.fetchall()
    xx = {}
    for x in myresult:
        print(x)
        xx = {'label':x[0], 'image':x[1], 'type':x[2], 'desc':x[3] }
        break
    mycursor.close()


    ret = xx #"{name:"+item_id+"}"


    response = make_response(jsonify(ret))
    response.headers['Content-Type'] = 'application/json'
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    return response    

# Request serach for an item in the store
@app.route('/api/v1/find/<label>')
def find_label(label): #label: item to search for

    rowschanged = 0
    ret = "{'ok':'ok'}"

    # reset the previous search flag
    try:
        mydb = connectdb()
        mycursor = mydb.cursor()
        mycursor.execute(f"update findlabel set state=0;")
        mydb.commit()
        mycursor.close()
        mydb.close()
    except mysql.connector.Error as error:
        pass
    finally:
        pass

    # check if product exists in inventory
    mydb = connectdb()
    mycursor = mydb.cursor()
    mycursor.execute(f"select label, image, type, `desc` from iteminfo where label='{label}';")
    myresult = mycursor.fetchall()
    xx = {}
    for x in myresult:
        print(find_label, x)
        rowschanged = 1
        break
    mycursor.close()

    if rowschanged == 0:
        ret = "{'ok':'label not found'}"


    if rowschanged > 0:
        rowschanged = 0

        # set new item to be searched
        try:
            mydb = connectdb()
            mycursor = mydb.cursor()
            mycursor.execute(f"update findlabel set state=1 where label='{label}';")
            mydb.commit()

            rowschanged = mycursor.rowcount
            print(mycursor.rowcount, "Record inserted successfully into findlabel table")
            mycursor.close()

        except mysql.connector.Error as error:
            print("find_label: Failed to update record into findlabel table {}".format(error))

        finally:
            if mydb.is_connected():
                mydb.close();        

        if rowschanged == 0:
            try:
                mydb = connectdb()
                mycursor = mydb.cursor()
                mycursor.execute(f"insert into findlabel (label, state) values ( '{label}', 1);")
                mydb.commit()
                
                #print(mycursor.rowcount, "Record inserted successfully into findlabel table")
                rowschanged = mycursor.rowcount
                mycursor.close()

            except mysql.connector.Error as error:
                print("find_label: Failed to insert record into findlabel table {}".format(error))

            finally:
                if mydb.is_connected():
                    mydb.close();

    if rowschanged == 0:
        ret = "{'ok':'error'}"

    response = make_response(jsonify(ret))
    response.headers['Content-Type'] = 'application/json'
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    return response    

app.run()
