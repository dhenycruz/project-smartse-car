import { type Cars } from '@prisma/client'
import { type UseMutateFunction } from '@tanstack/react-query'
import React from 'react'

interface Props {
  car: Cars
  deleteCar: UseMutateFunction
}

const Card: React.FC<Props> = ({ car, deleteCar }): React.ReactElement => {
  const fnDelete = (id: number): void => {
    deleteCar(id)
  }
  return (
    <div className='w-full sm:w-80 md:w-96 h-full border-solid border-2 rounded-md bg-white'>
      <img src={car.imgcar} alt='Foto veículo' className='w-full h-56'/>
      <h1 className='text-center font-bold mt-2'>{car.marca} {car.modelo} {car.potencia}</h1>
      <div className='flex flex-col text-center'>
        <span>{car.cor} - {car.portas} Portas {car.ar ? '- AR' : 'não'}</span>
        <span>{car.cidade} - {car.estado}</span>
      </div>
      <div className='p-2'>
        <button className='bg-green-800 border p-2 rounded-lg mb-2 font-bold text-white border-slate-300 w-full'>ABASTECER</button>
        <button className='bg-white border border-slate-300 w-full p-2 font-semibold mb-2 rounded-lg'>Mais Detalhes</button>
        <button
          onClick={ () => { fnDelete(car.id) }}
          className='bg-red-800 border border-slate-300 w-full p-2 font-bold mb-2 rounded-lg'
        >
          DELETAR
        </button>
      </div>
    </div>
  )
}

export default Card
