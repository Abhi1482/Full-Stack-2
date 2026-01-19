import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='container mt-4'>
        <h2 className='text-center'>Learning Bootstrap</h2>
        <div className='card p-3 mt-3'>
          <input className='form-control' placeholder='Enter name' />
          <input className='form-control' placeholder='Enter email' />
          <button className='btn btn-primary'>Submit</button>
        </div>
      </div>
    </>
  )
}

export default App