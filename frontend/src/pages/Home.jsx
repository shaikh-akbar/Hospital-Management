import React from 'react'
import Hero from '../components/Hero'
import Biography from '../components/Biography'
import Department from '../components/Department'
import MessageForm from '../components/MessageForm'

const Home = () => {
  return (
    <>
    <Hero title={'Welcome to Our Al-Akbar HealthCare Institute | Your Trusted GealthCare Provider'} imageUrl={'/hero.png'}/>
    <Biography imageUrl={'/about.png'}/>
    <Department />
    <MessageForm />
    
    </>
  )
}

export default Home