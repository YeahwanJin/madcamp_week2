import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

interface Message {
  sender: 'user' | 'bot';
  content: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태 추가

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput('');
    setIsLoading(true); // 로딩 상태 활성화

    try {
      const response = await fetch('http://143.248.194.196:3000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input, role: 'trainer' }),
      });

      const data = await response.json();

      const botMessage: Message = { sender: 'bot', content: data.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const botMessage: Message = { sender: 'bot', content: 'Error: Unable to fetch response.' };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false); // 로딩 상태 비활성화
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        height: '80vh',
        maxHeight: '600px',
        backgroundColor: '#f5f5f5',
        padding: 2,
        margin: 'auto',
        width: '100%',
        maxWidth: '600px',
        marginTop: '64px',
        borderRadius: '16px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: 'black',
          fontSize: '28px',
          fontWeight: 'bold',
        }}
      >
        운동에 대해 무엇이든 물어보세요
      </Typography>

      <Paper
        elevation={3}
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: 2,
          marginBottom: 2,
          height: '60vh',
          maxHeight: '400px',
          borderRadius: '12px',
        }}
      >
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index} sx={{ justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <Paper
                elevation={2}
                sx={{
                  padding: 1,
                  maxWidth: '75%',
                  backgroundColor: msg.sender === 'user' ? 'black' : '#e0e0e0',
                  color: msg.sender === 'user' ? 'white' : 'black',
                  borderRadius: '8px',
                }}
              >
                <ListItemText primary={msg.content} />
              </Paper>
            </ListItem>
          ))}
          {isLoading && ( // 로딩 중 상태 표시
            <ListItem sx={{ justifyContent: 'flex-start' }}>
              <Paper
                elevation={2}
                sx={{
                  padding: 1,
                  maxWidth: '75%',
                  backgroundColor: '#e0e0e0',
                  color: 'black',
                  borderRadius: '8px',
                  fontStyle: 'italic',
                }}
              >
                <ListItemText primary="생각하는 중..." />
              </Paper>
            </ListItem>
          )}
        </List>
      </Paper>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: 'black',
              },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSendMessage}
          sx={{
            backgroundColor: 'black',
            color: 'white',
            '&:hover': {
              backgroundColor: '#333',
            },
          }}
        >
          전송
        </Button>
      </Box>
    </Box>
  );
};

export default Chatbot;