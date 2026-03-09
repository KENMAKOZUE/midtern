import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Box, Card, CardContent, Typography, Chip, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

function UserPosts() {
  const { userId } = useParams()
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    fetch(`https://dummyjson.com/posts/user/${userId}`)
      .then(res => res.json())
      .then(data => setPosts(data.items))
  }, [userId])

  return (
    <Box sx={{ p: 2 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        component={Link}
        to="/"
        sx={{ mb: 2 }}
      >
        Back to Posts
      </Button>

      <Typography variant="h4" gutterBottom>
        Posts by User {userId}
      </Typography>

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

export default UserPosts
