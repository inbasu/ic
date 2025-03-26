import { BrowserRouter, Routes, Route } from 'react-router-dom';
// MUI

import './App.css'
import Main from './pages/main'
import ItemCard from './pages/card';

export const API_URL: string = "http://127.0.0.1:8000";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/:key" element={<ItemCard />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
