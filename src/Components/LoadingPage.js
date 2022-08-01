import React from 'react'
import { Spin } from 'antd';

export default function LoadingPage() {
  return (
    <div className='fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-90 flex justify-center items-center'>
            <Spin size='large'/>
    </div>
  )
}
