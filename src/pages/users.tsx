/* eslint-disable @typescript-eslint/no-misused-promises */
import Header from '@/components/Header'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { FaUserPlus, FaUserEdit } from 'react-icons/fa'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { User } from '@prisma/client'
import { FaUserXmark } from 'react-icons/fa6'
import CreateUser from '@/components/CreateUser'
import ModalDeleteUser from '@/components/ModalDeleteUser'
import ModalUpUser from '@/components/ModalUpUser'

interface IUser {
  id: number
  name: string
  cpf: string
  email: string
}

const Users = (): React.ReactElement => {
  const [openUser, setOpenUser] = useState(false)
  const [opDelUser, setOpDelUser] = useState(false)
  const [opUpUser, setOpUpUser] = useState(false)
  const [idSelected, setSelecteId] = useState(0)
  const [userSelected, setSelecteUser] = useState<IUser>({
    id: 0,
    name: '',
    email: '',
    cpf: ''
  })
  const router = useRouter()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      return await axios.get('/api/users')
        .then(({ data }) => data)
    }
  })

  const opDel = (id: number): void => {
    setSelecteId(id)
    setOpDelUser(true)
  }

  const opUp = (user: IUser): void => {
    setSelecteUser(user)
    setOpUpUser(true)
  }

  return (
    <>
    <Header />
    <main className='pr-10 pl-10'>
      <div className='flex items-center justify-between mb-2 mt-2'>
          <h1>Usuários</h1>
              <button
                onClick={ () => { void router.replace('/home') }}
                className='border border-black-600 pl-4 pr-4 pb-2 pt-2'
              >
                Lista Carros
              </button>
          <button
            onClick={ () => { setOpenUser(true) } }
            className='border border-black-600 pl-4 pr-4 pb-2 pt-2'>
            <FaUserPlus />
          </button>
        </div>
        <hr className='mb-4'/>
        { openUser && <CreateUser close={ setOpenUser } refetch={ refetch } />}
        <div className='w-full h-full border border-slate-800 mt-4 flex flex-col items-center justify-center p-2'>
        <h2>Lista de Usuários</h2>
        <hr />
          <table className='table-auto w-full border-collapse'>
            <thead>
              <tr className='border-b border-grey-300'>
                <th>#id</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Email</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                (!isLoading)
                  ? (
                    <>
                      {
                        data.map((user: User, i: number) => (
                          <tr key={i} className='border-b border-gray-100 text-center p-4'>
                            <td>#{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.cpf}</td>
                            <td>{user.email}</td>
                            <td><button onClick={ () => { opUp(user) }}><FaUserEdit size={20}/></button></td>
                            { (user.id === 1) ? <td><button className='text-gray-300'><FaUserXmark size={20} /></button></td> : <td><button onClick={ () => { opDel(user.id) }}><FaUserXmark size={20} /></button></td> }
                          </tr>
                        ))
                      }
                    </>
                    )
                  : <h1>Carregando...</h1>
              }
            </tbody>
          </table>
      </div>
      { opDelUser && <ModalDeleteUser close={ setOpDelUser } id={ idSelected } refetch={ refetch }/>}
      { opUpUser && <ModalUpUser close={ setOpUpUser } refetch={ refetch } user={ userSelected }/>}
    </main>
    </>
  )
}

Users.auth = true

export default Users
