import React from 'react'
import { Input } from 'antd';
import SearchIcon from "@mui/icons-material/Search";

export default function Search() {
const { Search } = Input;
  return (
    <div className='flex justify-around w-full px-5 py-2 absolute top-0 bg-white z-20 shadow-md'>
           <div className="w-10 flex justify-center">
          <SearchIcon />
        </div>
        <Input className="w-1/3 " placeholder="Search..." style={{border:"none"}}/>
    </div>
  )
}
