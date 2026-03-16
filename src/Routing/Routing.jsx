import React,{useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import HomePage from "../Pages/HomePage/HomePage";
import ProductDetails from "../Components/Home/ProductDetails/ProductDetails";
import Auth from '../Auth/Auth'
import ChockOut from '../Components/Main/CheckOut/CheckOut'

const Routing = () => {
 
const [searchTerm, setSearchTerm] = useState("");
  return (
    <BrowserRouter>

      <Navbar setSearchTerm={setSearchTerm}/>

      <Routes>
        <Route path="/" element={<HomePage searchTerm={searchTerm}/>} />
        <Route path="/product/:id" element={<ProductDetails />} />
        < Route path="/auth" element={<Auth />}/>
        <Route path="/checkout" element={<ChockOut/>}/>
      </Routes>

      <Footer />

    </BrowserRouter>
  );
};

export default Routing;