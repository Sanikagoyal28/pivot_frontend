import React from 'react';
import Login from './components/admin/login';
import AddQues from './components/admin/addQues';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/user/register';
import Quiz from './components/user/quiz';
import Dashboard from './components/user/dashboard';
import Result from './components/user/result';

function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Register />} />
        <Route path="/quiz" exact element={<Quiz />} />
        <Route path="/admin" exact element={<Login />} />
        <Route path="/admin/addQues" exact element={<AddQues />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/result" exact element={<Result />} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App;
