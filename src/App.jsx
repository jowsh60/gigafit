import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Layout from './components/shared/Layout'
import Dashboard from './components/Dashboard'
import DayLogger from './components/DayLogger'
import AddWorkout from './components/AddWorkout'
import AddMeal from './components/AddMeal'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route index element={<Dashboard />} />
          <Route path="daylogger" element={<DayLogger />} />
          <Route path="addmeal" element={<AddMeal />} />
        </Route>
        <Route path="login" element={<div>login page</div>}/>
      </Routes>
    </Router>
  )
  
}

export default App
