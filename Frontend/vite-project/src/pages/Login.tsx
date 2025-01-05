import React from 'react';

const GoogleLoginButton: React.FC = () => {
  const handleLogin = () => {
    // Google OAuth 백엔드 엔드포인트로 리디렉션
    window.location.href = 'http://143.248.194.196:3000/login';
  };

  return (
    <button
      onClick={handleLogin}
      style={{
        backgroundColor: '#3f6eba',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
      }}
    >
      Login with Google
    </button>
  );
};

export default GoogleLoginButton;