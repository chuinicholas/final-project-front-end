import styles from "./CartList.module.css";

export default function CartList({ chineseName, foodPic, quantity, price }) {
  return (
    <div className={styles.shoppingCartItem}>
      <img className={styles.itemImage} src={foodPic} alt="" />
      <div className={styles.itemDetails}>
        <div className={styles.itemName}>{chineseName}</div>
        <div className={styles.itemQuantityPrice}>
          <div className={styles.itemQuantity}>
            <span>QTY</span>
            <span>{quantity}</span>
          </div>
        </div>
        <div className={styles.itemPrice}>$ {price * quantity}</div>
      </div>
    </div>
  );
}
