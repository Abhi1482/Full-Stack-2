import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
function Profile(){
  return (
    <div className='app-container'>
      <marquee loops="5">
        <h1>Welcome to my Profile</h1>
      </marquee>
      <h1>Abhijeet</h1>
      <h2>Full Stack Developer</h2>
      
    </div>
  )
}
function Dashboard(){
  return (
    <div className='app-container'>
    <h1>Skills</h1>
    <h2>HTML</h2>
    <h2>CSS</h2>
    </div>
  )
}
function App() {
  return  (
   
   <BrowserRouter>
     <div className='app-container'>
      <h1>Click on a button below</h1>
      <div className='btn-group'>
        <Link to="/profile"><button>Go to Profile</button></Link>
        <Link to="/dashboard"><button>Go to Dashboard</button></Link>
      </div>
  
   </div>
    <Routes>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
   </BrowserRouter>
 
  )
}

export default App
