import React, {useEffect} from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { GetAddressByUserId } from '../Redux/Actions/AppAction';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useNavigate } from 'react-router-dom';
export default function BookCall() {

  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);

  const {bookAddress, searchData} = useSelector(state => state.AppReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const callThisNumber = (phone) => {
    dispatch({
      type: "GET_TEMP_PHONE",
      content: phone,
    });
    navigate("/phone");
  };

  const arrRender = bookAddress.filter((item) => {
    return (item.phone?.includes(searchData) || item.name?.includes(searchData))    
  })

    const testRender = arrRender.map((item,index) => {
      return <div key={index} className='w-full h-20 flex hover:bg-slate-100 duration-100 items-center px-5 border-t border-b'>
      <div className='mr-5 text-blue-300'  onClick={() => {
            callThisNumber(item.phone);
          }}>
          <AccountCircleIcon style={{fontSize: 50}}/>
      </div>
      <div className='w-2/3'  onClick={() => {
            callThisNumber(item.phone);
          }}>
          <p className='m-0 font-bold text-xl'>{item.name}</p>
          <p className='m-0'>{item.phone}</p>
      </div>
      <div>
          <button onClick={() => {
                dispatch({
                  type: "OPEN_SAVE_ADDRESS",
                  phone: item.phone,
                  name: item.name,
                  update: true,
                  id: item.id
                })
              }} className='w-10 h-10 rounded opacity-30 hover:opacity-60 duration-100 bg-slate-100'>
            <EditIcon/>
          </button>
      </div>
  </div>
    })

    useEffect(() => {
      if (userData.id)
      dispatch(GetAddressByUserId(userData.id))
    }, [])

  return (
    <div className='pt-12 pb-20 overflow-y-auto h-full w-full relative'>
       <div onClick={() => {
                   dispatch({
                    type: "OPEN_SAVE_ADDRESS",
                    phone: '',
                    name: '',
                    update: false
                  })
                }} className='h-14 w-14 flex text-white justify-center items-center bg-blue-400 rounded-full absolute bottom-40 shadow-md hover:scale-110 duration-100 right-5'>
                      <PersonAddAlt1Icon/>
                </div>
        {testRender}
    </div>
  )
}
