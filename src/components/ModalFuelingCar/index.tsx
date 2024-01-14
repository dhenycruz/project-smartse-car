/* eslint-disable @typescript-eslint/no-misused-promises */
import type { Cars } from '@prisma/client'
import React, { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

interface Props {
  openFueling: boolean
  setOpenFueling: (param: boolean) => void
  car: Cars
}

const ModalFuelingCar: React.FC<Props> = ({ setOpenFueling, car }): React.ReactElement => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      carId: car.id,
      tipoCombustivel: 'gasolina',
      valorLitro: 0,
      litros: 0,
      valorTotal: 0
    }
  })

  const [litros, setLitros] = useState('')
  const [valorLitro, setValorLtiro] = useState('')

  interface TypeValue {
    carId: number
    tipoCombustivel: string
    valorLitro: number
    litros: number
    valorTotal: number
  }

  const onSubmit: SubmitHandler<TypeValue> = async (data: TypeValue) => {
    console.log(data)
  }

  return (
    <div className='w-96 rounded-lg border border-black bg-white z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 flex justify-center  items-center flex-col'>
      <h2 className='font-bold'>Abastecer {car.marca} {car.modelo}</h2>
      <h3>Deseja realmente deletar esse carro?</h3>
      <form onSubmit={ handleSubmit((data) => { return onSubmit(data) })} className='p-2 border borde-black-300 mb-4 m-auto'>
        <sub>ADICIONAR CARRO</sub>
        <hr className='mb-2 mt-2'/>
        <div className='grid mobile:grid-cols-1 gap-2 mobilemd:grid-cols-2 tablet:grid-cols-4 desktop:grid-cols-4 lgdevices:grid-cols-4 place-items-center '>
          <input type='hidden' value={car.id} />
          <div>
            <label className='text-slate-600 text-sm'>Tipo de Combustível</label>
            <select
              {...register('tipoCombustivel', { required: true })}
              aria-invalid={ (errors.tipoCombustivel !== null) ? 'true' : 'false'}

              className='w-full border border-black-100 p-2 mb-2'
            >
              <option value='gasolina'>Gasolina</option>
              <option value='diesel'>Diesel</option>
              <option value='alcool'>Álcool</option>
            </select>
          </div>
          <div>
            <label className='text-slate-600 text-sm'>Valor do Litro</label>
            <input
              {...register('valorLitro', { required: true })}
              aria-invalid={ (errors.valorLitro !== null) ? 'true' : 'false'}
              type='number'
              placeholder='Valor do Litro'
              onChange={ (e) => { setValorLtiro(e.target.value) }}
              className='w-full border border-black-100 p-2 mb-2 '
          />
          </div>
          <div>
            <label className='text-slate-600 text-sm'>Litros</label>
            <input
              {...register('litros', { required: true })}
              aria-invalid={ (errors.litros !== null) ? 'true' : 'false'}
              type='number'
              placeholder='Litros'
              onChange={ (e) => { setLitros(e.target.value) }}
              className='w-full border border-black-100 p-2 mb-2'
            />
          </div>
          <div>
            <label className='text-slate-600 text-sm'>Valor Total</label>
            <input
              {...register('valorTotal', { required: true })}
              aria-invalid={ (errors.valorTotal !== null) ? 'true' : 'false'}
              type='number'
              value={Number(litros) * Number(valorLitro)}
              placeholder='Valor Total'
              className='w-full border border-black-100 p-2 mb-2'
            />
          </div>
        </div>
        <hr className='bg-black mb-4'/>
          <button
            className='bg-white border border-black w-36 pr-4 pb-1 pt-1 text-black-400 rounded-lg mr-4'
            onClick={ () => {
              setOpenFueling(false)
            }}
          >
            Cancelar
          </button>
          <button
            className='bg-green-600 border border-black  w-36 pb-1 pt-1 text-black-400 rounded-lg'
          >
            Abastecer
          </button>
      </form>
    </div>
  )
}

export default ModalFuelingCar
