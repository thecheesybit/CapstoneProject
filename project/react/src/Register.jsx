import React, { useState } from "react";
import firebase from 'firebase/app';
import firebaseConfig from '../src/firebaseConfig'
import 'firebase/database';
import { WebcamCapture } from "../src/Webcame";
import { v4 as uuidv4 } from 'uuid';

export const Register = (props) => {
    const [userData, setUserData] = useState({
        name: "",
        PhoneNo: "",
        Gender: "",
        registration: "2023",
        UniqueId: "",
        wallet: "2000",
        last_use_time: "march-23",
    });
    function generateRandomSixDigitNumber() {
        const min = 100000; // minimum value
        const max = 999999; // maximum value
        return Math.floor(Math.random() * (max - min + 1) + min); // generates random number between min and max (inclusive)
      }

    const [uid,setUid]=useState(generateRandomSixDigitNumber())

    let name, value;
    const postUserData = (event) => {
        name = event.target.name;
        value = event.target.value;

        setUserData({ ...userData, [name]: value });
    };

    // connect with firebase
    const submitData = async (event) => {
    
        // const database = firebase.database();
       
        // firebase.initializeApp(firebaseConfig);
        
        const database = firebase.database();


     
        event.preventDefault();
        const {
            name,
            PhoneNo,
            Gender,
            registration,
            UniqueId,
            wallet,
            last_use_time,
        } = userData;

        if (
            name &&
            PhoneNo &&
            Gender 
            // registration &&
            // UniqueId &&
            // wallet &&
            // last_use_time
        ) {

       

            
         const res=  database.ref(`Students/${uid}`).set({
                name,
                PhoneNo,
                Gender,
                registration,
                UniqueId,
                wallet,
                last_use_time,
              });

            // const res = fetch(
            //     // eslint-disable-next-line no-template-curly-in-string
            //     "https://realtime-ticketing-default-rtdb.firebaseio.com/Students.json",
            //     {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json",
                
            //         },
            //         body: JSON.stringify({
            //             uid:"helo",
            //             name,
            //             PhoneNo,
            //             Gender,
            //             registration,
            //             UniqueId,
            //             wallet,
            //             last_use_time,
                                
            //         }),
            //     }
            // );

            if (res) {
                setUserData({
                    name: "",
                    PhoneNo: "",
                    Gender: "",
                    registration: "2023",
                    UniqueId: "78",
                    wallet: "2000",
                    last_use_time: "2022-12-11 00:54:34",
                });
                alert("Data Stored");
            } 
            // else {
        //         alert("plz fill the data");
        //     }
        // } else {
        //     alert("plz fill the data");
         }
    };

    return (

        <div className="auth-form-container">
            <form className="login-form" method="POST" onClick={submitData}>
                <h2>Realtime ticketing Registeration</h2>
                <label htmlFor="Name">Name</label>
                <input
                    type="text"
                    placeholder="Enter your first name"
                    name="name"
                    value={userData.name}
                    onChange={postUserData}
                />
                
               
                
                <label htmlFor="Gender">Gender</label>
                <input
                    type="text"
                    placeholder="Male/Female"
                    name="Gender"
                    value={userData.Gender}
                    onChange={postUserData}
                />
                <label htmlFor="Phone no.">Phone Number</label>
                <input type="text" placeholder="XXX-XXX-XXXX" name="PhoneNo" value={userData.PhoneNo} onChange={postUserData}/>
                <label htmlFor="Image">Capture Image</label>
                 <WebcamCapture imgName={uid} />
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch("login")}>
                Already have an account? Login here.
            </button>
        </div>
    )
};
export default Register;