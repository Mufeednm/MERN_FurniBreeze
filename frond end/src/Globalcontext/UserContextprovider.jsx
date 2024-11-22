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
    const [cartitems, setCartitems] = useState([]);
    const [orderDetails, setOrderDetails] = useState(null);
    const [adminuser, setAdminuser] = useState(null);

 useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const response = await axios.get('http://localhost:3000/api/users/products');
        const response = await axios.get('https://mern-furnibreeze.onrender.com/api/users/products');
       
        setProducts(response.data.allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(()=>{
    const token = localStorage.getItem('adminToken')
    if (token) {
      setAdminuser({ isAdmin: true })
    }
  },[])
  const login = (token) => {
    localStorage.setItem('adminToken', token)
    setAdminuser({ isAdmin: true })
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    setAdminuser(null)
  }
  
    return(
        <UseeContext.Provider value={[user,setUser,logins,setLogins,cart,setCart,mydata,setMydata,render,setRender ,products,setProducts,cartitems, setCartitems,orderDetails, setOrderDetails,adminuser, setAdminuser,login,logout]}>
            {children}
        </UseeContext.Provider>
    )
     
}
export default UserContextprovider