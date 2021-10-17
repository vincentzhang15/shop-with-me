# pip install mysql-connector-python
# python -m pip install  mysql-connector-python
import sys

import mysql.connector

PASS = 'root'#password="skl9834bs67TY^&67*(&)",

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password=f"{PASS}",
  database="learning"
)

print(mydb) 

mycursor = mydb.cursor()
# mycursor.execute("create table `tfimages` ( `id` int not null, `label` varchar(100) not null, score int not null, last_updated datetime default current_timestamp, primary key(`id`)) engine=InnoDB default charset=utf8mb4;")
# sys.exit()

doit = 0
if doit:
    # state 1: to be searched for, 0: pass
    # determine which items to search for in watch
    mycursor.execute(
        """
        create table `findlabel` (
        `label` varchar(100) not null,
        `state` varchar(100) not null,
        primary key(`label`)) engine=InnoDB default charset=utf8mb4;
        """
        )


doit = 0
if doit:
    # item information for all items in inventory
    mycursor.execute(
        """
        create table `iteminfo` (
        `label` varchar(100) not null,
        `image` varchar(100) not null,
        `type` varchar(100) not null,
        `x` int not null,
        `y` int not null,
        `desc` varchar(2000) not null,
        primary key(`label`)) engine=InnoDB default charset=utf8mb4;
        """
        )

doit = 1
if doit:
    # data for each item in iteminfo table
    v1 = ('orange', 'orange', 'searchable', 15, 40, 'Health infomation of orange.')
    v2 = ('apple', 'apple', 'searchable', 25, 40, 'Health infomation of apples.')
    v3 = ('onion', 'onion', 'searchable', 35, 40, 'Health infomation of onion.')
    v4 = ('tomato', 'tomato', 'searchable', 45, 40, 'Health infomation of tomato.')

    v5 = ('chocolate', 'chocolate', 'searchable', 20, 20, 'Health infomation of chocolate.')
    v6 = ('pasta', 'pasta', 'searchable', 40, 20, 'Health infomation of pasta.')

    v7 = ('cocacola', 'cocacola', 'searchable', 40, 60, 'Health infomation of cocacola.')
    v8 = ('peanut', 'peanut', 'searchable', 50, 60, 'Health infomation of peanut.')

    v9 = ('left',  'left' , 'sign'      , 70, 20, 'Left sign.')
    v10 = ('right', 'right', 'sign'      ,  0,  0, 'Right sign.')

    mycursor.execute("insert into iteminfo ( label, image, type, x, y, `desc` ) values ( %s, %s, %s, %s, %s, %s)" , v2 )
    mycursor.execute("insert into iteminfo ( label, image, type, x, y, `desc` ) values ( %s, %s, %s, %s, %s, %s)" , v3 )
    mycursor.execute("insert into iteminfo ( label, image, type, x, y, `desc` ) values ( %s, %s, %s, %s, %s, %s)" , v4 )
    mycursor.execute("insert into iteminfo ( label, image, type, x, y, `desc` ) values ( %s, %s, %s, %s, %s, %s)" , v5 )
    mycursor.execute("insert into iteminfo ( label, image, type, x, y, `desc` ) values ( %s, %s, %s, %s, %s, %s)" , v6 )
    mycursor.execute("insert into iteminfo ( label, image, type, x, y, `desc` ) values ( %s, %s, %s, %s, %s, %s)" , v7 )
    mycursor.execute("insert into iteminfo ( label, image, type, x, y, `desc` ) values ( %s, %s, %s, %s, %s, %s)" , v8 )
    mycursor.execute("insert into iteminfo ( label, image, type, x, y, `desc` ) values ( %s, %s, %s, %s, %s, %s)" , v9 )
    mycursor.execute("insert into iteminfo ( label, image, type, x, y, `desc` ) values ( %s, %s, %s, %s, %s, %s)" , v10 )

    mydb.commit()

sys.exit()
