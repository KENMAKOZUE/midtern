import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, Typography, Chip, TextField, Button } from '@mui/material'

function Home() {
  const [posts, setPosts] = useState<any[]>([])
  const [userId, setUserId] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetch('https://dummyjson.com/posts')
      .then(res => res.json())
      .then(data => setPosts(data.posts))
  }, [])

  return (
    <div style={{ padding: '16px' }}>
      <Typography variant="h4" gutterBottom>
        Все посты
      </Typography>
      <div style={{ marginBottom: '16px' }}>
        <TextField
          label="Найти посты по ID пользователя"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ marginRight: '8px' }}
        />
        <Button
          variant="contained"
          onClick={() => {
            if (userId) {
              navigate(`/user/${userId}/posts`)
            }
          }}
        >
          Поиск
        </Button>
      </div>
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

export default Home
