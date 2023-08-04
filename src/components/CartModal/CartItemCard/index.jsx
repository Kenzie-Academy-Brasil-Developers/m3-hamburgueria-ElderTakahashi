import { MdDelete } from "react-icons/md";
import styles from "./style.module.scss";

export const CartItemCard = ({ product, removeProductFromCart }) => {
   return (
      <li className={styles.productBox}>
         <div>
            <img src={product.img} alt={product.name} />
            <h3 className="title three">{product.name}</h3>
         </div>
         <button className="removeFromCart" aria-label="delete" title="Remover item" onClick={() => removeProductFromCart(product.id)}>
            <MdDelete size={21} />
         </button>
      </li>
   );
};
