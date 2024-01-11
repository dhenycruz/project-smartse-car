import Header from '@/components/Header'
import React from 'react'

const Home = (): React.ReactElement => {
  return (
    <>
      <Header />
      <h1>Home</h1>
    </>
  )
}

Home.auth = true

export default Home
