// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GamePlayer from './views/GamePlayer'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div id="app-layout">
      <div className="games-bar">
        <h3>Play games</h3>
        <nav>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </nav>
      </div>

      <div className="router-view">
        <GamePlayer />
      </div>
    </div>
  )
}

export default App
