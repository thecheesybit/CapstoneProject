import React, { useState } from "react";
import Webcam from "react-webcam";
import firebase from "firebase/app";

// import 'firebase/storage';
//import storage from '../src/firebase';
//const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: 216,
  height: 216,
  facingMode: "user",
};

export const WebcamCapture = (props) => {
  const [image, setImage] = useState("");
  const webcamRef = React.useRef(null);
  // const[name,setName]=useState('');

  console.log(props.imgName);
  var name1 = props.imgName.toString();

  const capture = React.useCallback(() => {
    // Capture a screenshot from the webcam
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    const storageRef = firebase.storage().ref();

    // Store the image in Firebase Realtime Database
    console.log(storageRef);
    console.log(name1);
    const newImageRef = storageRef.child(`Images//${name1}.png`);

    var metadata = {
      contentType: "image/png",
    };

    const canvas = document.createElement("canvas");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext("2d").drawImage(img, 0, 0);
      const base64 = canvas.toDataURL("image/png");
      newImageRef.putString(base64.split(",")[1], "base64", metadata);
    };
    img.src = imageSrc;
  });

  return (
    <div className="webcam-container">
      <div className="webcam-img">
        <Webcam
          audio={false}
          height={216}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={216}
          videoConstraints={videoConstraints}
        />
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