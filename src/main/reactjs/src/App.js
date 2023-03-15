import Main from "./components/Main.js";
import Cart from './components/Cart.js';
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
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;