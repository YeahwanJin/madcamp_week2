import React from 'react';

const GoogleLoginButton: React.FC = () => {
  const handleLogin = () => {
    // Google OAuth 백엔드 엔드포인트로 리디렉션
    window.location.href = 'http://143.248.194.196:3000/login';
  };

  return (
      <div
        style={{
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#ffffff',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          width: "400px",
          height: "500px"
        }} 
      >
        <h1 style={{ color: 'black', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
          구글로 편하게 로그인하세요
        </h1>
        <p style={{ color: '#333', marginBottom: '20px' }}>
          근손실 나기 전에 얼른 로그인!!
        </p>
        <button
          onClick={handleLogin}
          style={{
            backgroundColor: 'black',
            color: '#fff',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '30px', // 버튼 둥글게
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            marginBottom: '20px'
            
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#333')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'black')}
        >
         
        
          Login with Google
        </button>
        <img
          src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3FubWJnZDdqeGUzb2dsaTVxdWtsZDlhcG5tYzIxZGQ5bmg3M3ByMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4bjIKBOWUnVPICCzJc/giphy.webp"
          style={{
            width: "400px", // 원하는 너비
            height: "300px", // 원하는 높이
            objectFit: "cover", // 이미지를 잘라서 맞추기
            borderRadius: "10px", // 모서리 둥글게
          }}
          alt="움짤"
        />
      </div>

  );
};

export default GoogleLoginButton;