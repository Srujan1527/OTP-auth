import React, { useState } from "react";

import "./App.css";
import * as Realms from "realm-web";

const app = new Realms.App({ id: "application-0-pcidj" });

function App() {
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [otp, setOTP] = useState("");
  // const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
  
    try {
      const clientFunc = await app.currentUser.callFunction(
        "getOTP",
        phoneNumber
      );
      console.log(clientFunc);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form>
      {/* {error && <p>{error}</p>} */}
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
      {/* <label>
        OTP:
        <input
          type="text"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
        />
      </label>
      <button type="submit">Verify</button> */}
    </form>
  );
}

export default App;
