import React from 'react';
import styles from './RecordList.module.css';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

const RecordList = ({ orders, onSelectOrder, selectedOrder }) => {
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // Use 12-hour clock
      timeZone: 'UTC' // Specify the time zone as UTC
    };
    return new Date(dateString).toLocaleString('en-CA', options).replace(',', '');
  };

  const generateOrderNumber = (dateString) => {
    const date = new Date(dateString);
    const hour = date.getUTCHours();
    const seconds = date.getUTCSeconds();
    const alphabet = String.fromCharCode(65 + hour); // Convert hour to alphabet (A-Z)
    const formattedSeconds = seconds.toString().padStart(2, '0'); // Ensure two digits for seconds
    return `${alphabet}${formattedSeconds}`;
  };

  return (
    <div className={styles.orderList}>
      {orders.map((order, index) => (
        <div
          key={index}
          className={`${styles.orderItem} ${selectedOrder === order ? styles.selected : ''}`}
          onClick={() => onSelectOrder(order)}
        >
          <div><ConfirmationNumberIcon style={{ color: "#705b38" }} />{" "}<strong>{generateOrderNumber(order.time)}</strong></div>
          <div><AccessTimeIcon style={{ color: "#705b38" }} />{" "}{formatDate(order.time)}</div>
          <div><LocationOnIcon style={{ color: "#705b38" }} />{" "}{order.location}</div>
          <div><AttachMoneyIcon style={{ color: "#705b38" }} />{" "}{order.totalPrice}</div>
        </div>
      ))}
    </div>
  );
};

export default RecordList;