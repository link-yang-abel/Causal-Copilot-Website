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
  Box,
} from "@mui/material";

import AccountCircle from "@mui/icons-material/AccountCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import avatarChatbot from "../assets/avatar-chatbot.png"

import http from '../utils/request'
import axios from "axios";

import "../App.css";

// const IMAGE_BASEURL = 'http://localhost:8000/demo_data/'
// const IMAGE_BASEURL = 'http://localhost:8000/'
const FILE_BASEURL = import.meta.env.VITE_FILE_URL

interface FileResponse{
  file_name: string,
  file_path: string
}

interface ContentData{
  type: string,
  content: string
}

interface MessageData{
  role: string,
  messages: ContentData[] 
}

type MessageAction = {
  type: 'ADD_ITEM0'
    |'ADD_ITEM'
    |'MERGE_ELEMENTS_TO_LAST_MESSAGES';
  payload: MessageData
}

const messageListReducer = (state: MessageData[], action: MessageAction) => {
  switch (action.type) {
    case 'ADD_ITEM0':
      return [...state, action.payload];
    case 'ADD_ITEM':
      if (state.length <=0||state[state.length-1].role!==action.payload.role)
        return [...state, action.payload];
      const newState = [...state];
      const last = newState[newState.length-1];
      const newLast = {...last};
      const newMessages = [...last.messages, ...action.payload.messages]
      newLast.messages = newMessages;
      newState[newState.length-1] = newLast;
      return newState;
    case 'MERGE_ELEMENTS_TO_LAST_MESSAGES':
      if (state.length<=0)
        return state;
      if (state[state.length-1].role!==action.payload.role)
        return state;
      const newS = [...state];
      const l = newS[newS.length-1];
      const newL = {...l};
      const newM = [...l.messages, ...action.payload.messages]
      newL.messages = newM;
      newS[newS.length-1] = newL;
      return newS;
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
  messages: [{
    type: 'text',
    content:
    "👋 Hello! I'm your causal discovery assistant. Want to discover some causal relationships today?\n"+
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
  }]
}

function BasicImage(props: any) {
  return (
    <Box sx={{ width:'auto', maxHeight:'auto'}}>
      <img {...props} style={{maxWidth:'100%',maxHeight:'300px',objectFit:'scale-down'}}/>
    </Box>
  )
}

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
      <Grid size={11} height="auto">
        {/* <Card style={{width:'50%'}}> */}
        <Card style={{ backgroundColor:"rgb(239, 241, 245)", height:'auto', maxWidth: "90%", padding: "0.2rem" }}>
          {/* <Typography style={{whiteSpace:'pre-line'}}> */}
          {/* <Typography className={classes.typography}>
            {props.message}
          </Typography> */}
          {props.data.messages.map((msg:any)=>{
            if (msg.type==='text') {
              return (
                <Card style={{ backgroundColor:"inherit", margin: "0.2rem", padding: "0.5rem" }}>
                  <Typography className={classes.typography}>
                      {msg.content}
                  </Typography>
                </Card>
              )
            } else if(msg.type==='image') {
              return (
                <Card style={{ backgroundColor:"inherit", margin: "0.2rem", padding: "0.5rem" }}>
                {/* <img src={IMAGE_BASEURL+msg.content}/> */}
                  <BasicImage src={FILE_BASEURL+msg.content}/>
                {/* {msg.content} */}
                </Card>
              )
            } else if(msg.type==='file') {
              return (
                <Card style={{ backgroundColor:"inherit", margin: "0.2rem", padding: "0.5rem" }}>
                  <a href={FILE_BASEURL+msg.content} target="_blank">{msg.content}</a>
                </Card>
              )
            } else {
              <></>
            }
          })}
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
              <Card style={{ backgroundColor:"rgb(239, 241, 245)", maxWidth: "90%", padding: "0.2rem" }}>
                {/* <Typography className={classes.typography} style={{ width: "auto", padding: "0 1rem" }}>
                  {props.message}
                </Typography> */}
                {props.data.messages.map((msg:any)=>{
                  if (msg.type==='text') {
                    return (
                      <Card style={{ backgroundColor:"inherit", margin: "0.2rem", padding: "0.5rem" }}>
                        <Typography className={classes.typography}>
                          {msg.content}
                        </Typography>
                      </Card>
                    )
                  } else if(msg.type==='image') {
                    return (
                      <Card style={{ backgroundColor:"inherit", margin: "0.2rem", padding: "0.5rem" }}>
                        {/* <CardMedia image={IMAGE_BASEURL+msg.content}/> */}
                        <BasicImage src={FILE_BASEURL+msg.content}/>
                        {/* {msg.content} */}
                      </Card>
                    )
                  }
                })}
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
  const [message, setMessage] = useState<null|string>("");

  const [filename, setFilename] = useState<null|string>("");
  const [filepath, setFilepath] = useState<null|string>("");

  const [reportPath, setReportPath] = useState<null|string>("");

  const [processing, setProcessing] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);


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
    ws.send("ok")
    console.log(data)
    console.log('mm:', data.data)
    if (data.data) {
      console.log('mm:', data.data)
      // setMessageList([
      //   ...messageList,
      //   data.data
      // ])
      setProcessing(data.processing)
      setDisableBtn(data.disable_btn)

      dispath({
        type: 'ADD_ITEM',
        payload: data.data
      });

      if (data.output_report) {
        setReportPath(data.output_report);
      }
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
          messages: [{
            type: 'text',
            content: message as string
          }]
        }
        console.log('send msg:', msg)
        console.log('0:', messageList)
        // await setMessageList([
        //   ...messageList, msg
        // ])
        dispath({
          // type: 'MERGE_ELEMENTS_TO_LAST_MESSAGES',
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
  const handleTextfieldOnKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage()
    }
  }

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
  const handleDownloadReport = async () => {
    // const testpath = './demo_data/20250202_203204/sachs/output_report/report.pdf';
    // const filepath = FILE_BASEURL + testpath;
    // if (true) {
    if (reportPath) {
      const filepath = FILE_BASEURL + reportPath;
      const a = document.createElement('a');
      a.href = filepath;
      a.download = 'report.pdf';
      a.target = '_blank';

      a.click();
    }
  }

  const handleDownload = async () => {
    console.log('handle download:');
    // const filepath = './demo_data/20250126_235705/sachs/output_graph/initial_graph.pdf';
    const testpath = './demo_data/20250202_203204/sachs/output_report/report.pdf';
    const filepath = reportPath;
    console.log(filepath);
    
    try {
      const response = await axios.post(`http://localhost:8000/download_file/`,{filepath}, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      console.log('link:', link)
      link.href = url;
      // link.setAttribute('download', filepath);
      link.setAttribute('download', 'report.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.log('dowload error:', error)
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
            ?<MessageChatbot data={msg}/>
            :<MessageUser data={msg}/>)
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
            // onSubmit={handleMessageSubmit}
            onKeyDown={handleTextfieldOnKeyDown}
            disabled={disableBtn}
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
            disabled={disableBtn}
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
            disabled={disableBtn}
            onClick={handleDownloadReport}
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
            disabled={disableBtn}
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
            disabled={disableBtn}
          >
            Real Dataset: Abalone Demo
          </Button>
        </Grid>
        {/* filename: {filename}|<br/>
        ReportPath: {reportPath}<br/>
        <a href={FILE_BASEURL+reportPath||''} target="_blank" >report</a>
        <Button onClick={handleGetUser}>get user</Button>
        <Button onClick={()=>handleSendMessage()}>send ws</Button>
        <Button onClick={()=>handleDownloadReport()}>download</Button> */}
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
