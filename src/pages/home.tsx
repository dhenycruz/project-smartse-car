import Header from '@/components/Header'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { type Cars } from '@prisma/client'
import Card from '@/components/Header/Card'

const Home = (): React.ReactElement => {
  const { data, isLoading } = useQuery({
    queryKey: ['cars'],
    queryFn: async () => {
      return await axios.get('/api/cars')
        .then(({ data }) => data)
    }
  })
  return (
    <>
      <Header />
      <h1>Home</h1>
      <hr className='mb-4'/>
      {
        (!isLoading)
          ? (
          <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 place-items-center '>
            {
              data.map((car: Cars) => (
                  <Card key={car.id} {...car} />
              ))
            }
          </div>
            )
          : <h1>testando</h1>
      }
    </>
  )
}

Home.auth = true

export default Home
