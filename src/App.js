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
import ModalTemplate from './Templates/ModalTemplate';
import History from './Page/History';
import SearchTemplate from './Templates/SearchTemplate';
import BookCall from './Page/BookCall';
import SaveAddressModal from './Templates/SaveAddressModal';
import Admin from './Page/Admin';
import SocketIO from './Components/SocketIO';

export default function App() {
  

  return (
    <div className="App">
      <SocketIO/>
      <ModalTemplate/>
      <SaveAddressModal/>
      <BrowserRouter>
        <Routes>
          <Route path="/users" element={<MainTemplate component={<User/>}/>}/>
          <Route path="/history" element={<SearchTemplate component={<History/>}/>}/>
          <Route path="/book" element={<SearchTemplate component={<BookCall/>}/>}/>
          <Route path="/phone" element={<PhoneTemplate component={<JssipRFC/>}/>}/>
          <Route path="/endphone" element={<PhoneTemplate component={<EndPhone/>}/>}/>
          <Route path="/errorphone" element={<PhoneTemplate component={<ErrorPhone/>}/>}/>
          <Route path="/" element={<PhoneTemplate component={<Login/>}/>}/>
          <Route path="/admin" element={<Admin/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
