'use client'

import { Button } from '@nextui-org/react'
import { useFormStatus } from 'react-dom'

const Submit = ({ label, ...btnProps }:{ label: string }) => {
  const { pending } = useFormStatus()

  return (
    <Button {...btnProps} type="submit" isLoading={pending} className='btn bg-blue-400
             text-yellow-100  text-center text-2xl p-2
              rounded-md'>
      {label}
    </Button>
  )
}

export default Submit
