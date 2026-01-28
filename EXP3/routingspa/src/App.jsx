import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
function home(){
  return <h1>Home Page</h1>
}
function contact(){
  return <h1>Contact Page</h1>
}
function about(){
  return <h1>About Page</h1>
}
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={home()}></Route>
      <Route path='/contact' element={contact()}></Route>
      <Route path='/about' element={about()}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
