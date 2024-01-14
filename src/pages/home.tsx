/* eslint-disable @typescript-eslint/no-misused-promises */
import Header from '@/components/Header'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { type Cars } from '@prisma/client'
import Card from '@/components/Card'
import CreateCar from '@/components/CreateCar'
import ModalSuccess from '@/components/ModalSuccess'

const Home = (): React.ReactElement => {
  const [openAddCar, setOpenAddCar] = useState(false)
  const [resultText, setResultText] = useState('')
  const [onSuccess, setOnSuccess] = useState(false)

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['cars'],
    queryFn: async () => {
      return await axios.get('/api/cars')
        .then(({ data }) => data)
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
        { openAddCar && <CreateCar closeForm={setOpenAddCar} refetch={ refetch } setOnSuccess={ setOnSuccess } setResultText={ setResultText } /> }
        {
          (!isLoading)
            ? (
            <div className='w-full grid mobile:grid-cols-1 mobilemd:grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-3 lgdevices:grid-cols-4 gap-4 place-items-left place-justify-center'>
              {
                data.map((car: Cars, i: number) => (
                    <Card
                      key={i}
                      car={car}
                      refetch={ refetch }
                      onSuccess={ onSuccess }
                      setOnSuccess= {setOnSuccess}
                      setResultText={setResultText}
                    />
                ))
              }
            </div>
              )
            : <h1>Carregando</h1>
        }
        {
          onSuccess && (
            <ModalSuccess text={ resultText }/>
          )
        }
      </main>
    </>
  )
}

Home.auth = true

export default Home
