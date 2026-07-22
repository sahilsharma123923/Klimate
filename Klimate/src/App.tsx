import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from './components/Layout'
import { ThemeProvider } from './context/Theme-provider'
import WeatherDashboard from './pages/WeatherDashboard'
import CityPage from './pages/CityPage'

function App() {

  return (
    <div>
  <BrowserRouter>
    <ThemeProvider>
      <Layout>
       <Routes>
        <Route path='/' element={<WeatherDashboard/>}/>
        <Route path='/city/:cityname' element={<CityPage/>}/>
       </Routes>
      </Layout>
    </ThemeProvider>
  </BrowserRouter>
    </div>
    
  )
}

export default App
