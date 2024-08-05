import styles from "./Cart.module.css";
import { Link, useOutletContext, useNavigate} from "react-router-dom";
import CartList from "../components/CartList";
import React, { useState, useEffect, useRef } from "react";
import shopLocation from "../JS_Data/shopLocation";
import { useAuth } from "../components/contexts/AuthContext";

const memberDiscount = 0.8;

const Cart = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [typedEmail, setTypedEmail] = useState("");
  const [isOpeneded, setIsOpeneded] = useState(false);
  const [outletContextObj] = useOutletContext();
  const chosenFoods = outletContextObj['chosenFoods'];
  const setIsBlankPage = outletContextObj['isBlankPage'][1];
  const shoppingDataPool = outletContextObj['shoppingDataPool'][0];
  const setShoppingDataPool = outletContextObj['shoppingDataPool'][1];
  const { currentUser } = useAuth();
  const inputEmailRef = useRef();
  const navigate = useNavigate();

  function showCartItem(chosenFoods) {
    return chosenFoods.map((foodItem, index) => (
      <CartList 
        key={index}
        chineseName={foodItem.chineseName}
        foodPic={foodItem.foodPic}
        price={foodItem.price}
        quantity={foodItem.quantity}
      />
    ));
  }
  function countTotalPrice(chosenFoods) {
    let totalPrice = 0;
    chosenFoods.map((foodItem, index) => {
      totalPrice += foodItem.price * foodItem.quantity
    })
    return(totalPrice)
  }
  function countTotalItem(chosenFoods) {
    let totalItem = 0;
    chosenFoods.map((foodItem, index) => {
      totalItem += foodItem.quantity
    })
    return(totalItem)
  }
  function countDiscount(chosenFoods) {
    let discount = 0;
    discount = countTotalPrice(chosenFoods) * (1 - memberDiscount).toFixed(2)
    return(discount)
  }
  function getDate() {
    let dateObj = new Date();
    let year = dateObj.getFullYear();
    let month = String(dateObj.getMonth() + 1).padStart(2, '0');
    let day = String(dateObj.getDate()).padStart(2, '0');
    let hour = String(dateObj.getHours()).padStart(2, '0');;
    let minute = String(dateObj.getMinutes()).padStart(2, '0');;
    let second = String(dateObj.getSeconds()).padStart(2, '0');;
    let output = `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
    return output
  }
  function handleDropdownButton() {
    setIsOpeneded(! isOpeneded)
  }
  function handleDropdownItem(loction) {
    setIsOpeneded(! isOpeneded)
    setSelectedLocation(loction)
  }
  const handleScrollToTop = (num, str) => {
    window.scrollTo({
      top: num,
      behavior: str
    });
  };
  async function handleProceedButton() {
    if(selectedLocation === "") {
      alert('請選擇店舖')
      return
    } else {
      if(currentUser) {
        let data = {
          'order': chosenFoods,
          'location': selectedLocation,
          'totalPrice': (countTotalPrice(chosenFoods) - countDiscount(chosenFoods)),
          'time': getDate(),
          'email': currentUser.email,
        }
        //console.log(data)
        setShoppingDataPool(data)
        setIsBlankPage(true)
        navigate('/pay')
      } else {
        setIsBlankPage(true)
        navigate('/pay')
      }
    }
    /* if(selectedLocation === "" || inputEmailRef.current.value === "") {
      if(selectedLocation === "" && inputEmailRef.current.value === "") {
        alert('Please select a shop and type your email')
      } else if(selectedLocation === "") {
        alert('Please select a shop')
      } else if(inputEmailRef.current.value === "") {
        alert('Please type you email')
      } 
      return
    } else {
      if(currentUser) {
        let data = {
          'order': chosenFoods,
          'location': selectedLocation,
          'totalPrice': countTotalPrice(chosenFoods),
          'time': getDate(),
          'email': currentUser.email,
        }
        console.log(data)
        setShoppingDataPool(data)
        setIsBlankPage(true)
        navigate('/pay')
      } else {
        let data = {
          'order': chosenFoods,
          'location': selectedLocation,
          'totalPrice': countTotalPrice(chosenFoods),
          'time': getDate(),
          'email': inputEmailRef.current.value,
        }
        setShoppingDataPool(data)
        setIsBlankPage(true)
        navigate('/pay')
      }
    } */
  }
  function handleContinueButton() {
    setTimeout(() => {
      handleScrollToTop(900, 'smooth');
    }, 100) 
  }

  return (<>
    <div className={styles.cartContainer}>
      <div className={styles.leftContainer}>
        {/* <div className={styles.typeEmail}>
          <h2 className={styles.emailTitle}>Type Your Email</h2>
          <input ref={inputEmailRef} className={styles.ipt_email}></input>
        </div> */}
        <div className={styles.pickShop}>
          <h2 className={styles.pickShopTitle}>選擇店舖</h2>
          {!isOpeneded && selectedLocation ?
          (<button onClick={() => handleDropdownButton()} className={styles.dropdownButton_S}>
            <label className={styles.lbl_dropdownButton_S}>
              {selectedLocation === "" ? "請選擇" : selectedLocation}
            </label>
            <div className={styles.svg_dropdownButton_S}>
              <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
              </svg>
            </div>
          </button>) :
          (<button onClick={() => handleDropdownButton()} className={styles.dropdownButton}>
            <label className={styles.lbl_dropdownButton}>
              {selectedLocation === "" ? "請選擇" : selectedLocation}
            </label>
            <div className={styles.svg_dropdownButton}>
              <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
              </svg>
            </div>
          </button>)
          }
          {isOpeneded && 
          (<div className={styles.dropdownMenu}>
            <ul>
              {shopLocation.map((loction, index) => (
                <li key={index}>
                  <button onClick={() => handleDropdownItem(loction)} className={styles.btn_location}>{loction}</button>
                </li>
              ))}
            </ul>
          </div>)}
        </div>
        <div className={styles.orderSummary}>
          <h2 className={styles.orderSummaryTitle}>訂單總結</h2>
          <div className={styles.summaryItem}>
            <span>總項目:</span>
            <span>{countTotalItem(chosenFoods)}</span>
          </div>
          <div className={styles.summaryItem}>
            <span>小計:</span>
            <span>${countTotalPrice(chosenFoods)}</span>
          </div>
          <div className={styles.summaryItem}>
            <span>折扣: 會員自取8折</span>
            <span>-${countDiscount(chosenFoods).toFixed(2)}</span>
          </div>
          <hr className={styles.hr}/>
          <div className={styles.summaryItem}>
            <span>總數:</span>
            <span>${countTotalPrice(chosenFoods) - countDiscount(chosenFoods)}</span>
          </div>
          <div className={styles.summaryItem}>*美食於付款確定後15分鐘可取</div>
          <div className={styles.summaryButtons}>
            <button className={styles.proceedButton} onClick={() => handleProceedButton()}>
              前住付款
            </button>
            <Link to="/home" className={styles.continueButton} onClick={() => handleContinueButton()}>
              繼續購物
            </Link>
          </div>
        </div>
        {/* <div className={styles.pickPaymentMethod}>
          <h2>Pick a Payment Method</h2>
          <div className={styles.selectContainer}>
            <div className="flex items-center">
              <input id="country-option-1" type="radio" name="countries" value="Visa" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"/>
              <label className="block ms-2  text-sm font-medium text-gray-900">
                Visa
              </label>
            </div>
            <div className="flex items-center">
              <input id="country-option-2" type="radio" name="countries" value="Mastercard" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"/>
              <label className="block ms-2  text-sm font-medium text-gray-900">
                Mastercard
              </label>
            </div>
            <div className="flex items-center">
              <input id="country-option-3" type="radio" name="countries" value="American Express" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"/>
              <label className="block ms-2  text-sm font-medium text-gray-900">
                American Express
              </label>
            </div>
          </div>
        </div> */}
      </div>
      <div className={styles.shoppingCard_container}>
        <div className={styles.shoppingCard}>{/* {showCartItem(chosenFoods)} */}
          <h2 className={styles.shoppingCardTitle}>訂單詳情</h2>
          {chosenFoods.map((foodItem, index) => (
            <CartList 
              key={index}
              chineseName={foodItem.chineseName}
              foodPic={foodItem.foodPic}
              price={foodItem.price}
              quantity={foodItem.quantity}
            />
          ))}
        </div>
      </div>
    </div>
  </>);
};

export default Cart;