import React from 'react'
import {Routes,Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import UserSignUp from './pages/UserSignUp'
import UserLogin from './pages/UserLogin'
import Home from './pages/Home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import CreateHabit from './pages/CreateHabit'
import JoinHabbits from './pages/JoinHabbits'

const App = () => {
  return (
  <>
  <Routes>

    <Route path='/' element={<LandingPage/>}></Route>
    <Route path='/user-signUp' element={<UserSignUp/>}></Route>
    <Route path='/user-login' element={<UserLogin/>}></Route>
    <Route path='/home' element={<UserProtectedWrapper><Home/></UserProtectedWrapper>}></Route>
    <Route path='/habit/create' element={<UserProtectedWrapper><CreateHabit/></UserProtectedWrapper>}></Route>
    <Route path='/habit/join' element={<UserProtectedWrapper><JoinHabbits/></UserProtectedWrapper>}></Route>

  </Routes>
  </>
  )
}

export default App