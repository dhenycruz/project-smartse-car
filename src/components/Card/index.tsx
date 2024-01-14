import { type Cars } from '@prisma/client'
import React, { useState } from 'react'
import ModalConfirmDel from '@/components/ModalConfrimDeleteCar'
import { BsFuelPumpFill } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import ModalFuelingCar from '../ModalFuelingCar'

interface Props {
  car: Cars
  refetch: () => void
  onSuccess: boolean
  setOnSuccess: (param: boolean) => void
  setResultText: (param: string) => void
}

const Card: React.FC<Props> = ({ car, refetch, onSuccess, setOnSuccess, setResultText }): React.ReactElement => {
  const [open, onModal] = useState(false)
  const [openFueling, setOpenFueling] = useState(false)

  const fnDelete = (): void => {
    onModal(true)
  }

  const fnFueling = (): void => {
    setOpenFueling(true)
  }

  return (
    <>
      <div className='w-full sm:w-80 md:w-96 h-full border-solid border-2 rounded-md bg-white'>
        <img src={car.imgcar} alt='Foto veículo' className='w-full h-56'/>
        <h1 className='text-center font-bold mt-2'>{car.marca} {car.modelo} {car.potencia}</h1>
        <div className='flex flex-col text-center'>
          <span>{car.cor} - {car.portas} Portas {car.ar ? '- AR' : 'não'}</span>
          <span>{car.cidade} - {car.estado}</span>
        </div>
        <div className='p-2'>
          <div className='flex justify-around'>
          <button
            className='bg-green-800 border p-2 rounded-lg mb-2 font-bold text-white border-slate-300 w-full flex justify-center'
            onClick={ () => { fnFueling() }}
          >
            <BsFuelPumpFill />
          </button>
          <button className='bg-white border p-2 rounded-lg mb-2 font-bold text-black border-slate-300 w-full flex justify-center ml-1 mr-1'>
            <FaEdit />
          </button>
          <button
            onClick={ () => { fnDelete() }}
            className='bg-red-800 border border-slate-300 p-2 font-bold mb-2 rounded-lg text-white w-full flex justify-center'
          >
            <MdDeleteForever />
          </button>
          </div>
          <button className='bg-zinc-800 text-white border border-black w-full p-2 mb-2 rounded-lg'>Mais Detalhes</button>
        </div>
      </div>
      { open && (
          <ModalConfirmDel open={ open } onModal={ onModal} refetch={refetch} id={car.id} setOnSuccess={ setOnSuccess } setResultText={ setResultText }/>
      )}
      {
        openFueling && (
          <ModalFuelingCar openFueling={ openFueling } setOpenFueling={ setOpenFueling} car={ car } refetch={ refetch } />
        )
      }
    </>
  )
}

export default Card
