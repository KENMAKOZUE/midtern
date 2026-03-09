import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, Typography, Chip, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

function UserPosts() {
  const { userId } = useParams()
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    fetch(`https://dummyjson.com/posts/user/${userId}`)
      .then(res => res.json())
      .then(data => setPosts(data.posts))
  }, [userId])

  return (
    <div style={{ padding: '16px' }}>
      <Button
        startIcon={<ArrowBackIcon />}
        component={Link}
        to="/"
        style={{ marginBottom: '16px' }}
      >
        Назад к постам
      </Button>

      <Typography variant="h4" gutterBottom>
        Посты пользователя {userId}
      </Typography>

      <div>
        {posts.map((post: any) => (
          <Link key={post.id} to={`/post/${post.id}`} style={{ textDecoration: 'none' }}>
            <Card style={{ marginBottom: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', border: '1px solid #e0e0e0', backgroundColor: '#fafafa', cursor: 'pointer' }}>
              <CardContent>
                <Typography variant="h6" style={{ marginBottom: '8px' }}>ID: {post.id} - {post.title}</Typography>
                <Typography variant="body2" style={{ marginBottom: '12px' }}>{post.body}</Typography>
                {post.tags && Array.isArray(post.tags) && (
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '8px' }}>
                    {post.tags.map((tag: string) => (
                      <Chip key={tag} label={tag} size="small" variant="outlined" />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default UserPosts
