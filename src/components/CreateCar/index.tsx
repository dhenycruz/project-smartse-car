import React, { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { siglas, estados } from '@/utils/estados'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

interface FormValues {
  modelo: string
  marca: string
  potencia: string
  cor: string
  portas: number
  ar: boolean
  renavam: string
  placa: string
  imgcar: string
  estado: string
  cidade: string
}

interface Props {
  closeForm: (param: boolean) => void
  refetch: () => void
  setOnSuccess: (param: boolean) => void
  setResultText: (param: string) => void
}

const CreateCar: React.FC<Props> = ({ closeForm, refetch, setOnSuccess, setResultText }): React.ReactElement => {
  const [arCheck, setArCheck] = useState(false)
  const [onlyNumber, setOnlyNumber] = useState('')

  const createCar = useMutation({
    mutationFn: async (car: FormValues) => {
      return await axios.post('/api/cars', car)
    },
    onSuccess: () => {
      refetch()
      setOnSuccess(true)
      setResultText('Carro adicionado com sucesso!')
      setTimeout(() => {
        setOnSuccess(false)
      }, 5000)
    },
    onError: (error) => {
      console.error(error)
    }
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      modelo: '',
      marca: '',
      potencia: '',
      cor: '',
      portas: 0,
      ar: arCheck,
      renavam: '',
      placa: '',
      imgcar: '',
      estado: '',
      cidade: ''
    }
  })

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues): Promise<void> => {
    createCar.mutate(data)
    closeForm(false)
  }

  return (
    <>
    { /* eslint-disable-next-line @typescript-eslint/no-misused-promises */ }
    <form onSubmit={ handleSubmit((data) => { void onSubmit(data) })} className='p-2 border borde-black-300 mb-4 m-auto'>
      <sub>ADICIONAR CARRO</sub>
      <hr className='mb-2 mt-2'/>
      <div className='grid mobile:grid-cols-1 gap-2 mobilemd:grid-cols-2 tablet:grid-cols-4 desktop:grid-cols-4 lgdevices:grid-cols-4 place-items-center'>
        <input
          {...register('modelo', { required: true })}
          aria-invalid={ (errors.modelo !== null) ? 'true' : 'false'}
          type='text'
          placeholder='Modelo'
          className='w-full border border-black-100 pl-2 mb-2'
        />
        <input
          {...register('marca', { required: true })}
          aria-invalid={ (errors.marca !== null) ? 'true' : 'false'}
          type='text'
          placeholder='Marca'
          className='w-full border border-black-100 pl-2 mb-2 '
        />
        <input
          {...register('potencia', { required: true })}
          aria-invalid={ (errors.marca !== null) ? 'true' : 'false'}
          type='text'
          placeholder='Potência'
          className='w-full border border-black-100 pl-2 mb-2'
        />
        <input
          {...register('cor', { required: true })}
          aria-invalid={ (errors.marca !== null) ? 'true' : 'false'}
          type='text'
          placeholder='Cor'
          className='w-full border border-black-100 pl-2 mb-2'
        />
        <input
          {...register('renavam', {
            required: true,
            maxLength: {
              value: 9,
              message: 'O Renavam deve conter 9 números'
            }
          })}
          value={onlyNumber}
          onChange={(e) => { setOnlyNumber(e.target.value.replace(/\D/g, '')) }}
          aria-invalid={ (errors.marca !== null) ? 'true' : 'false'}
          maxLength={9}
          type='text'
          placeholder='Renavam'
          className='w-full border border-black-100 pl-2 mb-2'
        />
        <input
          {...register('placa', { required: true })}
          aria-invalid={ (errors.marca !== null) ? 'true' : 'false'}
          type='text'
          maxLength={7}
          placeholder='Placa'
          className='w-full border border-black-100 pl-2 mb-2'
        />
        <input
          {...register('cidade', { required: true })}
          aria-invalid={ (errors.marca !== null) ? 'true' : 'false'}
          type='text'
          placeholder='Cidade'
          className='w-full border border-black-100 pl-2 mb-2'
        />
        <select
          {...register('estado', { required: true })}
          aria-invalid={ (errors.marca !== null) ? 'true' : 'false'}
          className='w-full border border-black-100 pl-2 mb-2'
          defaultValue='AL'
        >
          <option value=''>Selecionar estado</option>
            {
              siglas.map((res, i) => <option key={i} value={res}>{estados[i]}</option>)
            }
        </select>
      </div>
      <input
          {...register('imgcar', { required: true })}
          aria-invalid={ (errors.marca !== null) ? 'true' : 'false'}
          type='text'
          placeholder='Imagem do carro'
          className='w-full border border-black-100 pl-2 mb-2'
        />
      <div>
          <label>Portas </label>
          <input
            {...register('portas', { required: true })}
            aria-invalid={ (errors.marca !== null) ? 'true' : 'false'}
            type='number'
            placeholder='Portas'
            className='w-8 border border-black-100 mr-3 mb-2 text-center'
          />
          <label>AR </label>
          <input
            {...register('ar')}
              aria-invalid={ (errors.marca !== null) ? 'true' : 'false'}
              type='checkbox'
              checked={ arCheck }
              onChange={() => { setArCheck(!arCheck) }}
              placeholder='Ar'
              className='border border-black-100 mr-3 pl-2 mb-2'
          />
        </div>
        <hr className='mb-4'/>
      <button type='reset' onClick={() => { closeForm(false) }} className='border border-red-600 pl-2 pr-2 mr-2'>Cancelar</button>
      <button type='submit' className='bg-green-400 hover:text-white border border-green-950 pl-2 pr-2'>Salvar</button>
    </form>
    </>
  )
}

export default CreateCar
