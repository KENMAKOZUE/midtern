import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, Typography, Chip, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState<any>(null)
  const [comments, setComments] = useState<any[]>([])

  useEffect(() => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data))

    fetch(`https://dummyjson.com/posts/${id}/comments`)
      .then(res => res.json())
      .then(data => setComments(data.comments))
  }, [id])

  if (!post) {
    return <Typography style={{ padding: '16px' }}>Загрузка...</Typography>
  }

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

      <Card style={{ marginBottom: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', border: '1px solid #e0e0e0', backgroundColor: '#fafafa' }}>
        <CardContent>
          <Typography variant="h5" style={{ marginBottom: '8px' }}>ID: {post.id} - {post.title}</Typography>
          <Typography variant="body1" style={{ marginBottom: '16px' }}>{post.body}</Typography>
          {post.tags && Array.isArray(post.tags) && (
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {post.tags.map((tag: string) => (
                <Chip key={tag} label={tag} size="small" variant="outlined" />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Typography variant="h6" style={{ marginBottom: '16px' }}>Комментарии</Typography>
      <div>
        {comments.map((comment: any) => (
          <Card key={comment.id} style={{ marginBottom: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', backgroundColor: '#f0f8ff' }}>
            <CardContent>
              <Typography variant="body1">{comment.body}</Typography>
              <Typography variant="caption">Пользователь {comment.user.id}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default PostDetail
