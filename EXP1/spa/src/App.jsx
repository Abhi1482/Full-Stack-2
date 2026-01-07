import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1 className="box">Counter</h1>
      <h2 className="box">{count}</h2>
      <button className="box" onClick={() => setCount(count - 1)}> - </button>
      <button className="box" onClick={() => setCount(count + 1)}> + </button>
    </div>
  );
}

export default App;