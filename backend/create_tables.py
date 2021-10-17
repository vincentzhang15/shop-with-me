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
    """
    Acknowledgement of source of nutritional value of foods.
    Apple, Chocolate, CocaCola: medicalnewstoday
    Orange, Oinion, Tomato, Peanut, Pasta: healthline
    """

    # data for each item in iteminfo table
    v1 = ('orange', 'orange', 'searchable', 15, 40, 'Oranges are citrus fruits that grow on trees. They are a healthy source of fiber, vitamin C, potassium, thiamine, folate, and antioxidants. Regular consumption of oranges can help prevent kidney stone formation.')
    v2 = ('apple', 'apple', 'searchable', 25, 40, 'A popular fruit containing antioxidants, vitamins, fiber, and a whole range of other nutrients. Due to their varied nutrient content, they many help reduce the risk of cancer, obesity, heart disease, diabetes, and several other conditions.')
    v3 = ('onion', 'onion', 'searchable', 35, 40, 'Low in calories but high in minerals and vitamins, especially vitamin C which helps regulate immune health, collagen production, tissue repair and iron absorption. Onions are a good source of potassium which is a mineral many people are lacking. Contain antioxidants and compounds that fight inflammation, decrease triglycerides and reduce cholesterol levels.')
    v4 = ('tomato', 'tomato', 'searchable', 45, 40, 'A great source of vitamin C (essential nutrient and antioxidant), potassium (beneficial for blood pressure control and heart disease prevention), folate (important for normal tissue growth and cell function), vitamin K (blood clotting and bone health), and fiber.')

    v5 = ('chocolate', 'chocolate', 'searchable', 20, 20, 'Chocolate comes from cacao, which is a plant with high levels of minerals and antioxidants. Commercial milk chocolate contains cocoa butter, sugar, milk, and small quantities of cacao. In contrast, dark chocolate has much larger amounts of cacao and less sugar than milk chocolate.')
    v6 = ('pasta', 'pasta', 'searchable', 40, 20, 'Whole grains are made from the entire wheat kernel. As a result, they’re higher in fiber, vitamins and minerals than refined grains, which contain only the endosperm of the wheat kernel. Eating whole grains has been associated with a lower risk of heart disease, colorectal cancer, diabetes and obesity.')

    v7 = ('cocacola', 'cocacola', 'searchable', 40, 60, 'There are 37 grams (g) of added sugar, which equates to almost 10 teaspoons (tsp), in a single can of cola.')
    v8 = ('peanut', 'peanut', 'searchable', 50, 60, 'Lower in carbs, rich in protein and fat. May even be useful for weight loss and are linked to a reduced risk of heart disease.')

    v9 = ('left',  'left' , 'sign'      , 70, 20, 'Left sign.')
    v10 = ('right', 'right', 'sign'      ,  0,  0, 'Right sign.')

    mycursor.execute("insert into iteminfo ( label, image, type, x, y, `desc` ) values ( %s, %s, %s, %s, %s, %s)" , v1 )
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
