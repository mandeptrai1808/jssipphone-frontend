import React, { useState, useEffect, useRef} from "react";
import JsSIP from "jssip";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'

import Phone from "./Phone";
import Calling from "./Calling";

export default function JssipRFC(props) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    sipAU: null,
    ricSession: null,
  });

  const [session, setSession] = useState(null);

  const {isCall} = useSelector(state => state.PhoneReducer)
  console.log(isCall)

  const phone = useRef();

  const addSIPEventListener = (type, UA) => {
    UA.on("newRTCSession", event => {
        sipUA_newRTCSession(event)
        setSession(event.session)
    })
  
  };

  const sipUA_newRTCSession = (event) => {
    const {
      session,
      session: { connection: peerconnection },
      originator,
    } = event;
    addSIPEventListener("rtcSession", session);
    setState({ rtcSession: session });
    if (originator === "remote") {
    }
    if (originator === "local") {
      addRemoteStream(peerconnection);
    }
  };

  const rtcSession_peerconnection = (event) => {
    const { peerconnection } = event;
    addRemoteStream(peerconnection);
  };

  const eventHandlers = {
    progress: function (e) {
      console.log("call is in progress");
    },
    failed: function (e) {
      dispatch({type: "NOT_CALLING"})
      navigate('/errorphone')
    },
    ended: function (e) {
      dispatch({type: "NOT_CALLING"})
      dispatch({type: "RESET_COMFIRM_CALL"})
      navigate('/endphone')
    },
    confirmed: function (e) {
      dispatch({type: "IS_COMFIRM_CALL"})
     

    },
  };

  const  addRemoteStream = peerconnection => {
    
    const [remoteStream] = peerconnection.getRemoteStreams();
    if (remoteStream) {
      handleRemoteStream(remoteStream);
    }
    peerconnection.addEventListener("addstream", e => {
      handleRemoteStream(e.stream);
    });
}

    const handleRemoteStream = stream => {
        const { current: telAudio } = phone;
        // Display remote stream
        telAudio.srcObject = stream;
    
        stream.addEventListener("addtrack", event => {
          console.log('remote track "addtrack" event', event);
          const { track } = event;
    
          if (telAudio.srcObject !== stream) {
            return;
          }
    
          // Refresh remote video
          telAudio.srcObject = stream;
    
          track.addEventListener("ended", () => {
            console.log('remote track "ended" event [track:%o]', track);
          });
        });
    
        stream.addEventListener("removetrack", event => {
          console.log('remote track "removetrack" event', event);
          if (telAudio.srcObject !== stream) {
            return;
          }
          // Refresh remote video
          telAudio.srcObject = stream;
        });
      };

  const call = (phoneNumber) => {
    const { sipUA } = state;
    sipUA.call(`${phoneNumber}`, {
      mediaConstraints: { audio: true, video: false },
      sessionTimersExpires: 120,
      eventHandlers
    });
  };

  const endCall = () => {
    session.terminate();
  }

  useEffect(() => {

    const socket = new JsSIP.WebSocketInterface("wss://sbc03.tel4vn.com:7444");
    const configuration = {
      sockets: [socket],
      uri: "105@2-test1.gcalls.vn:50061",
      password: "test1105",
    };
    const sipUA = new JsSIP.UA(configuration);
    console.log(sipUA)
    addSIPEventListener("sipUA", sipUA);
    setState({ sipUA });
    try {
      sipUA.start();
      console.log("CONNECTED!");
    } catch (error) {
      console.log("CAN'T CONNECT!");
    }
  }, []);

  console.log(phone)
  return <div className="h-full rounded-md bg-blue-600">
    {!isCall ?  <Phone callFunc = {(phoneNumber) => {
      console.log(phoneNumber)
      call(phoneNumber)
    }}/> : <Calling endFunc={() => {
      endCall();
    }}/> }
    {/* <Calling/> */}
   
        {/* <Button onClick={call}>Call</Button> */}
        <audio ref={phone} autoPlay hidde="true" />
  </div>;
}
