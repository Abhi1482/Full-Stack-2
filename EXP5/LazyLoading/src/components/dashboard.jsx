
import './dashboard.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function Profile(){
  return (
    <div className='app-container'>
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
export default Dashboard
