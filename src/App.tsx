import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import UserPosts from './pages/UserPosts'
import './App.css'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/user/:userId/posts" element={<UserPosts />} />
      </Routes>
    </Router>
  )
}

export default App
