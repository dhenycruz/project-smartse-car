import Header from '@/components/Header'
import React, { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { type Cars } from '@prisma/client'
import Card from '@/components/Card'
import CreateCar from '@/components/CreateCar'

const Home = (): React.ReactElement => {
  const [openAddCar, setOpenAddCar] = useState(false)

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['cars'],
    queryFn: async () => {
      return await axios.get('/api/cars')
        .then(({ data }) => data)
    }
  })

  const deleteCar = useMutation({
    mutationFn: async (id) => {
      const url = `/api/cars/${String(id)}`
      return await axios.delete(url)
    },
    onSuccess: () => {
      void refetch()
    }
  })

  const createCar = useMutation({
    mutationFn: async (car) => {
      return await axios.post('/api/cars', car)
    },
    onSuccess: () => {
      void refetch()
    }
  })

  return (
    <>
      <Header />
      <main className='pr-10 pl-10'>
        <div className='flex items-center justify-between mb-2 mt-2'>
          <h1>Home</h1>
          {
          !openAddCar && (
            <button
              onClick={ () => { setOpenAddCar(!openAddCar) }}
              className='border border-black-600 pl-4 pr-4 pb-2 pt-2'
            >
              Adicionar Carro
            </button>
          )
        }
        </div>
        <hr className='mb-4'/>
        { openAddCar && <CreateCar closeForm={setOpenAddCar} createCar={ createCar.mutate } /> }
        {
          (!isLoading)
            ? (
            <div className='grid mobile:grid-cols-1 mobilemd:grid-cols-2 gap-4 place-items-left'>
              {
                data.map((car: Cars, i: number) => (
                    <Card key={i} car={car} deleteCar={ deleteCar.mutate }/>
                ))
              }
            </div>
              )
            : <h1>Carregando</h1>
        }
      </main>
    </>
  )
}

Home.auth = true

export default Home
