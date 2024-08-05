import React from "react";
import styles from "./Footer.module.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <button className={styles.backToTop} onClick={scrollToTop}>
        回到頂端 ↑
      </button>
      <div className={styles.links}>
        <a href="/privacy">條款及細則</a>
        <a href="/location">分店位置</a>
        <a href="/about">聯絡我們: 24567289</a>
      </div>
      <div className={styles.socialIcons}>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookIcon />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon />
        </a>
      </div>
      <div className={styles.paymentMethods}>
        <img
          src="https://order.sen-ryo.com.hk/_next/static/media/Icon_VISA@3x.3ca71c8e.png?w=384&q=100"
          alt="Visa"
          className={styles.paymentLogo}
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
          alt="MasterCard"
          className={styles.paymentLogo}
        />
        <img
          src="https://order.sen-ryo.com.hk/_next/static/media/Icon_AE@3x.b4f550b9.png?w=256&q=100"
          alt="American Express"
          className={styles.paymentLogo}
        />
      </div>
      <div className={styles.copyright}>
        &copy; {currentYear} Grab & Go. 
      </div>
    </footer>
  );
};

export default Footer;