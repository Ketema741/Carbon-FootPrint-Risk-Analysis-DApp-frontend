import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreateAnalysis, Home, Profile, Register, Login } from './pages';
import AuthState from './context/auth/AuthState';
import {Layout} from './components'

const App = () => {
  return (
    <AuthState>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-analysis" element={<CreateAnalysis />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthState>
  )
}

export default App