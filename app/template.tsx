
//import { useApollo } from '@/lib/apolloClient';
import '@/styles/global.css';

import 'react-toastify/dist/ReactToastify.css';
/* import { useEffect, useState } from 'react'; */
import { ReactNode } from "react";


function Template({ children }: { children: ReactNode }) {

  return (<main className='h-screen w-full font-mont overflow-x-hidden justify-center items-center '>
    <div className='w-full flex justify-center items-center '>
      {children}
    </div>
  </main>
  )
}

export default Template