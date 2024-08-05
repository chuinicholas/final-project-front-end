import styles from "./Account.module.css";
import React, { useEffect, useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import accountPic from "../image/accountPage.png";
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from "@mui/icons-material/EditOff";
import { auth, db } from "../components/firebase";
import { getDoc, doc } from "firebase/firestore";

function Account() {
  const [canEditName, setCanEditName] = useState(false);
  const [canEditTel, setCanEditTel] = useState(false);
  const [canEditEmail, setCanEditEmail] = useState(false);
  const [canEditPw, setCanEditPw] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [info, setInfo] = useState({
    name: "",
    tel: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  function editName() {
    setCanEditName((prevState) => {
      return !prevState;
    });
  }

  function editTel() {
    setCanEditTel((prevState) => {
      return !prevState;
    });
  }

  function editEmail() {
    setCanEditEmail((prevState) => {
      return !prevState;
    });
  }

  function editPw() {
    setCanEditPw((prevState) => {
      return !prevState;
    });
  }

  function editNameChange(ev) {
    setInfo((prevState) => {
      return { ...prevState, name: ev.target.value };
    });
  }

  function editTelChange(ev) {
    setInfo((prevState) => {
      return { ...prevState, tel: ev.target.value };
    });
  }

  function editEmailChange(ev) {
    setInfo((prevState) => {
      return { ...prevState, email: ev.target.value };
    });
  }

  function editPwChange(ev) {
    setInfo((prevState) => {
      return { ...prevState, password: ev.target.value };
    });
  }

  function editCPwChange(ev) {
    setInfo((prevState) => {
      return { ...prevState, confirmPassword: ev.target.value };
    });
  }

  return (
    <div>
      {userDetails ? (
        <div className={styles.container}>
          <div className={styles.accountBox}>
            <form>
              <h1 style={{ marginBottom: "15px" }}>
                Customer Profile <AccountBoxIcon />
              </h1>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    style={{ display: "flex" }}
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <input
                      onChange={editNameChange}
                      value={canEditName ? info["name"] : userDetails["name"]}
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-grey-500 dark:focus:border-grey-500"
                    />
                    <div onClick={editName}>
                      {canEditName ? <EditOffIcon /> : <EditIcon />}
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    style={{ display: "flex" }}
                    for="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone number
                  </label>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <input
                      onChange={editTelChange}
                      value={canEditTel ? info["tel"] : userDetails["tel"]}
                      type="tel"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-grey-500 dark:focus:border-grey-500"
                      required
                    />
                    <div onClick={editTel}>
                      {canEditTel ? <EditOffIcon /> : <EditIcon />}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <label
                  style={{ display: "flex" }}
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email address
                </label>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <input
                    onChange={editEmailChange}
                    value={canEditEmail ? info["email"] : userDetails["email"]}
                    type="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-grey-500 dark:focus:border-grey-500"
                  />
                  <div onClick={editEmail}>
                    {canEditEmail ? <EditOffIcon /> : <EditIcon />}
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <label
                  style={{ display: "flex" }}
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <input
                    onChange={editPwChange}
                    value={canEditPw ? info["password"] : "hello123456"}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-grey-500 dark:focus:border-grey-500"
                  />
                  <div onClick={editPw}>
                    {canEditPw ? <EditOffIcon /> : <EditIcon />}
                  </div>
                </div>
              </div>
              {canEditPw ? (
                <div className="mb-6">
                  <label
                    style={{ display: "flex" }}
                    for="confirm_password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <input
                      onChange={editCPwChange}
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-grey-500 dark:focus:border-grey-500"
                    />
                  </div>
                </div>
              ) : null}

              <button
                type="submit"
                className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Save
              </button>
            </form>
          </div>
          <img src={accountPic} alt="accountPic"></img>
        </div>
      ) : (
        <p>Please log in to see.</p>
      )}
    </div>
  );
}

export default Account;
