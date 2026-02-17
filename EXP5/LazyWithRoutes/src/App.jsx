import { useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'

const Home = lazy(() => import('./components/home.jsx'),1500)
const About = lazy(() => import('./components/about.jsx'),3000)
const Contact = lazy(() => import('./components/contact.jsx'),3000)

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <nav>
        <button><Link to="/">Home</Link></button>
        <button><Link to="/about">About</Link></button>
        <button><Link to="/contact">Contact</Link></button>
      </nav>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
