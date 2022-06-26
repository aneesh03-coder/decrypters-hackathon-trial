import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useCallback, useRef } from "react";
import { db } from "../firebase";
import firebase from "firebase/compat/app";
import { data } from "autoprefixer";
export default function Home() {
  const [info, setInfo] = useState([]);

  let shouldRun = useRef(true);
  useEffect(() => {
    const getInfo = async () => {
      const response = await fetch("/api/getAllCampaigns");
      const data = await response.json();
      setInfo(data);
    };
    if (shouldRun.current) {
      db.collection("campaigns").onSnapshot(() => {
        getInfo();
      });
      shouldRun.current = false;
    }
  }, []);
  const saveCampaign = async () => {
    const newCampaign = {
      Title:
        "Tuberculosis (TB) is a potentially serious infectious disease that mainly affects the lungs. The bacteria that cause tuberculosis are spread from person to person through tiny droplets released into the air via coughs and sneezes",
      goal: 1500,
      patient_address: "Rynjah",
      patient_age: 43,
      patient_description: "Really needs your help",
      patient_gender: "male",
      patient_image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Depiction_of_a_tuberculosis_patient.png/305px-Depiction_of_a_tuberculosis_patient.png",
      patient_name: "Pankaj Das",
      relation: "Uncle",
      requester_contact: 8325467432,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    const response = await fetch("/api/addCampaign", {
      method: "POST",
      body: JSON.stringify({ newCampaign }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
  };
  const makePayment = async () => {
    const paymentDetails = {
      campaignId: "46cJbalP0fOYV5NfTGjY",
      paymentId: "2iidf345dsfgdf67654354gfdgf22354o",
      donater: "Rajmohan Chaudhary",
      donation_amount: 120,
    };
    const response = await fetch("/api/addPaymentDetails", {
      method: "POST",
      body: JSON.stringify({ paymentDetails }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
  };

  return (
    <div>
      {" "}
      {info.map((data) => (
        <div>
          <div>{data.goal}</div>
          <div>{data.Title}</div>
        </div>
      ))}{" "}
      <button onClick={saveCampaign}>Save Campaign</button>
      <button onClick={makePayment}>Make Payment</button>
    </div>
  );
}
