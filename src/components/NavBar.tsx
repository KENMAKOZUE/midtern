import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material'

function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          BLOG BY Beka
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
