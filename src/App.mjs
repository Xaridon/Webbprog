import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, {useState} from 'react';
import { NavLink, Outlet, useNavigation } from "react-router-dom";
import Salad from './Salad.mjs';




function App() {



  const [shoppingCart, setSalads] = useState(load);
   
  function load (){
    return Salad.parse(localStorage.getItem("shoppingCart"))
  }



  return (
    <><div className="container py-4">
      <Header />
      <NavBar />
      {navigation.state === 'loading' ? (
          <BootstrapSpinner /> 
        ) : (
          <Outlet context={{ shoppingCart, setSalads }}/>
        )}
      <Footer />
    </div></>
        



  );
}

function Header() { return (
  <header className="pb-3 mb-4 border-bottom">
    <span className="fs-4">Min egen salladsbar</span>
  </header>
)}

function NavBar() { return (
  
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <NavLink className="nav-link" to="/">
          Hem
      </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/compose-salad">
          Komponera en sallad
      </NavLink>
      </li>
      <li className='nav-item'>
      <NavLink className="nav-link" to="/view-order">
          Se din order
      </NavLink>
    </li>
    
  </ul>
  

)}; 

function Footer(props) { return (
  <footer className="pt-3 mt-4 text-muted border-top">
    EDAF90 - webprogrammering
  </footer>
)};

function BootstrapSpinner() {
  return (
    <div className="p-3 m-3 d-flex justify-content-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )}



export default App;
