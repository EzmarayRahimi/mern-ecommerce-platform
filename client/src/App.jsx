import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'

import Addproduct  from './pages/Addproduct.jsx'
import HomePage from './pages/HomePage.jsx'

function App() {
  

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/add' element={<Addproduct/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
