import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Container, Card, Avatar, Typography, Grid2 as Grid, Input } from '@mui/material'
import Button from '@mui/material/Button'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Container>
      <Card>

      <Grid container spacing={1}>
        <Grid size={1}>
          <Avatar></Avatar>
        </Grid>
        <Grid size={11}>
      {/* <Card style={{width:'50%'}}> */}
          <Card>
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
      <Card style={{height:'10px' ,backgroundColor:'inherit'}}></Card>
      <Grid container spacing={1}>
        <Grid size={11}>
      {/* <Card style={{width:'50%'}}> */}
          <Card style={{width:'auto'}}>
            <Typography>
              a
            </Typography>
          </Card>
        </Grid>
        <Grid size={1}>
          <Avatar></Avatar>
        </Grid>
      </Grid>
      </Card>
      <Input></Input>
    </Container>
    <Button>Upload Your Data(.csv)</Button>
    <Button>Download Exclusive Report</Button>
    <Button>Reset</Button>
    <Button>Real Dataset: Abalone Demo</Button>
    
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
