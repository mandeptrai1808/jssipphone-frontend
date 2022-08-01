import React, { useState, useRef, useEffect } from "react";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { GetAllHistories, GetUserLogs } from "../Redux/Actions/AppAction";
import dateFormat from "dateformat";
import LoadingPage from "../Components/LoadingPage";

export default function Admin() {
  const dispatch = useDispatch();
  const { allHistories,userLogs, loadingPage } = useSelector((state) => state.AppReducer);
  console.log(loadingPage)

  const [time, setTime] = useState({
    hour: 0,
    min: 0,
    sec: 0
  })

  const renderTime = (callTime) => {
    const min = Math.floor(callTime / 60);
    const second = callTime - 60 * Math.floor(callTime / 60);
    return (
      <span> {`${min} phút ${second < 10 ? "0" : ""}${second} giây`} </span>
    );
  };

  const historyCallRender = allHistories.map((item, index) => {
    return (
      <div
        key={index}
        className="w-full h-20 px-5 flex items-center border-t border-b hover:bg-slate-100"
      >
        <div className="mr-5 text-red-500">
          <PhoneForwardedIcon style={{ fontSize: 40 }} />
        </div>
        <div className="w-2/3 text-sm">
          <p className="m-0 font-bold">{`${item.infoUser?.username} -> ${item.infoCall?.phone}`}</p>
          <p className="m-0">{renderTime(item.infoCall?.timeCall)}</p>
          <div className="opacity-50">
            {" "}
            {dateFormat(item.infoCall?.createdAt, "H:MM, dd/mm/yyyy")}
          </div>
        </div>
      </div>
    );
  });

  const userLogsRender = userLogs.map((item, index) => {
    return  <div key={index} className="w-full h-16 px-5 flex items-center border-t border-b hover:bg-slate-100">
    <div className="mr-5 text-blue-500">
      <AccountCircleIcon style={{ fontSize: 40 }} />
    </div>
    <div className="w-2/3">
      <p className="m-0 font-bold">{item.content}</p>
      <div className="m-0">{dateFormat(item.createdAt, "H:MM, dd/mm/yyyy")}
</div>
    </div>
  </div>
  })

  const TotalTimeCall = async () => {
    var sumTime = 0;
    await allHistories.map((item) => {
      sumTime += item.infoCall?.timeCall;
    })

    var hour = Math.floor(sumTime / 3600);
    var min =  Math.floor((sumTime - 3600*hour) / 60);
    var sec = sumTime-60*min;

    setTime({hour, min, sec})
  } 

  useEffect(() => {
    dispatch({type: "IS_LOADING_PAGE"})
    dispatch(GetAllHistories());
    dispatch(GetUserLogs())
  }, []);

  useEffect(() => {
    TotalTimeCall()
  }, [allHistories])

  return (
    <div>
      {/* header  */}
      <div className={`${(loadingPage) ? 'block' : 'hidden'}`}>

      <LoadingPage/>
      </div>
      <div className="w-full h-20 bg-slate-900 shadow-lg fixed md:relative">
        <div className=" flex justify-center items-center h-full w-full md:text-5xl text-3xl">
          <p className=" text-red-300 font-bold m-0">JsSIP</p>
          <p className="pl-0 m-0 text-white">Phone</p>
          <p className="m-0 md:ml-5 text-blue-400">Admin</p>
          <SupervisorAccountIcon style={{ color: "white" }} />
        </div>
      </div>

      {/* content  */}
      <div className="w-full grid grid-cols-3 md:px-10 px-2 md:py-5 py-20 gap-5">
        <div className="md:col-span-1 col-span-3 p-5 shadow-md h-100">
          <h1 className="text-2xl font-bold py-2 w-full text-center bg-blue-300">
          Total call time
          </h1>
          <div className="md:text-8xl text-7xl py-5 rounded-sm hover:bg-red-300 hover:text-white duration-500">
            <span className="mr-5">{time.hour}</span>
            <span className="font-bold">Giờ</span>
          </div>
          <div className="md:text-8xl text-7xl py-5 text-center rounded-sm hover:bg-blue-300 hover:text-white duration-500">
            <span className="mr-5">{time.min}</span>
            <span className="font-bold">Phút</span>
          </div>
          <div className="md:text-8xl text-7xl py-5 text-right rounded-sm hover:bg-yellow-300 hover:text-white duration-500">
            <span className="mr-5">{time.sec}</span>
            <span className="font-bold">Giây</span>
          </div>
        </div>

        <div className="md:col-span-1 col-span-3  p-5 shadow-md h-100">
          <h1 className="text-2xl font-bold py-2 w-full text-center bg-red-300">
            Call Activities
          </h1>
          <div className=" w-full h-full pb-20">
            <div className="w-full h-full overflow-y-auto">
              {historyCallRender}
            </div>
          </div>
        </div>
        <div className="md:col-span-1 col-span-3  p-5 shadow-md h-100">
          <h1 className="text-2xl font-bold py-2 w-full text-center bg-yellow-300">
            Users Activities
          </h1>
          <div className=" w-full h-full pb-20">
            <div className="w-full h-full overflow-y-auto">
             
                {userLogsRender}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
