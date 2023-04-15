import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import logo from "./logo.png"

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC74dTyT8_HrsuSQZq4x60P-ef8k-317Hw",
  authDomain: "realtime-ticketing.firebaseapp.com",
  databaseURL: "https://realtime-ticketing-default-rtdb.firebaseio.com",
  projectId: "realtime-ticketing",
  storageBucket: "realtime-ticketing.appspot.com",
  messagingSenderId: "309260278638",
  appId: "1:309260278638:web:74e03e2d9eb2ee7b3cbf7f",
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();


export const Dashboard = () => {



 const [uid, setUid] = useState('');
    const [username, setUsername] = useState('');
    const [userDetails, setUserDetails] = useState(null);


    const handleUidChange = event => {
        setUid(event.target.value);
      };

      
    const handleUsernameChange = event => {
        setUsername(event.target.value);
    };

    const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  
    useEffect(() => {
      // Fetch records from Firebase Realtime Database
     
    }, [uid]);

const handleSearch = () => {

    if (uid && username) {
      const fetchRecords = async () => {
        const response = await database.ref(`/registrations/${uid}`).once('value');
        const data = response.val();
        console.log(data)

      
              
        if (data.name === username) {
          setUserDetails(data);
   
              // console.log(records)
        }else{
          setUserDetails(null)
        }
      };
      fetchRecords();
        }
  };

  return (
    <div className="auth-form-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <h1> Realtime-Ticketing Info Dashboard</h1>
      <input
        type="text"
        placeholder="Search ID..."
       value={uid}
        onChange={handleUidChange}
      />
      <input
        type="text"
        placeholder="Search Name..."
      value={username}
        onChange={handleUsernameChange}
      />
      <button onClick={handleSearch}>Search</button>
      {userDetails ? (
        <div>
          <h2>User Details</h2>
          <p>Name: {userDetails.name}</p>
          <p>Gender: {userDetails.Gender}</p>
          <p>PhoneNo: {userDetails.PhoneNo}</p>
          <p>Unique ID: {userDetails.UniqueId}</p>
          <p>Wallet: {userDetails.wallet}</p>
          <p>Registration: {userDetails.registration}</p>
          <p>Last time Used: {userDetails.last_use_time}</p>
        </div>
      ) : (
        <p>No user found</p>
      )}
      <button
        onClick={() =>
          openInNewTab("https://realtime-ticketing.netlify.app/")
        }
        className="link-btn"
      >
        Don't have an account? Register here.
      </button>
    </div>
    
  );
};

export default Dashboard;