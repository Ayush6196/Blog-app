import React from 'react'
import Header from './Header'
import Hero from '../Home/Hero'
import Trending from '../Home/Trending'
import Devotional from '../Home/Devotional'
import Creator from '../Home/Creator'

const Home = () => {
  <Header/>
  return (
   
    <div>
      
      <Hero/>
      <Trending/>
      <Devotional/>
      <Creator/>
      </div>
  )
}

export default Home