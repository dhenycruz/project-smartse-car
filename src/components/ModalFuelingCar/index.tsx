/* eslint-disable @typescript-eslint/no-misused-promises */
import type { Cars } from '@prisma/client'
import React, { useState } from 'react'
import { type SubmitHandler, useForm, Controller } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

interface Props {
  setOpenFueling: (param: boolean) => void
  car: Cars
  refetch: () => void
  setOnSuccess: (param: boolean) => void
  setResultText: (param: string) => void
}

const ModalFuelingCar: React.FC<Props> = ({ setOpenFueling, car, refetch, setOnSuccess, setResultText }): React.ReactElement => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
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

  const fuelingCar = useMutation({
    mutationFn: async (abasteciment: TypeValue) => {
      return await axios.post('/api/fueling/', abasteciment)
    },
    onSuccess: () => {
      refetch()
      setOnSuccess(true)
      setResultText('Abastecimento cadastrado com sucesso!')
      setTimeout(() => {
        setOnSuccess(false)
      }, 500)
    },
    onError: (error) => {
      console.error(error)
    }
  })

  const onSubmit: SubmitHandler<TypeValue> = async (data: TypeValue): Promise<void> => {
    const { carId, tipoCombustivel, valorLitro, litros, valorTotal } = data
    fuelingCar.mutate({ carId, tipoCombustivel, valorLitro, litros, valorTotal })
  }

  return (
    <div className='w-96 rounded-lg border border-black bg-white z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 flex justify-center  items-center flex-col'>
      <h2 className='font-bold'>Abastecer {car.marca} {car.modelo}</h2>
      <form onSubmit={ handleSubmit((data) => { return onSubmit(data) })} className='p-2 border borde-black-300 mb-4 m-auto'>
        <hr className='mb-2 mt-2'/>
        <div className='grid mobile:grid-cols-1 gap-2 mobilemd:grid-cols-2 tablet:grid-cols-2 desktop:grid-cols-2 lgdevices:grid-cols-2 place-items-center '>
          <input type='hidden' value={car.id} />
          <div className='w-full'>
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
          <div className='w-full'>
            <label className='text-slate-600 text-sm'>Valor do Litro</label>
            <input
              {...register('valorLitro', { required: true })}
              aria-invalid={ (errors.valorLitro !== null) ? 'true' : 'false'}
              type='number'
              placeholder='Valor do Litro'
              step={0.01}
              onChange={ (e) => { setValorLtiro(e.target.value) }}
              className='w-full border border-black-100 p-2 mb-2 '
          />
          </div>
          <div className='w-full'>
            <label className='text-slate-600 text-sm'>Litros</label>
            <Controller
              control={control}
              name='litros'
              render={() => (
                <input
                  value={litros}
                  type='number'
                  className='w-full border border-black-100 p-2 mb-2'
                  step={0.01}
                  onChange={ (e) => { setLitros(() => e.target.value) }}
                />
              )}
            />
            {/* <input
              {...register('litros', { required: true })}
              aria-invalid={ (errors.litros !== null) ? 'true' : 'false'}
              type='number'
              placeholder='Litros'
              onChange={ (e) => { setLitros(e.target.value) }}
              className='w-full border border-black-100 p-2 mb-2'
            /> */}
          </div>
          <div className='w-full'>
            <label className='text-slate-600 text-sm'>Valor Total</label>
            <input
              {...register('valorTotal', { required: true })}
              aria-invalid={ (errors.valorTotal !== null) ? 'true' : 'false'}
              type='number'
              value={(Number(litros) * Number(valorLitro)).toFixed(2)}
              placeholder='Valor Total'
              className='w-full border border-black-100 p-2 mb-2'
            />
          </div>
        </div>
        <hr className='mb-4'/>
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
            type='submit'
            onClick={ () => { setOpenFueling(false) }}
          >
            Abastecer
          </button>
      </form>
    </div>
  )
}

export default ModalFuelingCar
