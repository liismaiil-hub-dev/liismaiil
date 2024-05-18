
import React from 'react'
import { FaReact, FaPython, FaCity, FaEbay, FaLinux, FaGit, FaTeamspeak, FaRaspberryPi, FaHandHolding, FaJs, FaHtml5, FaNodeJs, FaCss3Alt, FaCcStripe } from 'react-icons/fa'

function tablets() {
  return (
    <div className="h-full  bg-gray-200 p-10">
      <h2 className='text-4xl text-center my-10 font-semibold'> Tablets selections</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-4 ">
          
        <FaCity size={110} color='cyan' className='w-full text-center mt-10 animate-bounce' />
        <FaEbay size={110} color={'violet'} className='w-full text-center mt-10 animate-spin' />
        <FaGit size={110} color={'red'} className='w-full text-center mt-10 animate-ping' />
        <FaLinux size={110} color={'pink'} className='w-full text-center mt-10 animate-spin' />
        <FaPython size={110} color={'yellow'} className='w-full text-center mt-10 animate-bounce' />
        <FaReact size={110} color={'green'} className='w-full text-center mt-10 animate-spin' />
        <FaTeamspeak size={110} color={'green'} className='w-full text-center mt-10 animate-ping' />
        <FaRaspberryPi size={110} color={'green'} className='w-full text-center mt-10' />
        <FaHandHolding size={110} color={'blue'} className='w-full text-center mt-10 animate-spin' />
        <FaJs size={110} color={'gray'} className='w-full text-center mt-10 animate-ping' />
        <FaHtml5 size={110} color={'orange'} className='w-full text-center mt-10' />
        <FaNodeJs size={110} color={'black'} className='w-full text-center mt-10 animate-bounce' />
        <FaCss3Alt size={110} color={'tomato'} className='w-full text-center mt-10' />
        <FaCcStripe size={110} color={'cadetBlue'} className='w-full text-center mt-10 animate-ping' />
      </div>
    </div>

  )
}

export default tablets