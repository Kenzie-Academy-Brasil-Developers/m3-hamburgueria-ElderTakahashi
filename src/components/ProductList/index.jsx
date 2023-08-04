import { ProductCard } from "./ProductCard";
import styles from "./style.module.scss";

export const ProductList = ({ addProductToCart, renderList}) => {
   return (
      <div className="container overflowX">         
         {renderList.length > 0 ? (
            <ul className={styles.productsListBox}>
               {renderList.map((product) => (
                  <ProductCard key={product.id} product={product} addProductToCart={addProductToCart} renderList={renderList}/>
               ))}            
            </ul>
         ) : (
            <h2 className="title two">Nenhum resultado encontrado</h2>
         )}
      </div>      
   );
};
