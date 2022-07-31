import React, { useEffect } from "react";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAddressByUserId,
  GetHistoriesByUserId,
} from "../Redux/Actions/AppAction";
import SaveIcon from "@mui/icons-material/Save";
import dateFormat from "dateformat";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import Item from "antd/lib/list/Item";
export default function History() {
  const navigate = useNavigate();

  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);

  const callThisNumber = (phone) => {
    dispatch({
      type: "GET_TEMP_PHONE",
      content: phone,
    });
    navigate("/phone");
  };

  const { historiesCall, bookAddress, searchData } = useSelector(
    (state) => state.AppReducer
  );

  const arrRender = historiesCall.filter((item) => {
    const findAddress = bookAddress.find(
      (element) => element.phone == item.phone
    );
    return (item.phone?.includes(searchData) || findAddress.name?.includes(searchData))    
  })


  const dispatch = useDispatch();
  const testRender = arrRender.map((item, index) => {
    const findAddress = bookAddress.find(
      (element) => element.phone == item.phone
    );

    const renderTime = () => {
      const min = Math.floor(item.timeCall / 60);
      const second = item.timeCall - 60 * Math.floor(item.timeCall / 60);
      return (
        <span> {`${min} phút ${second < 10 ? "0" : ""}${second} giây`} </span>
      );
    };
    return (
      <div
        key={index}
        className="w-full hover:bg-slate-100 cursor-pointer flex items-center p-5 border-t border-b"
      >
        <div
          onClick={() => {
            callThisNumber(item.phone);
          }}
          className="mr-5 text-red-500"
        >
          <PhoneForwardedIcon style={{ fontSize: 50 }} />
        </div>
        <div
          className="w-1/3"
        >
          {findAddress ? (
            <div
              onClick={() => {
                callThisNumber(item.phone);
              }}
            >
              <p className="m-0 font-bold text-xl">{findAddress.name}</p>
              <p className="m-0">{item.phone}</p>
            </div>
          ) : (
            <div>
              <p
                onClick={() => {
                  callThisNumber(item.phone);
                }}
                className="m-0 font-bold text-xl"
              >
                Unknow
              </p>
              <p
                className="m-0"
                onClick={() => {
                  callThisNumber(item.phone);
                }}
              >
                {item.phone}
              </p>
              <Button onClick={() => {
                dispatch({
                  type: "OPEN_SAVE_ADDRESS",
                  phone: item.phone,
                  name: '',
                  update: false
                })
              }}  type="primary">
                Lưu vào danh bạ <SaveIcon />
              </Button>
            </div>
          )}
        </div>
        <div
          onClick={() => {
            callThisNumber(item.phone);
          }}
          className="text-right md:pl-10 pl-5"
        >
          <p className="mt-0" style={{ fontSize: 11 }}>
            Thời lượng: {renderTime()}
          </p>
          <p className="mt-0" style={{ fontSize: 11 }}>
            {dateFormat(item.createdAt, "H:MM, dd/mm/yyyy")}
          </p>
        </div>
      </div>
    );
  });

  useEffect(() => {
    if (userData.id) dispatch(GetAddressByUserId(userData.id));
    dispatch(GetHistoriesByUserId(userData.id));
  }, []);

  return (
    <div className="pt-12 pb-20 overflow-y-auto h-full w-full">
      {testRender}
    </div>
  );
}
