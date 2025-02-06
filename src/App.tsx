import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import UsersList from './pages/UserList'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import OfferList from './pages/OfferList'
import OfferForm from './pages/OfferForm'
import OfferDetail from './pages/OfferDetail'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className='container mx-auto px-8 py-12' />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/userList" element={<UsersList />} />
          <Route path="/offers" element={<OfferList />} />
          <Route path="/offers/:id" element={<OfferDetail />} />
          <Route path="/offers/new" element={<OfferForm />} />
          <Route path="/offers/edit/:id" element={<OfferForm />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
