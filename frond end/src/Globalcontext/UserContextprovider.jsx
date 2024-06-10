import React, { useEffect, useState } from "react";
import UseeContext from "./UseConstext";
import { DummyProducts } from "../pages/data";
import axios from "axios";
const UserContextprovider = ({children})=>{
    const [user,setUser]=useState([])
    const [logins,setLogins]=useState(null)
    const [cart,setCart]=useState([])
    const [mydata,setMydata]=useState({})
    const [render,setRender]=useState(false)
    const [products,setProducts]=useState([])

 useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users/products');
        console.log(response, "hell");
        setProducts(response.data.allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

    return(
        <UseeContext.Provider value={[user,setUser,logins,setLogins,cart,setCart,mydata,setMydata,render,setRender ,products,setProducts]}>
            {children}
        </UseeContext.Provider>
    )
     
}
export default UserContextprovider