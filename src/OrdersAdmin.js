import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './css/orders.css'
import EmailJS from 'emailjs-com';
import { useLocation } from 'react-router-dom';
import { serviceId,templateId,publicKey } from './sendEmail';


const Orders = () => {
  const location = useLocation();

  const [order, setOrders] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
      const response = await axios.get("http://localhost:5000/./data");
      const orders = response.data;
      setOrders(orders);
    };
    fetchData();
  }, []);
  const data = location.state;
  console.log(data);
  const value={email:"boopathirajan29102003@gmail.com",
              data:"sucessfully completed"
}
  const handleComplete=(email)=>{
    axios.post('http://localhost:5000/./changestatus',{email})
    .then(async res =>{
      console.log(res.data)
        await EmailJS.send(serviceId, templateId, value, publicKey);
    }).catch(err=>{
      console.log(err);
    })
  }
  return (
    <div className='Ordermain'>

      <div className='show'>
        <center><h2>Your orders</h2></center>
        {order.map((item) => (
          <>
            <div className="container">
              <center><p key={item._id}>{item.email}</p></center>
              <label htmlFor="service" style={{}}  >Services</label><br />
              <div className='checkedItems'>
                <div className='check'>
                  <input type="checkbox" name="General Service" id="G-service" checked={item.General_service} /><br />
                  <input type="checkbox" name="Oil Service" id="O-service" checked={item.oil_service} /><br />
                  <input type="checkbox" name="Water Service" id="W-service" checked={item.water_service} /><br />
                </div>
                <div className='services'>
                  <label htmlFor="service" className='label'>General Service</label>
                  <label htmlFor="service" className='label'>Oil Service</label>
                  <label htmlFor="service" className='label'>Water Service</label>
                </div>
              </div>
              <p>Final date - {(item.final_date).slice(0,10)}</p>
                  <button type='button' className='completed' value="processing" onClick={handleComplete(item.email)}>Complete</button>
            </div>
          </>
        ))}
      </div>
    </div>

  )
}

export default Orders;
