import React from 'react'
import styled from 'styled-components'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const Modal = styled.div`
  body {
    filter: blur(4px);
  }
`

interface Props {
  open: boolean
  onModal: (param: boolean) => void
  id: number
  refetch: () => void
}

const ModalConfirmDel: React.FC<Props> = ({ open, onModal, id, refetch }): React.ReactElement => {
  const deleteCar = useMutation({
    mutationFn: async (id: number) => {
      const url = `/api/cars/${String(id)}`
      return await axios.delete(url)
    },
    onSuccess: async () => {
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      void refetch()
    }
  })

  return (
    <Modal className='w-96 rounded-lg border border-black bg-white z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 flex justify-center  items-center flex-col'>
      <h2 className='font-bold'>ALERTA!</h2>
      <h3>Deseja realmente deletar esse carro {id}?</h3>
      <hr className='bg-black mb-4'/>
      <div className='flex justify-center'>
        <button
          className='bg-white border border-black w-36 pr-4 pb-1 pt-1 text-black-400 rounded-lg mr-4'
          onClick={ () => { onModal(false) }}
        >
          Cancelar
        </button>
        <button
          className='bg-red-600 border border-black  w-36 pb-1 pt-1 text-black-400 rounded-lg'
          onClick={ () => {
            onModal(false)
            deleteCar.mutate(id)
          }}
        >
          sim
        </button>
      </div>
    </Modal>
  )
}

export default ModalConfirmDel
