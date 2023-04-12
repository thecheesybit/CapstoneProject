import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

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

const Dashboard = () => {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Fetch records from Firebase Realtime Database
    const fetchRecords = async () => {
      const response = await database.ref('/Students').once('value');
      const data = response.val();
      if (data) {
        setRecords(Object.values(data));
      }
    };
    fetchRecords();
  }, []);

  useEffect(() => {
    // Filter records based on search term
    const filteredRecords = records.filter(record =>
      record.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredRecords);
  }, [records, searchTerm]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleSelectUser = user => {
    setSelectedUser(user);
  };

  return (
    <div className="auth-form-container">
      <h1>Realtime-Ticketing Dashboard</h1>
      <input
        type="text"
        placeholder="Search records..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {searchResults.map(record => (
          <li key={record.id} onClick={() => handleSelectUser(record)}>
            {record.name}
          </li>
        ))}
      </ul>
      {selectedUser && (
        <div>
          <h2>User Details</h2>
          <p>Name: {selectedUser.name}</p>
          <p>Gender: {selectedUser.Gender}</p>
          <p>PhoneNo: {selectedUser.PhoneNo}</p>
          <p>Unique ID: {selectedUser.UniqueId}</p>
          <p>Wallet: {selectedUser.wallet}</p>
          <p>Registration: {selectedUser.registration}</p>
          <p>Last time Used: {selectedUser.last_use_time}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
