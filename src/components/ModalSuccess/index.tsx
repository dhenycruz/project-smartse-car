import React from 'react'
import { FcCheckmark } from 'react-icons/fc'

interface Props {
  text: string
}

const ModalSuccess: React.FC<Props> = ({ text }): React.ReactElement => {
  return (
    <div className='w-96 h-24 bg-green-300 flex items-center justify-center rounded-xl fixed bottom-0 right-4'>
      <FcCheckmark size={50} className='mr-2'/>
      <h1>{text}</h1>
    </div>
  )
}

export default ModalSuccess
