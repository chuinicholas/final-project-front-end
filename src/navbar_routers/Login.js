import React, { useState } from "react";
import styles from "./Login.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import loginPic from "../image/loginPage.png";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/firebase";
import Alert from "@mui/material/Alert";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [invalidLogin, setinvalidLogin] = useState(false);
  const [successLogin, setSuccessLogin] = useState(false);

  function handleEmailChange(ev) {
    setEmail(ev.target.value);
  }

  function handlePwChange(ev) {
    setPassword(ev.target.value);
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User log in successfully!");
      setSuccessLogin(true);
      setinvalidLogin(false);
      setTimeout(() => (window.location.href = "/home"), 2000);
    } catch (error) {
      console.log(error.message);
      setinvalidLogin(true);
    }
  }

  function togglePwVis() {
    setShowPassword((prevState) => {
      return !prevState;
    });
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.loginBox}>
          <form onSubmit={handleSubmit} className="space-y-6" action="#">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1>
                會員登入
                <DinnerDiningIcon
                  style={{ marginLeft: "5px", marginBottom: "5px" }}
                  fontSize="large"
                />
              </h1>
            </div>
            <div className={styles.emailBox}>
              <label
                style={{ display: "flex" }}
                for="tel"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                電郵
              </label>
              <input
                value={email}
                style={{ width: "250px" }}
                onChange={handleEmailChange}
                type="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                style={{ display: "flex" }}
                for="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                密碼
              </label>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  value={password}
                  style={{ width: "250px" }}
                  onChange={handlePwChange}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
                <div onClick={togglePwVis} style={{ marginLeft: "10px" }}>
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </div>
              </div>
            </div>
            <div className="m-0">
              <a
                href="#"
                className="ms-auto text-sm text-gray-700 hover:underline dark:text-gray-500"
              >
                <Link to="/forgot-password">忘記密碼?</Link>
              </a>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                type="submit"
                className="w-6/12 md:w-full text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                登入
              </button>
            </div>
            {invalidLogin ? (
              <Alert severity="warning">電郵/密碼不正確.</Alert>
            ) : null}

            {successLogin ? <Alert severity="success">成功登入 !</Alert> : null}

            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              未係會員?{" "}
              <Link
                to="/register"
                className="text-gray-700 hover:underline dark:text-gray-500"
              >
                注册會員
              </Link>
            </div>
          </form>
        </div>
        <img className={styles.loginPic} src={loginPic} alt="loginPic"></img>
      </div>
    </div>
  );
}

export default Login;
