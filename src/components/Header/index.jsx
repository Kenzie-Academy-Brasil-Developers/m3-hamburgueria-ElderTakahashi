import { useState } from "react";
import { MdSearch, MdShoppingCart } from "react-icons/md";
import Logo from "../../assets/Logo.svg";
import styles from "./style.module.scss";

export const Header = ({ setVisible, cartList, search, setSearch, cleanFilter }) => {
   const [value, setValue] = useState("");

   const submit = (event) => {
      event.preventDefault();
      setSearch(value);
      setValue("");
   };
   
   return (
      <header>
         <div className="container">
            <div className={styles.logoBox}>
               <img src={Logo} alt="Logo Kenzie Burguer" />
               <button className="cart" onClick={() => setVisible(true)}>                  
                  <MdShoppingCart size={25} color="grey" opacity={0.5}/>
                  <span className="body bolder">{cartList.length}</span>
               </button>
            </div>                           
            <form className={styles.formBox} onSubmit={submit}>
               <input
                  type="text"
                  value={value}
                  placeholder="Digitar pesquisa"
                  onChange={(event) => setValue(event.target.value)}
                  required
               />
               {search.length > 0 ? <span onClick={cleanFilter}>Limpar filtro</span> : null}               
               <button className="search" type="submit">
                  <MdSearch size={21} color="white"/>
               </button>
            </form>            
         </div>
      </header>
   );
};
