import Main from "./components/Main.js";
import Cart from './components/Cart.js';
import Event from './components/Event.js';
import Order from "./components/order/Order";
import OrderConfirm from './components/order/OrderConfirm.js';
import OrderList from "./components/OrderList.js";
import Header from './components/common/Header.js';
import {BrowserRouter, Route, Routes, Link, Switch} from "react-router-dom";
import OrderComplete from "./components/order/OrderComplete";
import OrderDetails from "./components/order/OrderDetails";

function App() {
    return (
        <div className='App'>
            <Header/>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Main/>}/>
                    <Route exact path="/cart" element={<Cart/>}/>
                    <Route exact path="/event" element={<Event/>}/>
                    <Route exact path="/order/list" element={<Order/>}/>
                    <Route exact path="/order/confirm" element={<OrderConfirm/>}/>
                    <Route exact path="/order/details" element={<OrderDetails/>}/>
                    <Route exact path="/order/complete" element={<OrderComplete/>}/>
                    <Route exact path="/admin/orderlist" element={<OrderList/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;