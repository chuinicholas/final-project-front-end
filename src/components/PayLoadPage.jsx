import React from "react";
import PayLoad from "./PayLoad";
import styles from "./PayLoadPage.module.css";

function PayLoadPage() {
  return (
    <div className={styles.container}>
      <div className={styles.payBox}>
        <PayLoad />
      </div>
    </div>
  );
}

export default PayLoadPage;