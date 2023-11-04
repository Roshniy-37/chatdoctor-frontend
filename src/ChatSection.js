import React, { useState, useRef, useEffect } from 'react';
import { Paper, Box, TextField, Button, Typography } from '@mui/material';

function ChatSection() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef();

  const chatContainerStyle = {
    height: '78vh',
    flex: 1,
    padding: '16px',
    display: 'flex',
    flexDirection: 'column-reverse',
    overflowY: 'auto',
    backgroundColor: 'black',
  };

  const userMessageStyle = {
    marginBottom: '16px',
    textAlign: 'right',
    color: 'yellow',
  };

  const doneMessageStyle = {
    marginBottom: '16px',
    textAlign: 'left',
    color: 'white',
  };

  const inputContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: 'pink',
  };

  const inputStyle = {
    flex: 1,
    backgroundColor: 'white',
  };

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    const userMessage = { text: message, fromUser: true };
    const doneMessage = { text: 'Done', fromUser: false };

    
    setMessages([doneMessage, userMessage, ...messages]);

    setMessage('');
  };



  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  return (
    <Paper elevation={3}>
      <Box style={chatContainerStyle} ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <Typography
            key={index}
            variant="body1"
            style={msg.fromUser ? { ...userMessageStyle } : { ...doneMessageStyle }}
          >
            {msg.text}
          </Typography>
        ))}
      </Box>
      <Box style={inputContainerStyle}>
        <TextField
          style={inputStyle}
          variant="outlined"
          label="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </Box>
    </Paper>
  );
}

export default ChatSection;
