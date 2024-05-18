
import React from 'react'
import GridLayout from '@/components/Layout/GridLayout'
import { useSelector } from 'react-redux'
import { RootStateType } from '@/store/store'


export default function Grids() {

  const { token, guest } = useSelector((state: RootStateType) => state.guest)

  return (<div className="h-full  bg-gray-600 p-3">
    <h2 className='text-4xl text-center my-10 font-semibold'> Bismi ALLAH   </h2>
    <div className="h-full  bg-gray-600 p-3">
      grids
    </div>
  </div>


  )
}
Grids.getLayout = function getLayout(page, pageProps) {
  return (<GridLayout {...pageProps} title=' liismaiil tablets dashboard '> {page}</GridLayout>)
}
