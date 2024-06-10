import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Main from './components/Main'
import Aside from './components/Aside'
import Search from './components/Search'
import Home from './pages/Home'
import MelonPage from './pages/MelonPage'
import BugsPage from './pages/BugsPage'
import ApplePage from './pages/ApplePage'
import GeniePage from './pages/GeniePage'
import BillPage from './pages/BillPage'
import Recent from './pages/Recent'
import Favorites from './pages/Favorites'
import Mymusic from './pages/Mymusic'



const App = () => {
  return (

    <BrowserRouter>
      <Header />
      <Main>
        <Search />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/MelonPage' element={<MelonPage />} />
          <Route path='/BugsPage' element={<BugsPage />} />
          <Route path='/ApplePage' element={<ApplePage />} />
          <Route path='/GeniePage' element={<GeniePage />} />
          <Route path='/BillPage' element={<BillPage />} />
          <Route path='/Recent' element={<Recent />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/mymusic' element={<Mymusic />} />
        </Routes>
      </Main>
      <Aside />
    </BrowserRouter>

  )
}

export default App
