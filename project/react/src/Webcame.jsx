import React, { useState } from 'react';
import Webcam from "react-webcam";
import firebase from 'firebase/app';
import 'firebase/storage';
//import storage from '../src/firebase';


const WebcamComponent = () => <Webcam />;

const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user"
};

export const WebcamCapture = () => {

    const [image,setImage]=useState('');
    const webcamRef = React.useRef(null);

    
    const capture = React.useCallback(
        () => {
         // Capture a screenshot from the webcam
    const imageSrc = webcamRef.current.getScreenshot();
    const storageRef = firebase.storage().ref();

    // Store the image in Firebase Realtime Database
    console.log(storageRef)
    const newImageRef = storageRef.child(`C:\Users\ak818\Desktop\New folder\recognition\Images/' + Date.now() + '.jpg`);

        });


    

    return (
        <div className="webcam-container">
            <div className="webcam-img">

                {image === '' ? <Webcam
                    audio={false}
                    height={200}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={220}
                    videoConstraints={videoConstraints}
                /> : <img src={image} />}
            </div>
            <div>
                {image !== '' ?
                    <button onClick={(e) => {
                        e.preventDefault();
                        setImage('')
                    }}
                        className="webcam-btn">
                        Retake Image</button> :
                    <button onClick={(e) => {
                        e.preventDefault();
                        capture();
                    }}
                        className="webcam-btn">Register</button>
                        
                }
            </div>
          
        </div>
    );
};