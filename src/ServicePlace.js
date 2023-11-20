import React, { useState } from 'react'
import './css/login.css'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EmailJS from 'emailjs-com';
import { serviceId, templateId, publicKey } from './sendEmail';

export default function ServicePlace() {
  const [General_service, setGcheck] = useState(false);
  const [oil_service, setOcheck] = useState(false);
  const [water_service, setWcheck] = useState(false);
  const [final_date, setDate] = useState(new Date());

  const navigate = useNavigate();

  const location = useLocation()
  const data = location.state;
  var email;
  if (data === null) {
    navigate('./logout')
  }
  else {
    email = data.email;
  }
  const current_status = false;
  const value = {
    email: "boopathirajan29102003@gmail.com",
    data: "new order"
  }
  const handleOrders = (e) => {
    e.preventDefault();
    if ((General_service || oil_service || water_service) && (final_date > new Date())) {
      axios.post('http://localhost:5000/serviceplace', { email, General_service, oil_service, water_service, final_date, current_status })
        .then(async res => {
          navigate('./orders', { state: data })
          await EmailJS.send(serviceId, templateId, value, publicKey);

        }).catch(err => {
          console.log("err");
        })
    }
    else {
      alert("please check atleast one service or date must be greater then current date");
    }
  }

  return (
    <div className='container'>
      <br />
      <h1>Service</h1>
      <form onSubmit={handleOrders}>
        <div className="group">
          <label htmlFor="service" style={{}}  >Services</label><br />
          <div className='checkedItems'>
            <div className='check'>
              <input type="checkbox" name="General Service" id="G-service" onChange={(e) => setGcheck(e.target.checked)} checked={General_service} /><br />
              <input type="checkbox" name="Oil Service" id="O-service" onChange={(e) => setOcheck(e.target.checked)} checked={oil_service} /><br />
              <input type="checkbox" name="Water Service" id="W-service" onChange={(e) => setWcheck(e.target.checked)} checked={water_service} /><br />
            </div>
            <div className='services'>
              <label htmlFor="service" className='label'>General Service</label>
              <label htmlFor="service" className='label'>Oil Service</label>
              <label htmlFor="service" className='label'>Water Service</label>
            </div>
          </div>
        </div>
        <div className="group">
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" onChange={(e) => setDate(new Date(e.target.value))} required />
        </div>
        <button type="submit" >Register</button>
      </form>
    </div>
  )
}
