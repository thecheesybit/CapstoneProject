import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate("..s/venv/accountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': "https://realtime-ticketing-default-rtdb.firebaseio.com/"
})

ref = db.reference('Students')
 
data = {
    "321654":
        {
            "name": "Murtaza Hassan",
            "PhoneNo": "1234567899",
            "registration": 2017,
            "UniqueId": 7,
            "Gender": "M",
            "wallet": 2000,
            "last_use_time": "2022-12-11 00:54:34"
        },
    "324732":
        {
            "name": "SRK",
            "PhoneNo": "7376208991",
            "registration": 1990,
            "UniqueId": 37,
            "Gender": "M",
            "wallet": 2650,
            "last_use_time": "2022-12-11 00:54:34"
        },
    "555555":
        {
            "name": "Ayush Kumar",
            "PhoneNo": "8858903111",
            "registration": 2023,
            "UniqueId": 78,
            "Gender": "M",
            "wallet": 320,
            "last_use_time": "2022-12-11 00:54:34"
        },
    "565655":
        {
            "name": "Kiran Bedi",
            "PhoneNo": "7758903111",
            "registration": 1993,
            "UniqueId": 56,
            "Gender": "F",
            "wallet": 3520,
            "last_use_time": "2022-12-11 00:54:34"
        },
    "643222":
        {
            "name": "Krish",
            "PhoneNo": "1212121212",
            "registration": 2019,
            "UniqueId": 99,
            "Gender": "M",
            "wallet": 2450,
            "last_use_time": "2022-12-11 00:54:34"
        },
    "786333":
        {
            "name": "PM",
            "PhoneNo": "0000111100",
            "registration": 2014,
            "UniqueId": 47,
            "Gender": "M",
            "wallet": 620,
            "last_use_time": "2022-12-11 00:54:34"
        },
    "852741":
        {
            "name": "Emly Blunt",
            "PhoneNo": "8877665544",
            "registration": 2021,
            "UniqueId": 12,
            "Gender": "F",
            "wallet": 8720,
            "last_use_time": "2022-12-11 00:54:34"
        },
    "963852":
        {
            "name": "Elon Musk",
            "PhoneNo": "88589034444",
            "registration": 2020,
            "UniqueId": 27,
            "Gender": "M",
            "wallet": 20,
            "last_use_time": "2022-12-11 00:54:34"
        }
}
 
for key, value in data.items():
    ref.child(key).set(value)