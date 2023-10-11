import './css/navbar.css'
import { ImMenu } from 'react-icons/im';
import { AiFillCloseSquare } from 'react-icons/ai';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';


export default function Navbar() {
  var Auth
  const location=useLocation();
  const data=location.state;
  const [openSidebar, setOpenSidebar] = useState(false);
  if(data){
    Auth=true;
  }
  else{
    Auth=false
  }
  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
  }
  return (
    <nav className="nav">
      <div>
        <a href="/" className="site_titile">
          John Service Station
        </a>
      </div>
      <div className='covered'>
        <div className='menu_items'>
          <div className='centered'   >
            {
              (openSidebar === false) ? <ImMenu className='icon' onClick={handleOpenSidebar}></ImMenu> : <AiFillCloseSquare className='icon' onClick={handleOpenSidebar} ></AiFillCloseSquare>
            }
          </div>
        </div>
        <div className={`${(openSidebar === true) ? 'block' : 'hidden'}`}>
          <ul>
            <li>
              <a href="/service">Services</a>
            </li>           
            <li>
              <a href="/placeorder/orders">Orders</a>
            </li>
            <li>
              {Auth?
              (<a style={{ border: "2px solid #f64c72" }}  href="/logout">Logout</a>)
              :
              (<a style={{ border: "2px solid #f64c72" }}  href="/logout">login</a>)}
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}
