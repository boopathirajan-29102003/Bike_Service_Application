import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import SignUp from './SignUp';
import Login from './Login';
import Services from './Services';
import Navbar from './Navbar';
import OrdersAdmin from './OrdersAdmin';
import Orders from './Orders';
import ServicePlace from "./ServicePlace";

const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<><Navbar /><SignUp /></>} />
          <Route path="/navbar" element={<><Navbar /></>} />
          <Route path="/login" element={<><Navbar /><Login /></>} />
          <Route path="/service" element={<><Navbar /><Services /></>} />
          <Route path="/logout" element={<><Navbar /><Login /></>} />
          <Route path="/placeorder" element={<><Navbar /><ServicePlace /></>} />
          <Route path="/ordersAdmin" element={<><Navbar /><OrdersAdmin /></>} />
          <Route path="/placeorder/orders" element={<><Navbar /><Orders /></>} />
          <Route path="/placeorder/logout" element={<><Navbar /><Login /></>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;