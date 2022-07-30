import './App.css';
import JsSIP from "jssip";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import JssipRFC from "./Components/JssipRFC";
import Jssip from "./Jssip";
import MainTemplate from './Templates/MainTemplate'
import User from './Page/User';
import PhoneTemplate from './Templates/PhoneTemplate';
import EndPhone from './Components/EndPhone';
import ErrorPhone from './Components/ErrorPhone';
import Login from './Page/Login';

export default function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/users" element={<MainTemplate component={<User/>}/>}/>
          <Route path="/phone" element={<PhoneTemplate component={<JssipRFC/>}/>}/>
          <Route path="/endphone" element={<PhoneTemplate component={<EndPhone/>}/>}/>
          <Route path="/errorphone" element={<PhoneTemplate component={<ErrorPhone/>}/>}/>
          <Route path="/" element={<PhoneTemplate component={<Login/>}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
