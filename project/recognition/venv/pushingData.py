import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate("../venv/accountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': "https://realtime-ticketing-default-rtdb.firebaseio.com/"
})

ref = db.reference('/registrations')
 
data = {
    "116908": 
        {
            "Gender": "Female",
            "PhoneNo": "6307286267",
            "UniqueId": 116908,
            "last_use_time": "2023-04-05 20:38:44",
            "name": "nishtha bhushan",
            "registration": 2023,
            "wallet": 1930,
            "zone":"1"
        },
    "145301": 
        {
            "Gender": "Female",
            "PhoneNo": "1122334455",
            "UniqueId": 145301,
            "last_use_time": "2023-04-05 20:38:47",
            "name": "Dipika Verma",
            "registration": 2023,
            "wallet": 1990,
            "zone":"1"
        },
    "321654":
        {
            "name": "Murtaza Hassan",
            "PhoneNo": "1234567899",
            "registration": 2017,
            "UniqueId": 321654,
            "Gender": "Male",
            "wallet": 2000,
            "last_use_time": "2022-12-11 00:54:34",
            "zone":"1"
        },
    "324732":
        {
            "name": "SRK",
            "PhoneNo": "7376208991",
            "registration": 1990,
            "UniqueId": 324732,
            "Gender": "Male",
            "wallet": 2650,
            "last_use_time": "2022-12-11 00:54:34",
            "zone":"1"
        },
    "555555":
        {
            "name": "Ayush Kumar",
            "PhoneNo": "8858903111",
            "registration": 2023,
            "UniqueId": 555555,
            "Gender": "Male",
            "wallet": 3200,
            "last_use_time": "2022-12-11 00:54:34",
            "zone":"1"
        },
    "565655":
        {
            "name": "Kiran Bedi",
            "PhoneNo": "7758903111",
            "registration": 1993,
            "UniqueId": 565655,
            "Gender": "Female",
            "wallet": 3520,
            "last_use_time": "2022-12-11 00:54:34",
            "zone":"1"
        },
    "643222":
        {
            "name": "Krish",
            "PhoneNo": "1212121212",
            "registration": 2019,
            "UniqueId": 643222,
            "Gender": "Male",
            "wallet": 2450,
            "last_use_time": "2022-12-11 00:54:34",
            "zone":"1"
        },
    "786333":
        {
            "name": "PM",
            "PhoneNo": "0000111100",
            "registration": 2014,
            "UniqueId": 786333,
            "Gender": "Male",
            "wallet": 6200,
            "last_use_time": "2022-12-11 00:54:34",
            "zone":"1"
        },
    "852741":
        {
            "name": "Emly Blunt",
            "PhoneNo": "8877665544",
            "registration": 2021,
            "UniqueId": 852741,
            "Gender": "Female",
            "wallet": 8720,
            "last_use_time": "2022-12-11 00:54:34",
            "zone":"1"
        },
    "963852":
        {
            "name": "Elon Musk",
            "PhoneNo": "88589034444",
            "registration": 2020,
            "UniqueId": 963852,
            "Gender": "Male",
            "wallet": 2000,
            "last_use_time": "2022-12-11 00:54:34",
            "zone":"1"
        }
}
 
for key, value in data.items():
    ref.child(key).set(value)