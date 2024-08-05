import styles from "./Root.module.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router";
import Header from "./Header";
import ShoppingCart from "./components/shoppingCart";
import Whatsapp from "./components/Whatsapp";
import Footer from "./Footer";
import { AuthProvider } from "./components/contexts/AuthContext";

const Root = () => {
  const [chosenFoods, setChosenFoods] = useState([]);
  const [isBlankPage, setIsBlankPage] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [shoppingDataPool, setShoppingDataPool] = useState({});
  const [currentNews, setCurrentNews] = useState("");
  const [favouriteFood, setFavouriteFood] = useState([]);
  const outletContextObj = { 'addFood': addFood, 'chosenFoods': chosenFoods, 
    'isBlankPage': [isBlankPage, setIsBlankPage], 'clientSecret': [clientSecret, setClientSecret],
    'shoppingDataPool': [shoppingDataPool, setShoppingDataPool], 'currentNews': [currentNews, setCurrentNews],
    'favouriteFood': [favouriteFood, setFavouriteFood]};
  
  /* const navigate = useNavigate();
  useEffect(() => {
    navigate('/home')
  },[]) */

  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  function addFood(chineseName, price, foodPic) {
    setChosenFoods((prevFoods) => {
      const existingFoodIndex = prevFoods.findIndex(
        (food) => food.chineseName === chineseName
      );
      if (existingFoodIndex !== -1) {
        // Chinese name already exists, update the quantity of the existing object
        const updatedFoods = [...prevFoods];
        updatedFoods[existingFoodIndex].quantity += 1;
        return updatedFoods;
      } else {
        // Chinese name doesn't exist, add the new object to the array
        const newFood = {
          chineseName: chineseName,
          price: price,
          foodPic: foodPic,
          quantity: 1,
        };
        return [...prevFoods, newFood];
      }
    });
  }
  function delFood(id) {
    setChosenFoods((prevFoods) => {
      return prevFoods.filter((item, index) => {
        return index !== id;
      });
    });
  }
  function delAllFood() {
    setChosenFoods([])
  }
  function addItem(id) {
    const updatedFoods = [...chosenFoods];
    updatedFoods[id].quantity += 1;
    setChosenFoods(updatedFoods);
  }
  function delItem(id) {
    if (chosenFoods[id].quantity > 1) {
      const updatedFoods = [...chosenFoods];
      updatedFoods[id].quantity -= 1;
      setChosenFoods(updatedFoods);
    } else {
      delFood(id);
    }
  }

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };

  return (
    <AuthProvider>
      {isBlankPage ? 
      (<><Outlet context={[outletContextObj]} /></>) :
      (<><div className={styles.header}>
        <Header scrollPosition_root={scrollPosition} chosenFoods={chosenFoods} />
      </div>
      <div className={styles.outlet}>
        <Outlet context={[outletContextObj]} />
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
      <ShoppingCart
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
        chosenFoods={chosenFoods}
        delFood={delFood}
        delAllFood={delAllFood}
        addItem={addItem}
        delItem={delItem}
      />
      <Whatsapp />
      </>)
      }
    </AuthProvider>
  );
};
export default Root;
