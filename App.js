import logo from "./logo.svg";
// import './App.css';
// import './App.min.css';
import "./assets/css/custom.css";
import "./assets/css/app.css";
// import './assets/css/app.min.css'
import "./assets/css/RealCustom.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Router from "./Routes/SidebarRouting";


function App() {

  return (
    <>
    
      <BrowserRouter>
      <Router/>
      
    </BrowserRouter>
    </>
  );
  
}

export default App;


