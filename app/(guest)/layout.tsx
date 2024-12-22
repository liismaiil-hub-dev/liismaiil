import { ReactNode } from "react";

function AuthLayout({ children }: { children: ReactNode }) {
  return <div className='flex  w-screen h-screen justify-center items-center '>
    <div className='flex w-full max-w-[400px] mx-auto'>
      {children}
    </div>
  </div>
}

export default AuthLayout;
