import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import './App.css'

function App() {
  const [data, setData] = useState<any>(null)
  const [postId, setPostId] = useState('')
  const [userId, setUserId] = useState('')

  const getData = (url: string) => {
    fetch(url)
      .then(res => res.json())
      .then(json => setData(json))
  }

  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          BLOG BY Beka
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Button variant="contained" onClick={() => getData('https://dummyjson.com/posts')} sx={{ mr: 1 }}>
            Get All Posts
          </Button>
          <TextField
            label="Post ID"
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
            sx={{ mr: 1 }}
          />
          <Button variant="contained" onClick={() => postId && getData(`https://dummyjson.com/posts/${postId}`)} sx={{ mr: 1 }}>
            Get Post by ID
          </Button>
          <Button variant="contained" onClick={() => postId && getData(`https://dummyjson.com/posts/${postId}/comments`)} sx={{ mr: 1 }}>
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
          <Button variant="contained" onClick={() => userId && getData(`https://dummyjson.com/posts/user/${userId}`)}>
            Get Posts by User
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          {data && (
            <>
              {Array.isArray(data) && data.map((item: any) => (
                <Card key={item.id} sx={{ mb: 2, boxShadow: 2 }}>
                  <CardContent>
                    <Typography variant="h6">ID: {item.id} - {item.title}</Typography>
                    <Typography variant="body2">{item.body}</Typography>
                  </CardContent>
                </Card>
              ))}
              {data.posts && Array.isArray(data.posts) && data.posts.map((post: any) => (
                <Card key={post.id} sx={{ mb: 2, boxShadow: 2 }}>
                  <CardContent>
                    <Typography variant="h6">ID: {post.id} - {post.title}</Typography>
                    <Typography variant="body2">{post.body}</Typography>
                  </CardContent>
                </Card>
              ))}
              {data.comments && Array.isArray(data.comments) && data.comments.map((comment: any) => (
                <Card key={comment.id} sx={{ mb: 2, boxShadow: 2, backgroundColor: '#f0f8ff' }}>
                  <CardContent>
                    <Typography variant="body1">{comment.body}</Typography>
                    <Typography variant="caption">By user {comment.user.id}</Typography>
                  </CardContent>
                </Card>
              ))}
              {!Array.isArray(data) && !data.posts && !data.comments && (
                <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
                  {JSON.stringify(data, null, 2)}
                </pre>
              )}
            </>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
