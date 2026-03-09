import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Box, Card, CardContent, Typography, Chip, Button } from '@mui/material'
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
      .then(data => setComments(data.result))
  }, [id])

  if (!post) {
    return <Typography sx={{ p: 2 }}>Loading...</Typography>
  }

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

      <Card sx={{ mb: 3, boxShadow: 2, border: '1px solid #e0e0e0', backgroundColor: '#fafafa' }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 1 }}>ID: {post.id} - {post.title}</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>{post.body}</Typography>
          {post.tags && Array.isArray(post.tags) && (
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {post.tags.map((tag: string) => (
                <Chip key={tag} label={tag} size="small" variant="outlined" />
              ))}
            </Box>
          )}
        </CardContent>
      </Card>

      <Typography variant="h6" sx={{ mb: 2 }}>Comments</Typography>
      <Box>
        {comments.map((comment: any) => (
          <Card key={comment.id} sx={{ mb: 2, boxShadow: 2, backgroundColor: '#f0f8ff' }}>
            <CardContent>
              <Typography variant="body1">{comment.body}</Typography>
              <Typography variant="caption">By user {comment.user.id}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}

export default PostDetail
