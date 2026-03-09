import { AppBar, Toolbar, Typography } from '@mui/material'

function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          БЛОГ Бека
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
