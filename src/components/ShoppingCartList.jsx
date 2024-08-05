import styles from "./ShoppingCartList.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
const ShoppingCartList = ({
  id,
  chineseName,
  foodPic,
  price,
  quantity,
  delFood,
  addItem,
  delItem,
}) => {
  return (
    <div>
      <div className={styles.shoppingCard}>
        <div className={styles.shoppingCartItem}>
          <img src={foodPic} className={styles.itemImage} alt="" />
          <div className={styles.itemDetails}>
            <div className={styles.itemName}>{chineseName}</div>
            <div className={styles.itemQuantityPrice}>
              <div className={styles.itemQuantity}>
                <button onClick={() => delItem(id)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => addItem(id)}>+</button>
              </div>
              <div className={styles.itemPrice}>${price * quantity}</div>
            </div>
            <div className={styles.favRemove}>
              <button onClick={() => delFood(id)} className={styles.removeButton}>
                <DeleteIcon className={styles.img_removeButton}/>
                <label className={styles.lbl_removeButton}>刪除</label>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShoppingCartList;
