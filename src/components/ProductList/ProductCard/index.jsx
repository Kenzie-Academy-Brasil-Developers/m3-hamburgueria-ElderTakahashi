import styles from "./style.module.scss";

export const ProductCard = ({ product, addProductToCart }) => {
    return(
        <li className={styles.cardBox}>            
            <img src={product.img} alt={product.name} />            
            <div>
                <h3 className="title three">{product.name}</h3>
                <span className="caption gray3">{product.category}</span>
                <span className="body primary">{product.price.toLocaleString('pt-BR', { style: "currency", currency: "BRL"})}</span>
                <button className="addToCart" onClick={() => addProductToCart(product)}>Adicionar</button>
            </div>
        </li>
    );
};