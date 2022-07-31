import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
export default function User() {
  const configData = useSelector((state) => state.PhoneReducer).configUA;
  
  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);


  const dispatch = useDispatch();
  const navigate = useNavigate();


  return (
    <div className="">
      <div className="text-center relative text-white bg-slate-500 py-10">
        <button className="text-white absolute top-5 left-5 duration-100 hover:opacity-100 opacity-50 hover:bg-red-200 p-2 rounded-full"
        onClick={() => {
          dispatch({type: "IS_NOT_LOGIN"})
          navigate('/')
        }}>
          Logout <LogoutIcon />
        </button>

        <AccountCircleIcon style={{ fontSize: 100 }} />
        <p className="text-2xl font-bold">{userData.username}</p>
      </div>
      <div className="px-10 py-5">
        <p className="border-b text-xl font-bold">Configuration</p>
        <div className="my-3">
          <span className="font-bold">WebSocket URL:</span>{" "}
          <span> {configData.wsUrl} </span>
        </div>
        <div className="my-3">
          <span className="font-bold">SIP URL:</span>{" "}
          <span> {configData.sipUrl} </span>
        </div>
        <div className="my-3">
          <span className="font-bold">SIP PASSWORD:</span>{" "}
          <span> {configData.sipPass} </span>
        </div>
        <Button
          onClick={() => {
            dispatch({ type: "OPEN_MODAL" });
          }}
          type="primary"
        >
          Update Configuration
        </Button>
      </div>
    </div>
  );
}
