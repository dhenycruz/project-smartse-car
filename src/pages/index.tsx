import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Logo from '../../public/logo.png'
import Frota from '../../public/frota-img.png'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

const Login = (): React.ReactElement => {
  const { status } = useSession()
  const [errorsAuth, setErrorsAuth] = useState<string[]>([])

  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      cpf: '',
      password: ''
    }
  })

  interface FormValues {
    cpf: string
    password: string
  }

  const onSubmit: SubmitHandler<FormValues> = async (data: { cpf: string, password: string }) => {
    const result = await signIn('credentials', {
      redirect: false,
      cpf: data.cpf,
      password: data.password
    })
    if (result?.ok === true) {
      void router.push('/home')
    } else {
      if (result?.error !== null) {
        setErrorsAuth(['CPF ou senha incorreta'])
      }
    }
  }

  useEffect(() => {
    if (status === 'authenticated') void router.replace('/home')
  }, [status])
  if (status === 'unauthenticated') {
    return (
      <div className="w-screen h-screen bg-[url('../../public/bg.png')] bg-cover text-cente ">
        <div className=" w-screen h-screen flex justify-center items-center  backdrop-blur bg-black/90">
          <Image src={Frota} alt='imagem frota' width={500} className='sm: hidden md:block mr-20' />
          <div className='flex flex-col p-7'>
            <Image src={Logo} alt='Logo da aplicação' width={250} />
            { /* eslint-disable-next-line @typescript-eslint/no-misused-promises */ }
            <form onSubmit={ handleSubmit((data) => { onSubmit(data) })} className='flex flex-col'>
            <input
              {...register('cpf', { required: true }) }
              aria-invalid={ (errors.cpf !== null) ? 'true' : 'false'}
              type='text'
              maxLength={11}
              className='bg-transparent text-white mt-4 mb-8 p-1 border-b-2 border-white'
              placeholder='CPF'
            />
            <input
              {...register('password', {
                required: true,
                minLength: {
                  value: 5,
                  message: 'A senha deve conter no mínimo 6 caracteres'
                }
              })}
              aria-invalid={(errors.password != null) ? 'true' : 'false'}
              type='password'
              className='bg-transparent text-white mb-10 p-1 border-b-2 border-white'
              placeholder='Senha'
            />
            <button type='submit' className='p-4 bg-green-900 text-white rounded-md'>ENTRAR</button>
            { errors.cpf?.type === 'required' && <p className='tm-2 font-black text-red-500'>CPF é obrigatório</p>}
            { errors.password?.type === 'required' && <p className='tm-2 font-black text-red-500'>Senha é obrigatória</p>}
            {errors.password?.type === 'minLength' && <p className='tm-2 font-black text-red-500'>{errors.password.message}</p>}
            {errorsAuth.length > 0 && <p className='mb-4 font-black text-red-500'>{errorsAuth[0]}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }

  return <></>
}

export default Login
