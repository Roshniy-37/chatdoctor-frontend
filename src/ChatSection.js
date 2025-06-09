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

  const botMessageStyle = {
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

  const handleSendMessage = async () => {
    if (message.trim() === '') return;

    const userMessage = { text: message, fromUser: true };
    setMessages(prev => [userMessage, ...prev]);
    
    try {
      const res = await fetch('http://127.0.0.1:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      console.log(data.response);
      const botMessage = {
        text: data.response || 'Sorry, no response received.',
        fromUser: false,
      };

      setMessages(prev => [botMessage, ...prev]);
    } catch (err) {
      const errorMessage = {
        text: 'Error communicating with server.',
        fromUser: false,
      };
      setMessages(prev => [errorMessage, ...prev]);
    }

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
            style={msg.fromUser ? userMessageStyle : botMessageStyle}
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
