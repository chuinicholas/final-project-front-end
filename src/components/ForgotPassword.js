import React, { useState } from "react";
import styles from "./ForgotPassword.module.css";
import { useAuth } from "../components/contexts/AuthContext";
import Alert from "@mui/material/Alert";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase";
import { Link } from "react-router-dom";
import resetPw1 from "../image/resetPw1.png";
import resetPw2 from "../image/resetPw2.png";
import LockResetIcon from "@mui/icons-material/LockReset";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [resetPw, setResetPw] = useState(false);

  const [checkEmail, setCheckEmail] = useState(false);
  const [noSuchEmail, setNoSuchEmail] = useState(false);

  console.log(auth);
  async function handleResetPassword(ev) {
    ev.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      console.log("OK");
      setCheckEmail(true);
      setResetPw(true);
    } catch (error) {
      console.log(error.message);
      setNoSuchEmail(true);
    }
  }

  function handleEmailChange(ev) {
    setEmail(ev.target.value);
  }
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.forgotPwBox}>
          <form onSubmit={handleResetPassword} className="space-y-6" action="#">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1>
                重設密碼
                <LockResetIcon
                  style={{ marginLeft: "5px", marginBottom: "5px" }}
                  fontSize="large"
                />
              </h1>
            </div>
            <div>
              <label
                style={{ display: "flex" }}
                for="tel"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                電郵
              </label>
              <input
                onChange={handleEmailChange}
                value={email}
                style={{ width: "250px" }}
                type="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>

            <button
              // onClick={handleResetPassword}
              type="submit"
              className="w-full text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              重設密碼
            </button>
            {checkEmail ? (
              <Alert severity="success">
                Check your email for further instructions.
              </Alert>
            ) : null}

            {noSuchEmail ? (
              <Alert severity="error">Email is not registered.</Alert>
            ) : null}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link to="/login">
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    登入
                  </span>
                </button>
              </Link>
            </div>
          </form>
        </div>
        {resetPw ? (
          <img src={resetPw2} alt="afterResetPw"></img>
        ) : (
          <img src={resetPw1} alt="beforeResetPw"></img>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
