import React, { useState } from "react";
import { RollbackOutlined, PhoneFilled } from "@ant-design/icons";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
export default function Phone(props) {
  const navigate = useNavigate();

    const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");

  const pressButton = (number) => {
    setPhoneNumber(`${phoneNumber}${number}`);
  };

  const deleteBtn = () => {
    setPhoneNumber(phoneNumber.slice(0,-1))
  }

  return (
    <div className="w-full p-10 rounded-md">
      <div className="w-full relative mb-10">
        <input
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
          value={phoneNumber}
          className="w-full rounded-md bg-blue-600  text-white font-bold h-20 text-center text-3xl border-b-4"
        />
        {/* <BackspaceIcon/> */}
        <button onClick={deleteBtn} className="duration-200 rounded-full p-2 absolute right-2 top-5 opacity-50 hover:bg-slate-300 ">
          <RollbackOutlined style={{ fontSize: 24, color: "white" }} />
        </button>
      </div>
      <div className="grid grid-cols-9 w-full place-items-center">
        <div className="col-span-3 w-full">
          <button
            onClick={() => {
              pressButton(1);
            }}
            className="text-center w-full text-white hover:text-yellow-200"
          >
            <p className="text-3xl m-0 font-bold">1</p>
            <p className="opacity-0">{"."}</p>
          </button>
        </div>
        <div className="col-span-3 w-full">
          <button
            onClick={() => {
              pressButton(2);
            }}
            className="text-center  text-white hover:text-yellow-200 w-full"
          >
            <p className="text-3xl m-0 font-bold">2</p>
            <p>ABC</p>
          </button>
        </div>
        <div className="col-span-3 w-full">
          <button
            onClick={() => {
              pressButton(3);
            }}
            className="text-center text-white hover:text-yellow-200 w-full"
          >
            <p className="text-3xl m-0 font-bold">3</p>
            <p>DEF</p>
          </button>
        </div>
        <div className="col-span-3 w-full">
          <button
            onClick={() => {
              pressButton(4);
            }}
            className="text-center text-white hover:text-yellow-200 w-full"
          >
            <p className="text-3xl m-0 font-bold">4</p>
            <p>GHI</p>
          </button>
        </div>
        <div className="col-span-3 w-full">
          <button
            onClick={() => {
              pressButton(5);
            }}
            className="text-center text-white hover:text-yellow-200 w-full"
          >
            <p className="text-3xl m-0 font-bold">5</p>
            <p>JKL</p>
          </button>
        </div>
        <div className="col-span-3 w-full">
          <button
            onClick={() => {
              pressButton(6);
            }}
            className="text-center text-white hover:text-yellow-200 w-full"
          >
            <p className="text-3xl m-0 font-bold">6</p>
            <p>MNO</p>
          </button>
        </div>
        <div className="col-span-3 w-full">
          <button
            onClick={() => {
              pressButton(7);
            }}
            className="text-center text-white hover:text-yellow-200 w-full"
          >
            <p className="text-3xl m-0 font-bold">7</p>
            <p>PQRS</p>
          </button>
        </div>
        <div className="col-span-3 w-full">
          <button
            onClick={() => {
              pressButton(8);
            }}
            className="text-center text-white hover:text-yellow-200 w-full"
          >
            <p className="text-3xl m-0 font-bold">8</p>
            <p>TUV</p>
          </button>
        </div>
        <div className="col-span-3 w-full">
          <button
            onClick={() => {
              pressButton(9);
            }}
            className="text-center text-white hover:text-yellow-200 w-full"
          >
            <p className="text-3xl m-0 font-bold">9</p>
            <p>WXYZ</p>
          </button>
        </div>
        <div className="col-span-3 w-full">
          <button
            onClick={() => {
              pressButton("*");
            }}
            className="text-center text-white hover:text-yellow-200 w-full"
          >
            <p className="text-3xl m-0 font-bold">*</p>
            <p className="opacity-0">{"."}</p>
          </button>
        </div>
        <div className="col-span-3 w-full">
          <button
            onClick={() => {
              pressButton(0);
            }}
            className="text-center text-white hover:text-yellow-200 w-full"
          >
            <p className="text-3xl m-0 font-bold">0</p>
            <p>+</p>
          </button>
        </div>
        <div className="col-span-3 w-full">
          <button
            onClick={() => {
              pressButton("#");
            }}
            className="text-center text-white hover:text-yellow-200 w-full"
          >
            <p className="text-3xl m-0 font-bold">#</p>
            <p className="opacity-0">{"."}</p>
          </button>
        </div>
      </div>
        <div className="w-full flex justify-center mt-10">
      <button onClick={() => {
        if (phoneNumber.length > 0){
          dispatch({
              type: "UPDATE_PHONE_NUMBER",
              content: phoneNumber
          })
          dispatch({type: "IS_CALLING"})
          props.callFunc(phoneNumber)
        }
        else {
          alert("Nhập số trước khi gọi!")
        }
      }} className="w-full bg-green-500 hover:bg-green-400 h-10 rounded-md">
      <PhoneFilled style={{fontSize: 25, color: "white"}} />
      </button>
      <button className="text-white absolute bottom-5 left-5 duration-100 hover:opacity-100 opacity-70 text-lg hover:bg-red-200 p-2 rounded-full"
        onClick={() => {
          navigate('/users')
        }}>
         <ArrowLeftIcon style={{fontSize: 30}}/> Back
        </button>
        </div>
    </div>
  );
}
