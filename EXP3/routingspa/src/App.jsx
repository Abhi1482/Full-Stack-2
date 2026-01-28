import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
function Home(){
  return <h1>Home Page</h1>
}
function Contact(){
  return <h1>Contact Page</h1>
}
function About(){
  return <h1>About Page</h1>
}
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
      <Route path='/about' element={<About/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
