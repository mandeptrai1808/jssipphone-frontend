import React, {useEffect, useState} from "react";
import { Button, Checkbox, Form, Input } from "antd";

import PhoneIcon from "@mui/icons-material/Phone";
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CopyrightIcon from '@mui/icons-material/Copyright';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../Redux/Actions/AppAction";
export default function Login() {

  const {isLogin} = useSelector(state => state.AppReducer);
  const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      if(isLogin){
        navigate('/users')
        setLoading(false);
      }
    }, [isLogin])
  return (
    <div className="w-full h-full p-10">
      <div className=" flex pt-5 justify-center" style={{ fontSize: 50 }}>
        <p className=" text-red-300 font-bold m-0">JsSIP</p>
        <p className="pl-0 m-0"> Phone</p>
      </div>

      <div className="w-full relative h-2/3 rounded-md shadow-md p-10">
        <button onClick={() => {
          dispatch({type: "OPEN_MODAL"})
        }} className="duration-200 absolute top-5 right-5 hover:bg-slate-200 hover:opacity-100 opacity-50  w-10 h-10 rounded-full">
            <SettingsIcon/>
        </button>
        <Form
          name="basic"
          initialValues={{ remember: true }}
            onFinish={(value) => {
              dispatch(LoginUser(value))
              setLoading(true);
            }}
          //   onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
             <div className="text-center mb-5 pb-2 border-b text-red-400">
            <AccountCircleIcon style={{fontSize:50}}/>
            </div>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
           
            <Input className="w-full" placeholder="Vui lòng nhập username"/>
          </Form.Item>

          <Form.Item>
            <Button loading={loading} type="primary w-full" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <div className="absolute bottom-5 left-0 w-full text-center opacity-50"><CopyrightIcon/>nguyenvanman</div>
      </div>
    </div>
  );
}
