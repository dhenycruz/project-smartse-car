import { type Abastecimentos, type Cars } from '@prisma/client'
import React, { useState } from 'react'
import ModalConfirmDel from '@/components/ModalConfrimDeleteCar'
import { BsFuelPumpFill } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import ModalFuelingCar from '../ModalFuelingCar'
import ModalUpCar from '../ModalUpCar'
import ModalDetailCar from '../ModalDetailsCar'

interface ICar extends Cars {
  abastecimentos: Abastecimentos[]
}

interface Props {
  car: ICar
  refetch: () => void
  setOnSuccess: (param: boolean) => void
  setResultText: (param: string) => void
}

const Card: React.FC<Props> = ({ car, refetch, setOnSuccess, setResultText }): React.ReactElement => {
  const [open, onModal] = useState(false)
  const [openFueling, setOpenFueling] = useState(false)
  const [openUpCar, setOpenUpCar] = useState(false)
  const [openDetails, setOpenDetails] = useState(false)

  const fnDelete = (): void => {
    onModal(true)
  }

  const fnFueling = (): void => {
    setOpenFueling(true)
  }

  const upCar = (): void => {
    setOpenUpCar(true)
  }

  const details = (): void => {
    setOpenDetails(true)
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
          <button
            className='bg-white border p-2 rounded-lg mb-2 font-bold text-black border-slate-300 w-full flex justify-center ml-1 mr-1'
            onClick={ () => { upCar() }}
          >
            <FaEdit />
          </button>
          <button
            onClick={ () => { fnDelete() }}
            className='bg-red-800 border border-slate-300 p-2 font-bold mb-2 rounded-lg text-white w-full flex justify-center'
          >
            <MdDeleteForever />
          </button>
          </div>
          <button onClick={ () => { details() }} className='bg-zinc-800 text-white border border-black w-full p-2 mb-2 rounded-lg'>Mais Detalhes</button>
        </div>
      </div>

      { open && (
          <ModalConfirmDel onModal={ onModal} refetch={refetch} id={car.id} setOnSuccess={ setOnSuccess } setResultText={ setResultText }/>
      )}
      {
        openFueling && (
          <ModalFuelingCar setOpenFueling={ setOpenFueling } car={ car } refetch={ refetch } setOnSuccess={ setOnSuccess } setResultText={ setResultText } />
        )
      }
      {
        openUpCar && (
          <ModalUpCar setOpenUpCar={ setOpenUpCar } car={ car } refetch={ refetch } setOnSuccess={ setOnSuccess } setResultText={ setResultText} />
        )
      }
      {
        openDetails && (
          <ModalDetailCar setOpenDetails={ setOpenDetails } car={ car } />
        )
      }
    </>
  )
}

export default Card
