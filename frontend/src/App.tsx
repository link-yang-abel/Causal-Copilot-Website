import * as React from 'react'
import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Container, Card, Avatar, Typography, Grid2 as Grid, TextField, FormGroup, FormControlLabel, Switch, AppBar, Toolbar, IconButton, Menu, MenuItem } from '@mui/material'
import Button from '@mui/material/Button'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
    <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cansal Copilot
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    <Container style={{width: '100%', padding: '0 0.5rem'}}>
      <Grid
        container 
        direction='column'
        sx={{
          justifyContent: 'flex-start',
          alignItems: 'stretch'
        }}
        style={{
          backgroundColor:'white',
          marginTop: '1rem',
          borderRadius: '.333m'
        }}
      >
        <Grid container spacing={1} style={{margin: '0.5rem 0'}}>
          <Grid container size={1} justifyContent='center' alignItems='flex-start'>
            <Avatar></Avatar>
          </Grid>
          <Grid size={11}>
        {/* <Card style={{width:'50%'}}> */}
            <Card style={{maxWidth:'90%', padding:'0.5rem'}}>
              <Typography>
          👋 Hello! I'm your causal discovery assistant. Want to discover some causal relationships today?
  ⏫ Some guidances before uploading your dataset:
  1️⃣ The dataset should be tabular in .csv format, with each column representing a variable.
  2️⃣ Ensure that the features are in numerical format or appropriately encoded if categorical.
  3️⃣ For initial query, your dataset has meaningful feature names, please indicate it using 'YES' or 'NO'.
  4️⃣ Please mention heterogeneity and its indicator's column name in your initial query if there is any.
  💡 Example initial query: 'YES. Use PC algorithm to analyze causal relationships between variables. The dataset has heterogeneity with domain column named 'country'.'
              </Typography>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={1} style={{margin: '0.5rem 0'}}>
          <Grid size={11} container justifyContent='flex-end'>
            <Card style={{maxWidth:'90%', padding:'0.5rem'}}>
              <Typography style={{width:'auto',padding:'0 1rem'}}>
                hello
              </Typography>
            </Card>
          </Grid>
          <Grid container size={1} justifyContent='center' alignItems='flex-start'>
            <Avatar></Avatar>
          </Grid>
        </Grid>
      </Grid>

      <Grid container
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        style={{margin:'1rem 0'}}
      >
        <TextField
          placeholder='Enter text here'
          variant='standard'
          size='small'
          slotProps={{
            htmlInput: {
              sx: {
                backgroundColor: 'white',
                fontSize: '16px',
                padding: '.3rem',
                minWidth: '16rem'
              }
            }
          }}
        ></TextField>
        <Button
          size='small'
          className='btn-action'
          style={{
            textTransform: 'none',
            color: '#777',
            fontSize: '.6rem',
            borderRadius: '1rem',
            padding: '.2rem 1.1rem',
            backgroundColor: 'white',
            boxShadow: '1px 1px 1px 1px #eee'
          }}
        >Upload Your Data(.csv)</Button>
        <Button
          size='small'
          className='btn-action'
          style={{
            textTransform: 'none',
            color: '#777',
            fontSize: '.6rem',
            borderRadius: '1rem',
            padding: '.2rem 1.1rem',
            backgroundColor: 'white',
            boxShadow: '1px 1px 1px 1px #eee'
          }}
        >Download Exclusive Report</Button>
        <Button
          size='small'
          className='btn-action'
          style={{
            textTransform: 'none',
            color: '#777',
            fontSize: '.6rem',
            borderRadius: '1rem',
            padding: '.2rem 1.1rem',
            backgroundColor: 'white',
            boxShadow: '1px 1px 1px 1px #eee'
          }}
        >Reset</Button>
      </Grid>
      <Grid>
        <Button
          className='btn-demo'
          style={{
            textTransform: 'none',
            color: 'black',
            fontSize: '.8rem',
            fontWeight: 'bolder',
            backgroundColor: 'white',
            boxShadow: '1px 1px 1px 1px #eee',
            width: '8rem'
          }}
        >Real Dataset: Abalone Demo</Button>
      </Grid>
    </Container>

    
    {/* <Button variant='contained'>Hello world</Button> */}
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
