import logo from './logo.svg';
import './App.css';
import Main from "./components/Main.js"
import Header from './components/common/Header.js';
import {BrowserRouter, Route, Routes, Link, Switch} from "react-router-dom";
import {useState, useEffect} from "react";

function App() {
    const [message, setMessage] = useState("");
    useEffect(() => {
        fetch('/')
            .then(response => response.text())
            .then(data => {
                console.log(data);
            });
    }, [])
    return (
        <div className='App'>
            <Header/>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Main/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;