import React from 'react'
import {Navbar, CategoryBar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <CategoryBar />
      <Routes />
    </div>
  )
}

export default App
