import React from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import "./Whatsapp.css";
import avatarImage from "../image/fav.png";
const Whatsapp = () => {
  return (
    <FloatingWhatsApp
      phoneNumber="+85266055193"
      accountName="Grab & Go"
      avatar={avatarImage}
      statusMessage="在線"
      chatMessage="你好，有咩可以幫到你？"
      placeholder="輸入訊息"
      allowClickAway={true}
      //allowEsc={true}
      chatboxHeight={285}
      notificationStyles={{ backgroundColor: "#white" }}
      buttonStyle={{
        backgroundColor: "#705B38",
        width: "40px",
        height: "40px",
        bottom: "30px",
        right: "30px",
        transform: "translate(50%, 50%)",
      }}
      chatboxStyle={{ bottom: "50px", right: "50px" }}
      style={{ width: "0", height: "0", position: "absolute", zIndex: 1200 }}
    />
  );
};
export default Whatsapp;