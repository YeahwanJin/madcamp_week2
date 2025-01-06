import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

interface Message {
  sender: 'user' | 'bot';
  content: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);

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
    }

    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
      setInput('');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        height: '80vh', // 전체 높이를 80%로 제한
        maxHeight: '600px', // 최대 높이 설정
        backgroundColor: '#f5f5f5',
        padding: 2,
        margin: 'auto',
        width: '100%',
        maxWidth: '600px', // 채팅 창의 최대 너비 제한
        marginTop: '64px', // 내비게이션 바와의 간격 추가
        borderRadius: '16px', // 둥근 모서리 추가
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // 그림자 추가
      }}
    >
      <Typography 
        variant="h4" 
        gutterBottom
        sx={{
            color: 'black', // 글씨 색상 변경
            fontSize: '28px', // 글씨 크기 변경
            fontWeight: 'bold', // 글씨 굵기 변경
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
          height: '60vh', // 채팅 메시지 창 높이 제한
          maxHeight: '400px', // 최대 높이 설정
          borderRadius: '12px', // 둥근 모서리 추가
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
                  borderRadius: '8px', // 말풍선 둥근 모서리
                }}
              >
                <ListItemText primary={msg.content} />
              </Paper>
            </ListItem>
          ))}
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
                borderColor: 'black', // 포커스 시 테두리 검정색으로 변경
            },
            },
        }}
        />
        <Button
            variant="contained"
            onClick={handleSendMessage}
            sx={{
                backgroundColor: 'black', // 버튼 색상을 검정으로 설정
                color: 'white', // 글씨 색상을 흰색으로 설정
                '&:hover': {
                backgroundColor: '#333', // 호버 시 버튼 색상
                },
                }}>           
                전송
        </Button>
      </Box>
    </Box>
  );
};

export default Chatbot;