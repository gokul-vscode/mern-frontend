import React from 'react'
import Banner from '../../Components/Home/Banner/Banner'
import Products from '../../Components/Home/Products/Products'
import HomeSwiper from '../../Components/Home/HomeSwiper/HomeSwiper'
const HomePage = ({ searchTerm }) => {
  return (
    <div>
      <HomeSwiper/>
        <Banner  searchTerm={searchTerm} />
        <Products/>
        
    </div>
  )
}

export default HomePage