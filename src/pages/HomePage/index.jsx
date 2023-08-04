import { useEffect, useState } from "react";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";
import { productsApi } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export const HomePage = () => {
   const [productList, setProductList] = useState([]);
   const localCartList = localStorage.getItem("@CARTLIST");
   const [isVisible, setVisible] = useState(false);
   const [search, setSearch] = useState("");   
   const [cartList, setCartList] = useState(
      localCartList ? JSON.parse(localCartList) : []
   );
   
   const searchResult = productList.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()) || product.category.toLowerCase().includes(search.toLowerCase()));
   const renderList = search ? searchResult : productList;

   const cleanFilter = () => {
      setSearch("")
   };

   useEffect(() => {
      localStorage.setItem("@CARTLIST", JSON.stringify(cartList));
   }, [cartList]);

   useEffect(() => {
      const getProducts = async () => {
         try {
            const { data } = await productsApi.get("products");      
            setProductList(data);
         } catch (error) {            
            toast.error(error.message)
         };
      };
      getProducts()
   }, []);  
   
   const addProductToCart = (productData) => {
      const addProduct = {...productData};
      if (!cartList.some((product) => product.id === addProduct.id)) {
         setCartList([...cartList, addProduct]);
         toast.success(`${addProduct.name} foi adicionado ao seu carrinho`)
      } else {
         toast.error(`${addProduct.name} já está em seu carrinho`)
      };
   };

   return (
      <>
         <Header 
            setVisible={setVisible} 
            cartList={cartList}
            search={search}
            setSearch={setSearch}
            cleanFilter={cleanFilter}/>
         <main>            
            <ProductList                
               renderList={renderList}               
               addProductToCart={addProductToCart}/>  
         </main>
         {isVisible ? <CartModal cartList={cartList} setCartList={setCartList} setVisible={setVisible}/> : null}
         <ToastContainer position="bottom-right" autoClose={2 * 1000} />
      </>
   );
};
