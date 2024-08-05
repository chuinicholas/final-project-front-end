import React, { useState, useEffect } from "react";
import styles from "./LuckyDraw.module.css";
import Card from "./Card";
import luckyDrawPic from "../image/luckyDraw.png";
import ConfettiExplosion from "react-confetti-explosion";

function LuckyDraw() {
  const [allProducts, setAllProducts] = useState([]);
  const [randomNumber, setRandomNumber] = useState(0);
  const [isExploding, setIsExploding] = useState(false);

  function handleTheScroll() {
    setIsExploding(true);
  }

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const res = await fetch("http://localhost:3001/allproducts");
        const result = await res.json();
        setAllProducts(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllProducts();
  }, []);

  useEffect(() => {
    function handleScroll() {
      // Generate a new random number when the div is scrolled
      const newRandomNumber = Math.floor(Math.random() * allProducts.length);
      setRandomNumber(newRandomNumber);
    }

    document
      .querySelector(`.${styles.container}`)
      .addEventListener("scroll", handleScroll);

    return () => {
      document.querySelector(`.${styles.container}`);
      // .removeEventListener("scroll", handleScroll);
    };
  }, [allProducts]);
  
  return (
    <div onScroll={handleTheScroll} className={styles.container}>
      <div className={styles.cover}>
        <h3>諗唔到食乜？</h3>
        <img src={luckyDrawPic} alt="luckyDrawPic" />
      </div>
      {allProducts.length > 0 && (
        <div className={styles.card}>
          {isExploding ? (
            <ConfettiExplosion
              style={{ position: "relative", left: "150px", top: "100px" }}
              width={1600}
              duration={2000}
              onComplete={() => setIsExploding(false)}
              particleCount={200}
            />
          ) : null}
          <Card
            foodPic={allProducts[randomNumber]["img_url"]}
            chineseName={allProducts[randomNumber]["name_c"]}
            price={allProducts[randomNumber]["price"]}
          />
        </div>
      )}
      <div className={styles.innerBox}></div>
    </div>
  );
}

export default LuckyDraw;
