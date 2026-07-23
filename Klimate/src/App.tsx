import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from './components/Layout'
import { ThemeProvider } from './context/Theme-provider'
import WeatherDashboard from './pages/WeatherDashboard'
import CityPage from './pages/CityPage'
import {QueryClientProvider,QueryClient} from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'




const queryClient = new QueryClient();

function App() {
  
  return (
  
  <QueryClientProvider client={queryClient}>
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
  <ReactQueryDevtools initialIsOpen={false} />
 </QueryClientProvider>
  
    
  )
}

export default App
