import React, {useState, useEffect} from "react";
import { AudioOutlined, PhoneFilled, StopOutlined } from "@ant-design/icons";
import DialpadIcon from "@mui/icons-material/Dialpad";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import VoicemailIcon from "@mui/icons-material/Voicemail";
import MicIcon from "@mui/icons-material/Mic";
import { useSelector, useDispatch } from "react-redux";
export default function Calling(props) {
  const dispatch = useDispatch();
  const { phoneNumberRedux,isComfirm} = useSelector((state) => state.PhoneReducer);
  const [time, setTime] = useState(0);

  const renderTime = () => {
    const min = Math.floor(time/60);
    const second = time - 60*Math.floor(time/60);
    return <div className="text-xl">
      {`${(min<10) ? '0' : ''}${min}:${(second<10) ? '0':''}${second}`}
    </div>
  }


  useEffect(() => {
    if (isComfirm) setTimeout(() => {
      dispatch({
        type: "GET_TIME_CALL",
        content: time+1
      })
      setTime(time+1);
    }, 1000);
  },[isComfirm, time])
  return (
    <div className="w-full h-full  text-white p-10">
      <div className="text-center h-1/3">
        <h1 className="text-3xl text-white font-bold">{phoneNumberRedux}</h1>
        {(!isComfirm) ? <div class="loading text-md">Calling...</div>  :  renderTime()}
      </div>
      <div className="h-1/3 w-full place-items-center grid grid-cols-3">
        <div className="col-span-1 opacity-50 cursor-pointer hover:scale-110 duration-150">
          <div className="rounded-full  w-12 h-12 flex justify-center items-center border-2">
            <MicIcon />
          </div>
          <p className="w-12 text-center">Mute</p>
        </div>
        <div className="col-span-1 opacity-50 cursor-pointer hover:scale-110 duration-150">
          <div className="rounded-full  w-12 h-12 flex justify-center items-center border-2">
          <DialpadIcon />
          </div>
          <p className="w-12 text-center">Dialpad</p>
        </div>
        <div className="col-span-1 opacity-50 cursor-pointer hover:scale-110 duration-150">
          <div className="rounded-full  w-12 h-12 flex justify-center items-center border-2">
          <VoicemailIcon />

          </div>
          <p className="w-12 text-center">Record</p>
        </div>
      </div>
      <button onClick={() => {
       
        props.endFunc()
      }} className="w-full shadow-md relative bg-red-500 hover:bg-red-400 h-10 rounded-md">
        <PhoneDisabledIcon style={{ fontSize: 30, color: "white" }} />
        {/* <PhoneFilled className='absolute right-1/2 top-2' style={{fontSize: 25, color: "white"}} /> */}
      </button>
    </div>
  );
}
