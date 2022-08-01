import React, {useEffect} from 'react'
import {io} from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { GetAllHistories, GetUserLogs } from '../Redux/Actions/AppAction';

export const socket = io.connect("https://jssipphone-backend.herokuapp.com");

export const UpdateUserLogs = () => {
  socket.emit("UpdateUserLogs")
}

export const UpdateHistories = () => {
  socket.emit("UpdateHistories")
}

export default function SocketIO() {
    const dispatch = useDispatch();

    useEffect(() => {
      socket.on('DoUpdateUserLogs', () => {
        dispatch(GetUserLogs())
      })
      socket.on('DoUpdateHistories', () => {
        dispatch(GetAllHistories())
      })
    }, [socket])

  return (
    <div></div>
  )
}
