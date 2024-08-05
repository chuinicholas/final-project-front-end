import React, { useState, useEffect } from 'react';
import RecordList from '../components/RecordList';
import styles from './Record.module.css';
import InfoIcon from '@mui/icons-material/Info';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import recordPic from "../image/record.png";
import receiptImg from '../image/receipt.svg'; // for empty record
import { useAuth } from "../components/contexts/AuthContext";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

const Record = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { currentUser } = useAuth();
  const [userPrevOrders, setUserPrevOrders] = useState([]);

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  useEffect(() => {
    async function fetchUserPrevOrders() {
      try {
        const res = await fetch(
          `http://localhost:3001/userFav/?email=${currentUser.email}`
        );
        const result = await res.json();
        setUserPrevOrders(result[0]["prevOrders"]);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUserPrevOrders();
  }, [currentUser]);

  return (
    <div className={styles.container}>
      <div className={styles.leftPane}>
        <h2 className={styles.h2}><ContentPasteIcon sx={{ fontSize: '0.7em', color: "#705b38" }} />{" "}訂單記錄</h2>
        <p className={styles.p}>請向店員出示<ConfirmationNumberIcon sx={{ fontSize: '1.2em', color: "#705b38", alignContent: "baseline" }} />訂單編號取餐</p>
        <div className={styles.RecordList}>
          <RecordList orders={userPrevOrders} onSelectOrder={handleSelectOrder} selectedOrder={selectedOrder} />
        </div>
      </div>

      <div className={styles.rightPane}>
        <h2 className={styles.h2}><InfoIcon sx={{ fontSize: '0.7em', color: "#705b38" }} />{" "}訂單詳情</h2>
        <div className={styles.box}>
          {selectedOrder ? (
            <div className={styles.detail}>
              <div className={styles.location}>
                <LocationOnIcon style={{ color: "#705b38" }} />{" "}{selectedOrder.location}
              </div>
              <table className={styles.orderTable}>
                <thead>
                  <tr>
                    <th>• 項目</th>
                    <th>價錢</th>
                    <th>數量</th>
                    <th>小計</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.order.map((item, index) => (
                    <tr key={index}>
                      <td>• {item.chineseName}</td>
                      <td>${item.price}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr className={styles.hr} />
              <div className={styles.discount}>
                <p>折扣:會員自取8折</p><p>-${(selectedOrder.totalPrice * 0.2).toFixed(1)}</p>
              </div>
              <div className={styles.totalPrice}>
                <strong>總數: </strong>${(selectedOrder.totalPrice)}</div>
            </div>
          ) : (
            <div className={styles.noSelection}>
              <p>請選擇訂單查看詳細資訊</p>
              <img src={receiptImg} alt="No record selected" />
            </div>
          )}
        </div>
      </div>
      <img className={styles.recordPic} src={recordPic} alt="recordPic"></img>
    </div>
  );
};

export default Record;