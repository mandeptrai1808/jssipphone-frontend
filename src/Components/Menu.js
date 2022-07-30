import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import {UserOutlined, BookOutlined, HistoryOutlined} from '@ant-design/icons'
export default function Menu() {
  return (
    <div className='absolute bottom-0 h-14 border-t-2  w-full flex bg-white z-20 justify-center items-center'>
        <div className='flex justify-around w-full px-10'>
            <NavLink
            to={"/users"}>
            <UserOutlined style={{ fontSize: '30px' }}/>
            </NavLink>
            <NavLink
            to={"/history"}>
            <HistoryOutlined style={{ fontSize: '30px' }}/>
            </NavLink>
            <NavLink
            to={"/book"}>
            <BookOutlined style={{ fontSize: '30px' }}/>
            </NavLink>
        </div>
    </div>
  )
}
