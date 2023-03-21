import Main from "./components/Main.js";
import Cart from './components/Cart.js';
import Event from './components/Event.js';
import Payment from "./components/Payment";
import OrderConfirm from './components/OrderConfirm.js';
import Header from './components/common/Header.js';
import {BrowserRouter, Route, Routes, Link, Switch} from "react-router-dom";

function App() {
    return (
        <div className='App'>
            <Header/>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Main/>}/>
                    <Route exact path="/cart" element={<Cart/>}/>
                    <Route exact path="/event" element={<Event/>}/>
                    <Route exact path="/order/payment" element={<Payment/>}/>
                    <Route exact path="/order/confirm" element={<OrderConfirm/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;