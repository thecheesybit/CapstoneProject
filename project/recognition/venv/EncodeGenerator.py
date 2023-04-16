import face_recognition
import pickle
import cv2
import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage
from firebase_admin import db



def download_images_from_firebase(bucket_name, folder_path, local_folder_path, cred_path):
    # Initialize Firebase app with service account credentials
    cred = credentials.Certificate("../venv/accountKey.json")
    firebase_admin.initialize_app(cred, {
        'databaseURL': "https://realtime-ticketing-default-rtdb.firebaseio.com/",
        'storageBucket': "realtime-ticketing.appspot.com"
    })

    # Get a reference to the bucket
    bucket = storage.bucket()

    # Create the local folder if it doesn't exist
    if not os.path.exists(local_folder_path):
        os.makedirs(local_folder_path)

    # Download each image in the folder from Firebase Storage
    for blob in bucket.list_blobs(prefix=folder_path):
        if not blob.name.endswith('/'):  # Ignore folders
            filename = os.path.basename(blob.name)
            local_path = os.path.join(local_folder_path, filename)
            blob.download_to_filename(local_path)
            print(f'Downloaded {blob.name} to {local_path}')




download_images_from_firebase(
    bucket_name='realtime-ticketing.appspot.com',
    folder_path='zone1/',
    local_folder_path='zone1/',
    cred_path='../venv/accountKey.json'
)


# Importing student images
folderPath = 'zone1'

pathList = os.listdir(folderPath)
print(pathList)
imgList = []
studentIds = []
for path in pathList:
    imgList.append(cv2.imread(os.path.join(folderPath, path)))
    studentIds.append(os.path.splitext(path)[0])

    fileName = f'{folderPath}/{path}'
    bucket = storage.bucket()
    blob = bucket.blob(fileName)
    blob.upload_from_filename(fileName)


print(studentIds)


def findEncodings(imagesList):
    encodeList = []
    for img in imagesList:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img)[0]
        encodeList.append(encode)

    return encodeList


print("Encoding Started ...")
encodeListKnown = findEncodings(imgList)
encodeListKnownWithIds = [encodeListKnown, studentIds]
print("Encoding Complete")

file = open("EncodeFile.p", 'wb')
pickle.dump(encodeListKnownWithIds, file)
file.close()
print("File Saved")
