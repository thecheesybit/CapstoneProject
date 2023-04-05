import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  // Your Firebase config here
  
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const Dashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = () => {
      db.ref("path/to/data").on("value", (snapshot) => {
        const newData = snapshot.val();
        setData(newData);
      });
    };

    getData();
  }, []);

  return (
    <div>
      <h1>Real-time Dashboard</h1>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default Dashboard;