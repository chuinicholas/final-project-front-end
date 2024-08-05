import styles from "./shoppingCart.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import ShoppingCartList from "./ShoppingCartList";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import emptyCart from "../image/empty.png";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function ShoppingCart({
  chosenFoods,
  delFood,
  delAllFood,
  addItem,
  delItem,
}) {
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
  const handleScrollToTop = (num, str) => {
    window.scrollTo({
      top: num,
      behavior: str
    });
  };
  function handleClose() {
    setIsOpen(false);
  }
  function handleComfirm() {
    handleScrollToTop(0, 'auto');
    setIsOpen(false);
  }
  function handleClear() {
    // TODO pop-up window to comfrim delete
    delAllFood();
  }
  function handleToFoodMenu() {
    setTimeout(() => {
      handleScrollToTop(900, 'smooth');
    }, 100) 
    setIsOpen(false);
  }

  function totalQty() {
    let count = 0;
    for (let i = 0; i < chosenFoods.length; i++) {
      count += chosenFoods[i]["quantity"];
    }
    return count;
  }
  function countTotalItem(chosenFoods) {
    let totalItem = 0;
    chosenFoods.map((foodItem, index) => {
      totalItem += foodItem.quantity
    })
    return(totalItem)
  }

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: "3px",
      top: '0px',
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
      backgroundColor: "#ffa1a1",
      color: "#000000",
    },
  }));

  return (
    <div className={styles.bgContainer}>
      <div className={styles.div_shoppingCart}>
        <button
          onClick={toggleDrawer(true)}
          className={styles.btn_shoppingCart}
        >
          <IconButton className={styles.cartBtn} aria-label="cart">
            <StyledBadge badgeContent={totalQty()} /* color="primary" */ >
              <ShoppingCartIcon sx={{ fontSize: 30 }} className={styles.img_cartBtn}/>
            </StyledBadge>
          </IconButton>
          <label className={styles.lbl_shoppingCart}>購</label>
          <label className={styles.lbl_shoppingCart}>物</label>
          <label className={styles.lbl_shoppingCart}>車</label>
        </button>
      </div>
        <Drawer
          classes={{ paper: styles.drawerPaper }}
          anchor="right"
          open={isOpen}
          onClose={toggleDrawer(false)}
        >
          <div className={styles.drawerContent}>
            {chosenFoods.length === 0 ? 
              (<div className={styles.emptyCart}>
                <img src={emptyCart} alt="Empty Cart" />
                <strong>
                  <p>購物車內未有任何項目</p>
                  <p>立即選購心水食品</p>
                </strong>
                <Link to="/home">
                  <button onClick={() => handleToFoodMenu()}>瀏覽餐牌</button>
                </Link>
              </div>):
              (<div className={styles.notEmptyCart}>
                <div className ={styles.header}>
                  <div className ={styles.shoppingCartInfo}>
                    <label className={styles.infoTitle}>共</label>
                    <div className={styles.infoNum}>{countTotalItem(chosenFoods)}</div>
                    <label className={styles.infoTitle}>件</label>
                  </div>
                  <div className={styles.controlPanel}>
                    <Link to="/cart" className={styles.btnComfirm} onClick={() => handleComfirm()}>
                      <ShoppingCartCheckoutIcon className={styles.img_btnComfirm}/>
                      <label className={styles.lbl_btnComfirm}>下單</label>
                    </Link>
                    <button className={styles.btnClear} onClick={() => handleClear()}>
                      <DeleteForeverIcon className={styles.img_btnClear}/>
                      <label className={styles.lbl_btnClear}>全部清除</label>
                    </button>
                    <button className={styles.btnClose} onClick={() => handleClose()}>
                      <HighlightOffIcon className={styles.img_btnClose}/>
                      <label className={styles.lbl_btnClose}>關閉</label>
                    </button>
                    {/* <Link to="/home" className={styles.btn_ToFoodMenu} onClick={() => handleToFoodMenu()}></Link> */}
                  </div>
                </div>
                <div className={styles.CartList}>
                {chosenFoods
                  .filter(item => item.chineseName && item.foodPic && item.price)
                  .map((item, index) => (
                    <ShoppingCartList
                      key={index}
                      id={index}
                      chineseName={item.chineseName}
                      foodPic={item.foodPic}
                      price={item.price}
                      quantity={item.quantity}
                      delFood={delFood}
                      addItem={addItem}
                      delItem={delItem}
                    />
                  ))
                }
                </div>
              </div>)}
          </div>
        </Drawer>
      {/* </div> */}
    </div>
  );
}
