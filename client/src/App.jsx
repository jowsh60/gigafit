import React, { useState, useContext, useEffect } from 'react'
import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
import Dashboard from './components/Dashboard'
import DayLogger from './components/DayLogger'
import AddWorkout from './components/AddWorkout'
import AddMeal from './components/AddMeal'
import Login from './components/Login'
import Register from './components/Register'
import Account from './components/Account'
import { CookiesProvider, useCookies } from 'react-cookie'

export const TokenContext = React.createContext(null)
const ProtectedRoute = ({ element }) => {
  const [token, setToken] = useContext(TokenContext)
  return !(token == null || token == undefined || token === 'undefined') ? element() : <Navigate to="/login" />
}

function App() {
  const [token, setToken] = useState(null)
  const [cookies, setCookie] = useCookies(['dark'])
  
  useEffect(()=>{ //Refresh theme cookies
    if(cookies.dark != undefined){
        setCookie('dark', cookies.dark, { path: '/', maxAge:604800 })
    }
}, [])

  return (
    <Router>
      <CookiesProvider>
        <TokenContext.Provider value={[token, setToken]}>
          <Routes>
            <Route path="/" element={<ProtectedRoute element={Layout} />} >
              <Route index element={<Dashboard />} />
              <Route path="daylogger" element={<DayLogger />} />
              <Route path="addworkout" element={<AddWorkout />} />
              <Route path="addmeal" element={<AddMeal />} />
              <Route path="account" element={<Account />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
        </TokenContext.Provider>
      </CookiesProvider>
    </Router>
  )

}

export default App
