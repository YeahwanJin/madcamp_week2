import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css"; // 스타일 파일 추가
import logo from '../assets/dumbell2.png';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // 로그인 상태 관리
  const navigate = useNavigate();

  useEffect(() => {
    // 세션스토리지에서 사용자 정보 확인
    const user = sessionStorage.getItem("user");
    setIsLoggedIn(!!user); // 사용자 정보가 있으면 true, 없으면 false
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user"); // 세션스토리지에서 사용자 정보 삭제
    setIsLoggedIn(false); // 로그인 상태 업데이트
    alert("로그아웃되었습니다.");
    navigate("/"); // 홈 화면으로 이동
  };

  return (
    <>
      <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="home-button">
          <img src={logo} alt="Home" className="logo-img" />
        </Link>
      </div>
        <div className="navbar-links"> {/* 메뉴 버튼들 */}
          <Link to="/feedback">Feedback</Link>
          <Link to="/trainers">Trainers</Link>
          <Link to="/chatbot">Chat</Link>
          <Link to="/mypage">Mypage</Link>
    
          {isLoggedIn ? (
          <Link to="/" onClick={handleLogout} className="navbar-link">
            Logout
          </Link>
        ) : (
          <Link to="/login" className="navbar-link">
            Login
          </Link>
        )}
 
        </div>
      </nav>
    </>
  );
}

export default Navbar;