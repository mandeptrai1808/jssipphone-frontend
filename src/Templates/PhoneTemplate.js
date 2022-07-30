import React from 'react'
import Menu from '../Components/Menu'

export default function PhoneTemplate(props) {
  return (
    <div className='w-full h-screen md:py-5 bg-slate-400 flex justify-center items-center'>
        <div className='md:w-96 w-full relative h-full bg-white shadow-lg rounded-md'>
                <div className='h-full'>
                    {props.component}
                </div>
                {/* <Menu/> */}
        </div>
    </div>
  )
}
