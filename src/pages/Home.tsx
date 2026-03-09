import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Box, Card, CardContent, Typography, Chip, TextField, Button } from '@mui/material'

function Home() {
  const [posts, setPosts] = useState<any[]>([])
  const [userId, setUserId] = useState('')

  useEffect(() => {
    fetch('https://dummyjson.com/posts')
      .then(res => res.json())
      .then(data => setPosts(data.posts))
  }, [])

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        All Posts
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Find posts by user ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          sx={{ mr: 1 }}
        />
        <Button
          variant="contained"
          onClick={() => {
            if (userId) {
              window.location.href = `/user/${userId}/posts`
            }
          }}
        >
          Search
        </Button>
      </Box>
      <Box>
        {posts.map((post: any) => (
          <Link key={post.id} to={`/post/${post.id}`} style={{ textDecoration: 'none' }}>
            <Card sx={{ mb: 2, boxShadow: 2, border: '1px solid #e0e0e0', backgroundColor: '#fafafa', cursor: 'pointer', '&:hover': { boxShadow: 4 } }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>ID: {post.id} - {post.title}</Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }}>{post.body}</Typography>
                {post.tags && Array.isArray(post.tags) && (
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 1 }}>
                    {post.tags.map((tag: string) => (
                      <Chip key={tag} label={tag} size="small" variant="outlined" />
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </Box>
    </Box>
  )
}

export default Home
