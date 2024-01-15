/* eslint-disable @typescript-eslint/no-misused-promises */
import Header from '@/components/Header'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { type Cars, type Abastecimentos } from '@prisma/client'
import Card from '@/components/Card'
import CreateCar from '@/components/CreateCar'
import ModalSuccess from '@/components/ModalSuccess'
import { useRouter } from 'next/router'
import { FaCarSide } from 'react-icons/fa6'

interface ICar extends Cars {
  abastecimentos: Abastecimentos[]
}

const Home = (): React.ReactElement => {
  const [openAddCar, setOpenAddCar] = useState(false)
  const [resultText, setResultText] = useState('')
  const [onSuccess, setOnSuccess] = useState(false)

  const router = useRouter()

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
          <button className='border border-black-600 pl-4 pr-4 pb-2 pt-2' onClick={() => { void router.push('/users') }}>Usuários</button>
          {
            !openAddCar && (
              <button
                onClick={ () => { setOpenAddCar(!openAddCar) }}
                className='border border-black-600 pl-4 pr-4 pb-2 pt-2 flex items-center'
              >
                <span className='font-bold mb-1'>+</span> <FaCarSide />
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
                data.map((car: ICar, i: number) => (
                    <Card
                      key={i}
                      car={car}
                      refetch={ refetch }
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
