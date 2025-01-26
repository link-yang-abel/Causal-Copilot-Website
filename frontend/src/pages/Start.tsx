import * as React from "react";
import { useEffect, useState, useReducer } from "react";
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';

import {
  Container,
  Card,
  Avatar,
  Typography,
  Grid2 as Grid,
  TextField,
  FormGroup,
  FormControlLabel,
  Switch,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";

import AccountCircle from "@mui/icons-material/AccountCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import avatarChatbot from "../assets/avatar-chatbot.png"

import http from '../utils/request'

interface FileResponse{
  file_name: string,
  file_path: string
}

interface MessageData{
  role: string,
  message: string
}

type MessageAction = {
  type: 'ADD_ITEM';
  payload: MessageData
}

const messageListReducer = (state: MessageData[], action: MessageAction) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, action.payload];
    default:
      return state;
  }
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
  // textTransform: "none",
  // color: "#777",
  // fontSize: ".6rem",
  // borderRadius: "1rem",
  // padding: ".2rem 1.1rem",
  // backgroundColor: "white",
  // boxShadow: "1px 1px 1px 1px #eee",
})

const useStyles = makeStyles({
  typography: {
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontFamily: 'Montserrat, ui-sans-serif, "system-ui", sans-serif'
  }
})

const api = {
  user: '/users/',
}
const helloMessage = {
  role: "chatbot",
  message: "👋 Hello! I'm your causal discovery assistant. Want to discover some causal relationships today?\n"+
            "⏫ Some guidances before uploading your dataset:\n"+
            "1️⃣ The dataset should be tabular in .csv format, with each column representing a"+
            "variable.\n"+
            "2️⃣ Ensure that the features are in numerical format"+
            "or appropriately encoded if categorical.\n3️⃣ For initial query,"+
            "your dataset has meaningful feature names, please indicate it"+
            "using 'YES' or 'NO'.\n4️⃣ Please mention heterogeneity and its"+
            "indicator's column name in your initial query if there is any.\n"+
            "💡 Example initial query: 'YES. Use PC algorithm to analyze"+
            "causal relationships between variables. The dataset has"+
            "heterogeneity with domain column named 'country'.'"
}

import "../App.css";

function MessageChatbot(props:any) {
  const classes = useStyles();
  return (
    <Grid container spacing={1} style={{ margin: "0.5rem 0" }}>
            <Grid
              container
              size={1}
              justifyContent="center"
              alignItems="flex-start"
            >
              <Avatar src={avatarChatbot}/>
            </Grid>
            <Grid size={11}>
              {/* <Card style={{width:'50%'}}> */}
              <Card style={{ maxWidth: "90%", padding: "0.5rem" }}>
                {/* <Typography style={{whiteSpace:'pre-line'}}> */}
                <Typography className={classes.typography}>
                  {props.message}
                </Typography>
              </Card>
            </Grid>
          </Grid>
  )
}

function MessageUser(props: any) {
  const classes = useStyles();
 return (
    <Grid container spacing={1} style={{ margin: "0.5rem 0" }}>
            <Grid size={11} container justifyContent="flex-end">
              <Card style={{ maxWidth: "90%", padding: "0.5rem" }}>
                <Typography className={classes.typography} style={{ width: "auto", padding: "0 1rem" }}>
                  {props.message}
                </Typography>
              </Card>
            </Grid>
            <Grid
              container
              size={1}
              justifyContent="center"
              alignItems="flex-start"
            >
              <Avatar/>
            </Grid>
          </Grid>

 )
}


function Start() {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


  const [socket, setSocket] = useState<WebSocket | null>(null);
  // const [messageList, setMessageList] = React.useState<MessageData[]>([{
  //   ...helloMessage
  // }])
  const [messageList, dispath] = useReducer(messageListReducer, [helloMessage]);
  const [message, setMessage] = useState<null|string>("")

  const [filename, setFilename] = useState<null|string>("")
  const [filepath, setFilepath] = useState<null|string>("")

  useEffect(() => {
    // const c_id = "client002";
    // const ws = new WebSocket(`ws://localhost:8000/ws_client/${c_id}`);
    const ws = new WebSocket(`ws://127.0.0.1:8000/workflow`);

    setSocket(ws);
  // 连接建立时触发
  ws.onopen = () => {
    console.log('WebSocket 连接已建立');
  };

  // 接收到消息时触发
  ws.onmessage = (event: MessageEvent) => {
    // setMessages(prevMessages => [...prevMessages, event.data]);
    // console.log('event:', event);
    const data = JSON.parse(event.data)
    // ws.send("ok")
    console.log(data)
    console.log('mm:', data.data)
    if (data.data) {
      console.log('mm:', data.data)
      // setMessageList([
      //   ...messageList,
      //   data.data
      // ])
      dispath({
        type: 'ADD_ITEM',
        payload: data.data
      })
      // console.log(messageList)
    }
  };

  // 连接关闭时触发
  ws.onclose = () => {
    console.log('WebSocket 连接已关闭');
  };

  // 发生错误时触发
  ws.onerror = (error) => {
    console.error('WebSocket 发生错误:', error);
  };

  // 组件卸载时关闭 WebSocket 连接
  return () => {
    if (ws) {
        ws.close();
    }
  };
  }, [])

  // useEffect(()=>{
  //   console.log('messageList:', messageList)
  // }, [messageList])

  const handleMessageSubmit = () => {
    console.log('message submit.')
  }

  const handleSendMessage = () => {
    if (socket ) {
        // 发送消息
        // socket.send(inputMessage); 
        // setInputMessage('');
        // socket.send('hello, from frontend.'); 
        const msg = {
          role: "user",
          message: message as string
        }
        console.log('send msg:', msg)
        console.log('0:', messageList)
        // await setMessageList([
        //   ...messageList, msg
        // ])
        dispath({
          type: 'ADD_ITEM',
          payload: msg
        })
        console.log('1', messageList)
        const data = {
          message: message,
          // upload_file: filename,
          upload_file: filepath,
          demo: ''
        }
        const data_str = JSON.stringify(data)
        socket.send(data_str)
        // socket.send("{'msg':'hello'};")
    }
  };

  const handleUploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log('handleUploadFile:', event);
    const files = event.target.files;
    if (files && files.length>0) {
      console.log('files:', files)
      const formData = new FormData();
      formData.append('file', files[0])
      try {
        const res = await http.postFile<FileResponse>('upload_file', formData);
        console.log('File uploaded successfully:', res)
        setFilename(files[0].name)
        setFilepath(res.file_path)
      } catch (err) {
        setFilename("Error!")
        console.error('Error uploading file:', err)
      }

    }
  }
  const handleReset = () => {
    setFilename("")
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGetUser =  async () => {
    try {
      const res = await http.get<any>(api.user)
      console.log('get-user:', res)
    } catch(error) {
      console.error('Error get user:', error)
    }
  }

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
          label={auth ? "Logout" : "Login"}
        />
      </FormGroup>
      <AppBar
        position="static"
        style={{
          backgroundColor: "#fff",
          color: "black",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            fontWeight="bolder"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Welcome to Causal Copilot!
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
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
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
      <Container style={{ width: "100%", padding: "0 0.5rem" }}>
        <Grid
          container
          direction="column"
          sx={{
            justifyContent: "flex-start",
            alignItems: "stretch",
          }}
          style={{
            backgroundColor: "white",
            marginTop: "1rem",
            borderRadius: ".333m",
          }}
        >
          {messageList.map((msg)=>
            (msg.role==="chatbot"
            ?<MessageChatbot message={msg.message}/>
            :<MessageUser message={msg.message}/>)
          )}
        </Grid>
          
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          style={{ margin: "1rem 0" }}
        >
          <TextField
            placeholder="Enter text here"
            variant="standard"
            size="small"
            slotProps={{
              htmlInput: {
                sx: {
                  backgroundColor: "white",
                  fontSize: "16px",
                  padding: ".3rem",
                  minWidth: "16rem",
                },
              },
            }}
            value={message}
            onChange={(e)=> setMessage(e.target.value)}
            onSubmit={handleMessageSubmit}
          ></TextField>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon/>}
            style={{
              textTransform: "none",
              color: "#777",
              fontSize: ".6rem",
              borderRadius: "1rem",
              padding: ".2rem 1.1rem",
              backgroundColor: "white",
              boxShadow: "1px 1px 1px 1px #eee",
            }}
          >
            Upload Your Data(.csv)
            <VisuallyHiddenInput
              type="file"
              onChange={handleUploadFile}
              // multiple
            />
          </Button>
          {/* <Button
            size="small"
            className="btn-action"
            style={{
              textTransform: "none",
              color: "#777",
              fontSize: ".6rem",
              borderRadius: "1rem",
              padding: ".2rem 1.1rem",
              backgroundColor: "white",
              boxShadow: "1px 1px 1px 1px #eee",
            }}
          >
            Upload Your Data(.csv)
          </Button> */}
          <Button
            size="small"
            className="btn-action"
            style={{
              textTransform: "none",
              color: "#777",
              fontSize: ".6rem",
              borderRadius: "1rem",
              padding: ".2rem 1.1rem",
              backgroundColor: "white",
              boxShadow: "1px 1px 1px 1px #eee",
            }}
          >
            Download Exclusive Report
          </Button>
          <Button
            size="small"
            className="btn-action"
            style={{
              textTransform: "none",
              color: "#777",
              fontSize: ".6rem",
              borderRadius: "1rem",
              padding: ".2rem 1.1rem",
              backgroundColor: "white",
              boxShadow: "1px 1px 1px 1px #eee",
            }}
            onClick={handleReset}
          >
            Reset
          </Button>
        </Grid>
        <Grid>
          <Button
            className="btn-demo"
            style={{
              textTransform: "none",
              color: "black",
              fontSize: ".8rem",
              fontWeight: "bolder",
              backgroundColor: "white",
              boxShadow: "1px 1px 1px 1px #eee",
              width: "8rem",
            }}
          >
            Real Dataset: Abalone Demo
          </Button>
        </Grid>
        filename: {filename}|
        <Button onClick={handleGetUser}>get user</Button>
        <Button onClick={()=>handleSendMessage()}>send ws</Button>
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
  );
}

export default Start;
