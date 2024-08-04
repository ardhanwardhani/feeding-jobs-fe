import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import Dashboard from './pages/Dashboard'
import DetailJob from './pages/DetailJob'

function App() {
  return (
    <Router>
      <CssBaseline/>
      <Routes>
        <Route exact path='/' element={<Dashboard/>} />
        <Route path='/jobs/:id' element={<DetailJob/>} />
      </Routes>
    </Router>
  )
}

export default App
