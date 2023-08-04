import { MdClose } from "react-icons/md";
import { CartItemCard } from "./CartItemCard";
import styles from "./style.module.scss"
import { useEffect } from "react";
import { toast } from "react-toastify";

export const CartModal = ({ cartList, setCartList, setVisible }) => {
   const total = cartList.reduce((prevValue, product) => {
      return prevValue + product.price;
   }, 0);

   const removeProductFromCart = (removeId) => {
      const productToRemove = cartList.find((product) => product.id === removeId);
      const newCartList = cartList.filter((product) => product.id !== removeId);
      setCartList(newCartList);
      toast.success(`${productToRemove.name} foi removido do seu carrinho`);        
   };

   const removeAllProductsFromCart = () => {
      setCartList([]);
      toast.success("Todos os itens foram removidos do seu carrinho");
   };

   useEffect(() => {
      const handleKeyDown = (event) => {
         if (event.key === "Escape") {
            setVisible(false);
         };
      };   
      document.addEventListener("keydown", handleKeyDown);   
      return () => {
         document.removeEventListener("keydown", handleKeyDown);
      };
   }, []);

   return (
      <div className={styles.modalOverlay} role="dialog" onClick={(event) => {
         if (event.target === event.currentTarget) {
            setVisible(false);
         }
      }}>
         <div className={styles.modal}>
            <div>
               <h2>Carrinho de compras</h2>
               <button className="closeModal" aria-label="close" title="Fechar" onClick={() => setVisible(false)}>
                  <MdClose size={24} color="white"/>
               </button>
            </div>
            <div>
               <ul>
                  {cartList.length > 0 ? (
                     cartList.map((product) => (
                        <CartItemCard key={product.id} product={product} removeProductFromCart={removeProductFromCart}/>
                     ))                     
                  ) : (
                     <h3 className="title three">Nenhum item adicionado</h3>
                  )}
               </ul>
            </div>
            <div>
               <div>
                  <span className="body">Total</span>
                  <span className="body">{total.toLocaleString('pt-BR', { style: "currency", currency: "BRL"})}</span>
               </div>
               <button className="removeAll" onClick={() => removeAllProductsFromCart()}>Remover todos</button>
            </div>
         </div>
      </div>
   );
};
