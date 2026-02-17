import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import{ lazy, Suspense } from 'react'


function App() {
  const Dashboard = lazy(() => import('./Components/dashboard.jsx'),500)
  return  (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard/>
    </Suspense>
  )
}

export default App