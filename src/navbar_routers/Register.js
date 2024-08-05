import styles from "./Register.module.css";
import { useState } from "react";
import RememberMeIcon from "@mui/icons-material/RememberMe";
import React from "react";
import Alert from "@mui/material/Alert";
import registerPic from "../image/registerPage.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../components/firebase";
import { setDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

function Register() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    tel: "",
    password: "",
    confirmPassword: "",
  });

  const [pwUnmatch, setPwUnmatch] = useState(false);
  const [successReg, setSuccessReg] = useState(false);
  const [emailInUse, setEmailInUse] = useState(false);
  const [must6, setMust6] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleNameChange(ev) {
    setInput((prevState) => {
      return { ...prevState, name: ev.target.value };
    });
  }

  function handleEmailChange(ev) {
    setInput((prevState) => {
      return { ...prevState, email: ev.target.value };
    });
  }

  function handleTelChange(ev) {
    setInput((prevState) => {
      return { ...prevState, tel: ev.target.value };
    });
  }

  function handlePwChange(ev) {
    setInput((prevState) => {
      return { ...prevState, password: ev.target.value };
    });
  }

  function handleConfirmPwChange(ev) {
    setInput((prevState) => {
      return { ...prevState, confirmPassword: ev.target.value };
    });
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (input["password"] === input["confirmPassword"]) {
      try {
        setLoading(true);
        await createUserWithEmailAndPassword(
          auth,
          input["email"],
          input["password"]
        );
        const user = auth.currentUser;
        console.log(user);
        if (user) {
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            name: input["name"],
            tel: input["tel"],
          });
        }
        console.log("User registered successfully!");

        let result = await fetch("http://localhost:3001/register", {
          method: "post",
          body: JSON.stringify(input),
          headers: {
            "Content-Type": "application/json",
          },
        });
        result = await result.json;
        localStorage.setItem("members", JSON.stringify(result));

        setMust6(false);
        setEmailInUse(false);
        setSuccessReg(true);
        setTimeout(() => (window.location.href = "/home"), 2000);
      } catch (error) {
        console.log(error.message);
        if (
          error.message ===
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          setMust6(true);
          setEmailInUse(false);
          setInput((prevState) => {
            return { ...prevState, password: "", confirmPassword: "" };
          });
        } else if (
          error.message === "Firebase: Error (auth/email-already-in-use)."
        ) {
          setEmailInUse(true);
          setMust6(false);
          setInput({
            name: "",
            email: "",
            tel: "",
            password: "",
            confirmPassword: "",
          });
        }
      }
      setLoading(false);
      setPwUnmatch(false);

      // setInput({
      //   name: "",
      //   email: "",
      //   tel: "",
      //   password: "",
      //   confirmPassword: "",
      // });
    } else {
      setMust6(false);
      setEmailInUse(false);
      setPwUnmatch(true);
      setInput((prevState) => {
        return { ...prevState, password: "", confirmPassword: "" };
      });
    }
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.regBox}>
          <h1>
            會員登記
            <RememberMeIcon
              style={{ marginLeft: "5px", marginBottom: "5px" }}
              fontSize="large"
            />
          </h1>
          <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
            <div className="mb-5">
              <div className={styles.inputBox}>
                <label
                  style={{ display: "flex" }}
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  名稱
                </label>
                <div className={styles.inputField}>
                  <input
                    value={input["name"]}
                    onChange={handleNameChange}
                    type="text"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <div className={styles.inputBox}>
                <label
                  style={{ display: "flex" }}
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  電郵
                </label>
                <div className={styles.inputField}>
                  <input
                    value={input["email"]}
                    onChange={handleEmailChange}
                    type="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <div className={styles.inputBox}>
                <label
                  style={{ display: "flex" }}
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  電話
                </label>
                <div className={styles.inputField}>
                  <input
                    value={input["tel"]}
                    onChange={handleTelChange}
                    type="text"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <div className={styles.inputBox}>
                <label
                  style={{ display: "flex" }}
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  密碼
                </label>
                <div className={styles.inputField}>
                  <input
                    value={input["password"]}
                    onChange={handlePwChange}
                    type="password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="mb-5">
              <div className={styles.inputBox}>
                <label
                  style={{ display: "flex" }}
                  for="repeat-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  確認密碼
                </label>
                <div className={styles.inputField}>
                  <input
                    value={input["confirmPassword"]}
                    onChange={handleConfirmPwChange}
                    type="password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light"
                    required
                  />
                </div>
              </div>
            </div>

            <div className={styles.regBtn}>
              <button
                disabled={loading}
                type="submit"
                className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                注册會員
              </button>
            </div>

            <div
              style={{ marginTop: "20px" }}
              className="text-sm font-medium text-gray-500 dark:text-gray-300"
            >
              已經係會員?{" "}
              <Link
                to="/login"
                className="text-gray-700 hover:underline dark:text-gray-500"
              >
                登入
              </Link>
            </div>
          </form>
          {pwUnmatch ? (
            <Alert severity="error">密碼不相符, 請重新輸入.</Alert>
          ) : null}
          {successReg ? <Alert severity="success">成功注册 !</Alert> : null}
          {must6 ? <Alert severity="error">密碼最少要有6個字.</Alert> : null}

          {emailInUse ? <Alert severity="warning">電郵已使用.</Alert> : null}
        </div>
        <img
          className={styles.registerPic}
          src={registerPic}
          alt="registerPic"
        ></img>
      </div>
    </div>
  );
}

export default Register;
