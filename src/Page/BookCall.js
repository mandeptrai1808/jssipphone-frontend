import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function BookCall() {

    const arr = [1,2,3,4,5,6,7,8,9,10,12,13]
    const testRender = arr.map((item,index) => {
      return <div key={index} className='w-full h-20 flex items-center px-5 border-t border-b'>
      <div className='mr-5 text-blue-300'>
          <AccountCircleIcon style={{fontSize: 50}}/>
      </div>
      <div className='w-2/3'>
          <p className='m-0 font-bold text-xl'>Name</p>
          <p className='m-0'>0829017516</p>
      </div>
      <div>
          <p className='mt-0'>Time</p>
      </div>
  </div>
    })

  return (
    <div className='pt-12 pb-20 overflow-y-auto h-full w-full'>
        {testRender}
    </div>
  )
}
