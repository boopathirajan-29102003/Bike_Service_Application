import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './css/orders.css'
import { useLocation, useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [order, setOrders] = useState([]);
  const data = location.state;
  const email=data.email;
  useEffect(() => {
      const fetchData = async () => {
      const response = await axios.post("http://localhost:5000/./dataofuser",{email});
      const orders = response.data;
      
      setOrders(orders);
    };
    fetchData();
  }, []);
  console.log(order);
  console.log(data);
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
              {!item.current_status ?(
                <button type='button' className='process' value="processing" onClick={()=>{
                  item.current_status=!item.current_status}}>processing..</button>
              ):(
                <button type='button' className='completed' value="Completed">Completed</button>
              )
              }
            </div>
          </>
        ))}
      </div>
    </div>

  )
}

export default Orders;
