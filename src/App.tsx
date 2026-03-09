import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import UserPosts from './pages/UserPosts'
import './App.css'

function App() {
  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/user/:userId/posts" element={<UserPosts />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
