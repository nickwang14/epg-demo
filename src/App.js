import React from 'react'
import Header from './components/Header'
import Routes from './routes/Routes'
import './App.scss'

const App = () => {
  return (
    <span className='App background'>
      <Header />

      <main className='wrapper'>
        <Routes />
      </main>
    </span>
  )
}

export default App
