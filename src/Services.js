import React, { useLocation,useNavigate } from "react-router-dom";
import './css/services.css'

const Services = () => {
    const location = useLocation();
    const navigate= useNavigate();
    const data=location.state;
    var name
    if(data){
        name=data.name;
    }
    const handleOrders=()=>{
        navigate('/placeorder',{state:data})
    }
    
    return (
        <div className='main'>
            <br/>
            <div className='information'>
                <h3>Hello {name},</h3>
                <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I mentioned some services that are available
                    in my station. Click to see service details about each service.
                    You can schedule a date for that I will contact you via email when I have completed the service.
                </p>
            </div>
            <div className='services'>
                <div className='images'>
                    <div className='img1 img'>
                        <img src={require('./images/general_service.avif')} alt='general service' />
                        <p className="headings" style={{ color: '#f64c72' }} onClick={handleOrders}>General service </p>
                        <p className="para">&nbsp;&nbsp;&nbsp;A general service is a routine maintenance check-up for your vehicle that helps to keep it running smoothly and efficiently. It typically includes the following:
                            Engine oil and filter change, Tire pressure check and inflation, Brake inspection,
                            Fluid level checks and top-offs, Air filter replacement, Spark plug replacement
                            General inspection of the vehicle's components. The cost of a general service in India varies depending on the type of vehicle, the make and model, and the location. However, you can expect to pay around <span >Rs. 1,500 to Rs. 2,500</span> for a general service for a hatchback or sedan.</p>
                    </div> 
                    <div className='img2 img' >
                        <img src={require('./images/oil_change.avif')} alt='oil change' />
                        <p className="headings" style={{ color: '#f64c72' }} onClick={handleOrders}>Oil change </p>
                        <p className="para">&nbsp;&nbsp;&nbsp;An oil change is one of the most important maintenance tasks that you can perform on your vehicle. Engine oil helps to lubricate and protect the engine's components, and it also helps to remove heat and dirt from the engine.
                            Over time, engine oil breaks down and loses its effectiveness. This is why it is important to change your vehicle's engine oil regularly. The frequency of oil changes depends on the type of vehicle, the make and model, and the type of oil that you use.
                            The cost of an oil change in India varies depending on the type of oil that you use and the location. However, you can expect to pay around <span>Rs. 500 to Rs. 1,000</span> for an oil change for a hatchback or sedan.</p>
                    </div>
                    <div className='img3 img' >
                        <img src={require('./images/water_wash.jpg')} alt='water wash' />
                        <p className="headings" style={{ color: '#f64c72' }} onClick={handleOrders}>Water wash </p>
                        <p className="para">&nbsp;&nbsp;&nbsp;A water wash is a basic cleaning service that removes dirt, dust, and grime from the exterior of your vehicle. It is important to water wash your vehicle regularly to protect the paint and prevent rust.
                            The cost of a water wash in India varies depending on the size of the vehicle and the location. However, you can expect to pay around <span>Rs. 200 to Rs. 500</span> for a water wash for a hatchback or sedan.
                            These are just general estimates, and the actual cost of these services may vary depending on your specific vehicle and location. It is always a good idea to call around and get quotes from different service providers before booking a service.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services
