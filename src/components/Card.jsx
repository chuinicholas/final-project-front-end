import React, { useState, useEffect } from "react";
import styles from "./Card.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Zoom from "@mui/material/Zoom";
import { useOutletContext } from "react-router-dom";
import { useAuth } from "../components/contexts/AuthContext";

function Card({ foodPic, chineseName, englishName, price, isFav_P }) {
  const { currentUser } = useAuth();
  const [outletContextObj] = useOutletContext();
  const addFood = outletContextObj["addFood"];
  const setFavouriteFood = outletContextObj['favouriteFood'][1];
  const [isFav, setIsFav] = useState(false);
  //const [userFav, setUserFav] = useState([]);

  /* useEffect(() => {
    async function fetchUserFav() {
      try {
        const res = await fetch(
          `http://localhost:3001/userFav/?email=${currentUser.email}`
        );
        const result = await res.json();
        //setUserFav(result[0]["favouriteItem"]);
        // Logic to check if the current food item is liked
        const isLiked = result[0]["favouriteItem"].some(
          (item) => item.chineseName === chineseName
        );
        console.log(result[0]["favouriteItem"])
        setFavouriteFood(result[0]["favouriteItem"])
        setIsFav(isLiked);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserFav();
  }, [currentUser, chineseName]); */
  /* async function favFood() {
    console.log(isFav)
    setIsFav((prevState) => !prevState);
  }*/

  useEffect(() => {
    async function fetchUserFav() {
      try {
        const res = await fetch(
          `http://localhost:3001/userFav/?email=${currentUser.email}`
        );
        const result = await res.json();
        console.log(result[0]["favouriteItem"])
        setFavouriteFood(result[0]["favouriteItem"])
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserFav();
  }, [isFav]);

  useEffect(() => {
    setIsFav(isFav_P);
  }, [isFav_P])

  async function addFav(chineseName, price, foodPic) {
    try {
      let favItem = {
        email: currentUser.email,
        chineseName: chineseName,
        price: price,
        foodPic: foodPic,
      };
      const result = await fetch("http://localhost:3001/addFavItem", {
        method: "PATCH",
        body: JSON.stringify(favItem),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsFav(!isFav);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFav(chineseName, price, foodPic) {
    try {
      let favItem = {
        email: currentUser.email,
        chineseName: chineseName,
        price: price,
        foodPic: foodPic,
      };
      const result = await fetch("http://localhost:3001/removeFavItem", {
        method: "PATCH",
        body: JSON.stringify(favItem),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsFav(!isFav);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.productBox}>
        <div>
          <img className={styles.productPic} src={foodPic} alt="" />
        </div>
        <div>
          <p className={styles.chineseName}>{chineseName}</p>
          {/* <p className={styles.englishName}>{englishName}</p> */}
          <p className={styles.price}> ${price}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              gap: "30px",
            }}
          >
            {currentUser ? (
              <div /* onClick={favFood} */>
                {isFav ? (
                  <FavoriteIcon
                    onClick={() => removeFav(chineseName, price, foodPic)}
                  />
                ) : (
                  <FavoriteBorderIcon
                    onClick={() => addFav(chineseName, price, foodPic)}
                  />
                )}
              </div>
            ) : null}
            <Zoom in={true}>
              <Fab
                onClick={() => addFood(chineseName, price, foodPic)}
                size="small"
                aria-label="add"
              >
                <AddIcon />
              </Fab>
            </Zoom>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
