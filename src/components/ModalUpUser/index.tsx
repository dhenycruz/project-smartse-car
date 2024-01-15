/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

interface FormValues {
  id: number
  name: string
  cpf: string
  email: string
}

interface IUser {
  id: number
  name: string
  cpf: string
  email: string
}

interface Props {
  close: (param: boolean) => void
  refetch: () => void
  user: IUser
}

const ModalUpUser: React.FC<Props> = ({ close, refetch, user }): React.ReactElement => {
  const updateUser = useMutation({
    mutationFn: async ({ id, user }: { id: number, user: IUser }) => {
      const url = `/api/users/${id}`
      return await axios.patch(url, user)
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
      id: user.id,
      name: user.name,
      cpf: user.cpf,
      email: user.email
    }
  })

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues): Promise<void> => {
    updateUser.mutate({ id: user.id, user: data })
    close(false)
  }

  return (
    <div className=' rounded-lg border border-black bg-white z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 flex justify-center  items-center flex-col'>
      <form onSubmit={handleSubmit((data) => { void onSubmit(data) })} className='p-2 border borde-black-300 mb-4 m-auto w-96 '>
        <sub>EDITAR USUÁRIO</sub>
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
        </div>
        <hr className='mb-4'/>
        <button type='reset' onClick={() => { close(false) }} className='border border-red-600 pl-2 pr-2 mr-2'>Cancelar</button>
        <button type='submit' className='bg-green-400 hover:text-white border border-green-950 pl-2 pr-2'>Salvar</button>
      </form>
    </div>
  )
}

export default ModalUpUser
