/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

interface FormValues {
  name: string
  cpf: string
  email: string
  password: string
}

interface Props {
  close: (param: boolean) => void
  refetch: () => void
}

const CreateUser: React.FC<Props> = ({ close, refetch }): React.ReactElement => {
  const createUser = useMutation({
    mutationFn: async (user: FormValues) => {
      return await axios.post('/api/users', user)
    },
    onSuccess: async () => {
      refetch()
    },
    onError: (error) => {
      console.error(error)
    }
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      cpf: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues): Promise<void> => {
    createUser.mutate(data)
    close(false)
  }

  return (
    <form onSubmit={handleSubmit((data) => { void onSubmit(data) })} className='p-2 border borde-black-300 mb-4 m-auto w-96'>
      <sub>ADICIONAR USUÁRIO</sub>
      <hr className='mb-2 mt-2'/>
      <div className='grid mobile:grid-cols-1 gap-2 mobilemd:grid-cols-2 tablet:grid-cols-2 desktop:grid-cols-2 lgdevices:grid-cols-2 place-items-center'>
        <input
          {...register('name', { required: true })}
          aria-invalid={ (errors.name !== null) ? 'true' : 'false'}
          type='text'
          placeholder='Nome'
          className='w-full border border-black-100 pl-2 mb-2'
        />
        <input
          {...register('cpf', { required: true })}
          aria-invalid={ (errors.cpf !== null) ? 'true' : 'false'}
          type='text'
          maxLength={11}
          placeholder='CPF'
          className='w-full border border-black-100 pl-2 mb-2'
        />
        <input
          {...register('email', { required: true })}
          aria-invalid={ (errors.email !== null) ? 'true' : 'false'}
          type='text'
          placeholder='Email'
          className='w-full border border-black-100 pl-2 mb-2'
        />
        <input
          {...register('password', { required: true })}
          aria-invalid={ (errors.password !== null) ? 'true' : 'false'}
          type='password'
          placeholder='Senha'
          minLength={5}
          className='w-full border border-black-100 pl-2 mb-2'
        />
      </div>
      <hr className='mb-4'/>
      <button type='reset' onClick={() => { close(false) }} className='border border-red-600 pl-2 pr-2 mr-2'>Cancelar</button>
      <button type='submit' className='bg-green-400 hover:text-white border border-green-950 pl-2 pr-2'>Salvar</button>
    </form>
  )
}

export default CreateUser
