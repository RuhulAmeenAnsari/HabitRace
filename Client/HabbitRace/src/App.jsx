import React from 'react'
import {Routes,Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import UserSignUp from './pages/UserSignUp'
import UserLogin from './pages/UserLogin'
import Home from './pages/Home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'

const App = () => {
  return (
  <>
  <Routes>

    <Route path='/' element={<LandingPage/>}></Route>
    <Route path='/user-signUp' element={<UserSignUp/>}></Route>
    <Route path='/user-login' element={<UserLogin/>}></Route>
    <Route path='/home' element={<UserProtectedWrapper><Home/></UserProtectedWrapper>}></Route>

  </Routes>
  </>
  )
}

export default App