import React from 'react';
import Login from './components/admin/login';
import AddQues from './components/admin/addQues';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/admin" exact element={<Login />} />
        <Route path="/admin/addQues" exact element={<AddQues />} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App;
