import React from "react";
import JsSIP from "jssip";

class Jssip extends React.PureComponent {
  constructor(props) {
    super(props);
    this.phone = React.createRef();
    this.state = {
      sipUA: null,
      rtcSession: null
    };

  }
  componentDidMount() {
    const socket = new JsSIP.WebSocketInterface("wss://sbc03.tel4vn.com:7444");
    const configuration = {
      sockets: [socket],
      uri: "105@2-test1.gcalls.vn:50061",
      password: "test1105"
    };
    const sipUA = new JsSIP.UA(configuration);
    this.addSIPEventListener("sipUA", sipUA);
    this.setState({ sipUA });
    sipUA.start();
  }

  addSIPEventListener = (type, UA) => {

    Object.keys(this)
      .filter(item => item.startsWith(type))
      .map(item => item.replace(`${type}_`, ""))
      .forEach(item => {
        UA.on(item, event => {
          console.log(this[`${type}_${item}`])
          // this[`${type}_${item}`](event);
        });
      });

    
  };

  sipUA_newRTCSession = event => {
    const {
      session,
      session: { connection: peerconnection },
      originator
    } = event;
    this.addSIPEventListener("rtcSession", session);
    this.setState({ rtcSession: session });
    if (originator === "remote") {
    }
    if (originator === "local") {
      this.addRemoteStream(peerconnection);
    }
  };

  rtcSession_peerconnection = event => {
    const { peerconnection } = event;
    this.addRemoteStream(peerconnection);
  };

  eventHandlers = {
    progress: function (e) {
      console.log("call is in progress");
    },
    failed: function (e) {
      console.log("call failed with cause: " + e.data.cause);
    },
    ended: function (e) {
      console.log("call ended with cause: " + e.data.cause);
    },
    confirmed: function (e) {
      console.log("call confirmed");
    }

  };

  call = () => {
    const { sipUA } = this.state;
    console.log(sipUA);
    sipUA.call(`0829017516`, {
      mediaConstraints: { audio: true, video: false },
      sessionTimersExpires: 120,
      eventHandlers: this.eventHandlers
    });
  };

  addRemoteStream = peerconnection => {
    const [remoteStream] = peerconnection.getRemoteStreams();
    if (remoteStream) {
      this.handleRemoteStream(remoteStream);
    }
    peerconnection.addEventListener("addstream", e => {
      this.handleRemoteStream(e.stream);
    });
  };

  handleRemoteStream = stream => {
    const { current: telAudio } = this.phone;
    console.log(this.phone)

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

  render() {
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <button onClick={() => {
          this.call()
        }}>拨打</button>
        <audio ref={this.phone} autoPlay hidde="true" />
      </div>
    );
  }
}

export default Jssip;
