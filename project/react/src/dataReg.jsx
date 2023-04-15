import React, { useRef, useState } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";
import Webcam from "react-webcam";
import moment from "moment-timezone";
import logo from "./logo.png";

// Initialize Firebase
const firebaseConfig = {
  // Replace with your Firebase configuration
  apiKey: "AIzaSyC74dTyT8_HrsuSQZq4x60P-ef8k-317Hw",
  authDomain: "realtime-ticketing.firebaseapp.com",
  databaseURL: "https://realtime-ticketing-default-rtdb.firebaseio.com",
  projectId: "realtime-ticketing",
  storageBucket: "realtime-ticketing.appspot.com",
  messagingSenderId: "309260278638",
  appId: "1:309260278638:web:74e03e2d9eb2ee7b3cbf7f",
};

firebase.initializeApp(firebaseConfig);

export const RegistrationForm = (props) => {
  const webcamRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    PhoneNo: "",
    Gender: "",
    zone: "",
    photo: null,
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    PhoneNo: "",
    Gender: "",
    zone: "",
    photo: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, Gender, PhoneNo, zone, photo } = formData;

    // Perform form validation
    let errors = {
      name: "",
      PhoneNo: "",
      zone: "",
      Gender: "",
      photo: "",
    };
    let formIsValid = true;

    if (!name) {
      errors.name = "Name is required";
      formIsValid = false;
    }

    if (!PhoneNo) {
      errors.PhoneNo = "Phone Number is required";
      formIsValid = false;
    } else {
      // Validate phone number using regular expression
      const phonePattern = /^[0-9]{10}$/;
      if (!phonePattern.test(PhoneNo)) {
        errors.PhoneNo = "Invalid Phone Number";
        formIsValid = false;
      }
    }

    if (!Gender) {
      errors.Gender = "Gender is required";
      formIsValid = false;
    }

    if (!zone) {
      errors.zone = "Zone is required";
      formIsValid = false;
    }

    if (!photo) {
      errors.photo = "Photo is required";
      formIsValid = false;
    }

    setFormErrors(errors);

    if (formIsValid) {
      // Generate unique ID
      const UniqueId = Math.floor(100000 + Math.random() * 900000);
      const now = moment().tz("Asia/Kolkata");

      // Store unique ID in Firebase Realtime Database
      firebase
        .database()
        .ref("registrations")
        .child(UniqueId)
        .set({
          name,
          Gender,
          PhoneNo,
          zone,
          UniqueId,
          registration: new Date().getFullYear(),
          last_use_time: now.format("YYYY-MM-DD H:mm:ss"),
          wallet: 2000,
        })
        .then(() => {
          // Upload photo to Firebase Storage
          const storageRef = firebase.storage().ref();
          const zoneRef = storageRef.child(`zone${zone}`);
          const photoRef = zoneRef.child(`${UniqueId}.png`);
          const photoBlob = dataURLtoBlob(photo);
          return photoRef.put(photoBlob);
        })
        .then(() => {
          alert("Registration successful!");
        })
        .catch((error) => {
          console.error("Error storing data:", error);
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const capturePhoto = () => {
    const screenshot = webcamRef.current.getScreenshot();
    if (screenshot) {
      setFormData({
        ...formData,
        photo: screenshot,
      });
    }
  };

  const dataURLtoBlob = (dataURL) => {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  };

  const retakePhoto = () => {
    setFormData({ ...formData, photo: null });
  };

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="auth-form-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <h1>Realtime-ticketing Registration Window</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        {formErrors.name && <p>{formErrors.name}</p>}
        <br />
        <label>
          Gender:
          <select
            name="Gender"
            value={formData.Gender}
            onChange={handleInputChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        {formErrors.Gender && <p>{formErrors.Gender}</p>}
        <br />
        <label htmlFor="Phone no.">Phone Number</label>
        <input
          type="text"
          name="PhoneNo"
          value={formData.PhoneNo}
          onChange={handleInputChange}
        />
        {formErrors.PhoneNo && <p>{formErrors.PhoneNo}</p>}
        <br />
        <label>
          Zone:
          <select
            name="zone"
            value={formData.zone}
            onChange={handleInputChange}
          >
            <option value="">Select Zone</option>
            <option value="1">North</option>
            <option value="2">East</option>
            <option value="3">West</option>
            <option value="4">South</option>
          </select>
        </label>
        {formErrors.zone && <p>{formErrors.zone}</p>}
        <br />
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/png"
          videoConstraints={{ width: 216, height: 216 }}
        />
        {formData.photo ? (
          <>
            <br />
            <img src={formData.photo} alt="Registration" />
            <br />
            <button type="button" onClick={retakePhoto}>
              Retake Photo
            </button>
          </>
        ) : (
          <br />
        )}
        {formErrors.photo && <span>{formErrors.photo}</span>}
        <br />
        <button type="button" onClick={capturePhoto}>
          Capture Photo
        </button>
        <br />
        <button className="button" type="submit">
          Submit
        </button>
      </form>
      <button
        onClick={() =>
          openInNewTab("https://realtime-ticket-info.netlify.app/")
        }
        className="link-btn"
      >
        Already have an account? View Info.
      </button>
    </div>
  );
};

export default RegistrationForm;
