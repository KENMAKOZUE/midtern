import { useState} from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import './App.css'

const theme = createTheme()

function App() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [postId, setPostId] = useState('')
  const [userId, setUserId] = useState('')

  const fetchData = async (url: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to fetch')
      const json = await response.json()
      setData(json)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const handleFetchPosts = () => fetchData('https://dummyjson.com/posts')
  const handleFetchPostById = () => {
    if (!postId) return
    fetchData(`https://dummyjson.com/posts/${postId}`)
  }
  const handleFetchComments = () => {
    if (!postId) return
    fetchData(`https://dummyjson.com/posts/${postId}/comments`)
  }
  const handleFetchPostsByUser = () => {
    if (!userId) return
    fetchData(`https://dummyjson.com/posts/user/${userId}`)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          BLOG BY Beka
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Button variant="contained" onClick={handleFetchPosts} sx={{ mr: 1 }}>
            Get All Posts
          </Button>
          <TextField
            label="Post ID"
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
            sx={{ mr: 1 }}
          />
          <Button variant="contained" onClick={handleFetchPostById} sx={{ mr: 1 }}>
            Get Post by ID
          </Button>
          <Button variant="contained" onClick={handleFetchComments} sx={{ mr: 1 }}>
            Get Comments
          </Button>
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            sx={{ mr: 1 }}
          />
          <Button variant="contained" onClick={handleFetchPostsByUser}>
            Get Posts by User
          </Button>
        </Box>
        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}
        {data && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Post: {data.id}</Typography>
            <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
              {JSON.stringify(data, null, 2)}
            </pre>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  )
}

export default App
