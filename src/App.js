import React, { useState } from "react";

import "./App.css";
import * as Realms from "realm-web";

const app = new Realms.App({ id: "application-0-pcidj" });

function App() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [otp, setOtp] = useState("");
  // const [otp, setOTP] = useState("");
  // const [error, setError] = useState(null);

  const loginAnonymous = async () => {
    const credentials = Realms.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      console.log(user);
      console.log("user logged in anonymously");
    } catch (err) {
      console.log("Failed  ", err);
    }
  };

  const handleSubmit = async (e) => {
    try {
      if (app.currentUser === null) {
        loginAnonymous();
        console.log("line 29 executed");
        await app.currentUser.callFunction("getOTP", phoneNumber);
        console.log("Successfully Executed realm function when user is null");
      } else {
        await app.currentUser.callFunction("getOTP", phoneNumber);

        console.log("Successfully Executed");
        setIsOTPSent(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleVerify = async () => {
    try {
      await app.currentUser.callFunction("handleVerify", phoneNumber, otp);
      console.log("verification Done");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {isOTPSent ? (
        <form>
          <label htmlFor="otp">OTP:</label>
          <input
            id="otp"
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button type="button" onClick={handleVerify}>
            Verify
          </button>
        </form>
      ) : (
        <form>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            id="phoneNumber"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button type="button" onClick={handleSubmit}>
            Send OTP
          </button>
        </form>
      )}
    </>
  );
}

export default App;
