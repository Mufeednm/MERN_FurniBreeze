import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import DisplayProduct from './pages/DisplayProduct'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Homepage from './components/Homepage'
import Payment from './components/Payment'
import Beds from './pages/Beds'
import Chairs from './pages/Chairs'
import Sofas from './pages/Sofas'
import Table from './pages/Table'
import Wardrobes from './pages/Wardrobes'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Cart from './components/Cart'
import Search from './components/Search'
import AdminPage from './Admin/AdminPage'
import AdminLogin from './Admin/AdminLogin'
import UserContextProvider from './Globalcontext/UserContextprovider'
import UsersList from './Admin/Userslist'
import ProductEdit from './Admin/Productedit'
import AdminProductEdit from './Admin/Adminproductedit'
import AddProduct from './Admin/Addproduct'
import OrderList from './Admin/OrderList'
import UserOrder from './components/Userorder'
import PrivateRoute from './Admin/PrivateRoute'
import UseeContext from './Globalcontext/UseConstext'


const App = () => {

  
  return (
    <div>
   
     
        <Routes>
          <Route path='/' element={<Homepage />} />
          {/* Admin pages */}
          <Route path='/AdminLogin' element={<AdminLogin />} />
          <Route path='/Addproduct' element={<PrivateRoute element={AddProduct} />} />
          <Route path='/AdminPage' element={<PrivateRoute element={AdminPage} />} />
          <Route path='/Userslist' element={<PrivateRoute element={UsersList} />} />
          <Route path='/Adminproductedit/:id' element={<PrivateRoute element={AdminProductEdit} />} />
          <Route path='/Productedit' element={<PrivateRoute element={ProductEdit} />} />
          <Route path='/Payment' element={<Payment />} />
          <Route path='/Orders' element={<PrivateRoute element={OrderList} />} />
          {/* Product pages */}
          <Route path='/Beds' element={<Beds />} />
          <Route path='/Chairs' element={<Chairs />} />
          <Route path='/Sofas' element={<Sofas />} />
          <Route path='/Table' element={<Table />} />
          <Route path='/Wardrobes' element={<Wardrobes />} />
          {/* User pages */}
          <Route path='/Signin' element={<Signin />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/Userorder' element={<UserOrder />} />
          <Route path='/Search/:term' element={<Search />} />
          <Route path='/:id' element={<DisplayProduct />} />
        </Routes>

  
    </div>
  )
}

export default App
