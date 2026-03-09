import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import AccountCircle from '@mui/icons-material/AccountCircle'
import './App.css'

const theme = createTheme()

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <h1>Vite + React + Material-UI</h1>
        <TextField label="Input" variant="outlined" />
        <Button variant="contained" startIcon={<AccountCircle />}>
          Click me
        </Button>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
