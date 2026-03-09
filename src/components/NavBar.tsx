import { AppBar, Toolbar, Typography } from '@mui/material'

function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          BLOG BY Beka
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
