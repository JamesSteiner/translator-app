import {
    Button,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    Paper,
    TextField,
  } from "@mui/material";
  import React, { useEffect, useRef, useState } from "react";

  //todo: lock chat textbox while loading

  const Chat = () => {
    const [chatHistory0, setChatHistory0] = useState([])
    const [chatHistory1, setChatHistory1] = useState([])
    const [inputValue0, setInputValue0] = useState("")
    const [inputValue1, setInputValue1] = useState("")
    const chatEndRef0 = useRef(null);
    const chatEndRef1 = useRef(null);

    useEffect(() => {
      chatEndRef0.current.scrollIntoView({ behavior: "smooth" });
      chatEndRef1.current.scrollIntoView({ behavior: "smooth" });
    }, []);

    const handleInputChange0 = (e) => {
      setInputValue0(e.target.value);
    };

    const handleInputChange1 = (e) => {
        setInputValue1(e.target.value);
    };
    
    const handleInputSubmit0 = async () => {
      if (inputValue0.trim() !== "") {
        const lowerMessage = inputValue0.toLowerCase();
        const upperMessage = inputValue0.toUpperCase();
        setInputValue0("");
        setInputValue1("");
        setChatHistory0([...chatHistory0, {isUser: true, message: lowerMessage}]);
        //translate english to french and add to chat history 1
        setChatHistory1([...chatHistory1, {isUser: false, message: upperMessage}]);
      }
    };

    const handleInputSubmit1 = async () => {
        if (inputValue1.trim() !== "") {
          const upperMessage = inputValue1.toUpperCase();
          const lowerMessage = inputValue1.toLowerCase();
          setInputValue0("");
          setInputValue1("");
          setChatHistory1([...chatHistory1, {isUser: true, message: upperMessage}]);
          //translate french to english and add to chat history 0
          setChatHistory0([...chatHistory0, {isUser: false, message: lowerMessage}]);
        }
    }

    return (
      <Grid container spacing={2}>
        <Grid item xs={6}>
            <Paper style={{padding:"1rem"}}>lowercase language</Paper>
        </Grid>
        <Grid item xs={6}>
            <Paper style={{padding:"1rem"}}>uppercase language</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            style={{
              height: "40vh",
              padding: "0.5rem",
              overflowY: "scroll",
            }}
          >
            <List>
              {chatHistory0.map((chatItem, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemText align={chatItem.isUser ? "right" : "left"}>
                        {chatItem.message}
                    </ListItemText>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
            <div ref={chatEndRef0} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            style={{
              height: "40vh",
              padding: "0.5rem",
              overflowY: "scroll",
            }}
          >
            <List>
              {chatHistory1.map((chatItem, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemText align={chatItem.isUser ? "right" : "left"}>
                        {chatItem.message}
                    </ListItemText>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
            <div ref={chatEndRef1} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <form onSubmit={handleInputSubmit0}>
            <TextField
              multiline
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={inputValue0}
              onChange={handleInputChange0}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  handleInputSubmit0();
                }
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "0.5rem" }}
            >
              Send
            </Button>
          </form>
        </Grid>
        <Grid item xs={6}>
          <form onSubmit={handleInputSubmit1}>
            <TextField
              multiline
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={inputValue1}
              onChange={handleInputChange1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  handleInputSubmit1();
                }
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "0.5rem" }}
            >
              Send
            </Button>
          </form>
        </Grid>
      </Grid>
    );
  };
  
  export default Chat;