import React from 'react'
import Menu from '../Components/Menu'
import DialpadIcon from '@mui/icons-material/Dialpad';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Search from '../Components/Search';
export default function SearchTemplate(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className='w-full h-screen md:py-5 bg-slate-400 flex justify-center items-center'>
        <div className='md:w-96 w-full relative h-full bg-white shadow-lg rounded-md overflow-hidden'>
                <Search/>
                <div className='h-full'>
                    {props.component}
                </div>
                <div onClick={() => {
                  dispatch({type: "RESET_TEMP_PHONE"})
                  navigate('/phone')
                }} className='h-14 w-14 flex text-white justify-center items-center bg-red-400 rounded-full absolute bottom-20 shadow-md hover:scale-110 duration-100 right-5'>
                      <DialpadIcon/>
                </div>
                <Menu/>
        </div>
    </div>
  )
}
