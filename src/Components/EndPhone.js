import React from 'react'
import {Button} from 'antd'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import CallEndIcon from '@mui/icons-material/CallEnd';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
export default function EndPhone() {
    const navigate = useNavigate();
    const {phoneNumberRedux, callTime} = useSelector(state => state.PhoneReducer);

    const renderTime = () => {
      const min = Math.floor(callTime/60);
      const second = callTime - 60*Math.floor(callTime/60);
      return <span> {`${min} phút ${(second<10) ? '0':''}${second} giây`} </span>
     
    }
  return (
    <div className='w-full h-full bg-blue-600 flex justify-center p-10'>
       <div>
        <div className='w-full flex justify-center'>
          <div className='w-32 shadow-lg h-32 flex items-center justify-center border-4 border-red-400 rounded-full'>
          <CallEndIcon style={{fontSize: 100, color:"rgb(248 113 113 / var(--tw-border-opacity))"}}/>
          </div>
        </div>
       <h1 className='text-3xl text-center text-white border-b my-5'>Cuộc gọi đã kết thúc</h1>
       <div className='text-md text-white'>
       <p>Số điện thoại: {phoneNumberRedux}</p>
       <p>Thời gian: {renderTime()}</p>
       </div>
        <Button className='my-2' type='danger w-full shadow-xl' onClick={() => {
          navigate('/phone')
        }}>Tiếp tục cuộc gọi khác <PhoneIcon className='ml-2'/> </Button>
         <Button className='my-2' type='primary w-full shadow-xl' onClick={() => {
          navigate('/users')
        }}>Quay lại trang chủ <HomeIcon className='ml-2'/> </Button>
       </div>
    </div>
  )
}
