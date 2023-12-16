import { useState } from "react"
import Header from './components/Header'
import Cards from "./components/Cards";
import './App.css'

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const scores = {
    score: score,
    bestScore: bestScore,
    setScore: setScore,
    setBestScore: setBestScore,
  }

  return (
    <>
      <Header scores={scores} />
      <Cards scores={scores} />
    </>
  )
}

export default App
