import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

interface Message {
  sender: 'user' | 'bot';
  content: string;
}

interface UserInfo {
  level: string;
  points: number;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // 유저 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://143.248.194.196:3000/users/6777ba3cedfac6e2bdcf5ef4');
        const data = await response.json();
        setUserInfo({
          level: data.level,
          points: data.points,
        });
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

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
      setInput('')
    }
  };

  return (
    <Box
      sx={{
        position: "fixed", // 고정 위치
        bottom: 20, // 하단 여백
        right: 20, // 오른쪽 여백
        width: 300, // 창 너비
        height: 400, // 창 높이
        alignItems: 'stretch',
        backgroundColor: '#f5f5f5',
        padding: 2,
      }}
    >
      {/* 채팅 창 */}
      <Box
        sx={{
          flex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingRight: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Chatbot
        </Typography>

        <Paper
          elevation={3}
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            padding: 2,
            marginBottom: 2,
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
                    backgroundColor: msg.sender === 'user' ? '#1976d2' : '#e0e0e0',
                    color: msg.sender === 'user' ? 'white' : 'black',
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
            onKeyPress={handleKeyPress} // Enter 키 이벤트 추가
          />
          <Button variant="contained" color="primary" onClick={handleSendMessage}>
            Send
          </Button>
        </Box>
      </Box>

      {/* 유저 레벨 및 포인트 표시 */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#ffffff',
          borderLeft: '1px solid #ddd',
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {userInfo ? (
          <>
            <Typography variant="h6">User Level: {userInfo.level}</Typography>
            <Typography variant="h6">Points: {userInfo.points}</Typography>
          </>
        ) : (
          <Typography variant="h6">Loading...</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Chatbot;