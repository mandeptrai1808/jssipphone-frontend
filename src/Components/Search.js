import React from 'react'
import { Input } from 'antd';
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from 'react-redux';

export default function Search() {

  const dispatch = useDispatch();

const { Search } = Input;
  return (
    <div className='flex justify-around w-full px-5 py-2 absolute top-0 bg-white z-20 shadow-md'>
           <div className="w-10 flex justify-center">
          <SearchIcon />
        </div>
        <Input onChange={(e) => {
          dispatch({
            type: 'GET_SEARCH_DATA',
            content: e.target.value
          })
        }} className="w-1/3 " allowClear placeholder="Tìm kiếm theo tên hoặc SĐT" style={{border:"none"}}/>
    </div>
  )
}
