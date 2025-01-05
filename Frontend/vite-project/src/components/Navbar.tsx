import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // 스타일 파일 추가
import Chatbot from "./Chatbot"; // Chatbot 컴포넌트 가져오기

function Navbar() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false); // Chatbot 열림/닫힘 상태

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen); // 상태 변경
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/" className="home-button"></Link> {/* 회색 동그라미 버튼 */}
        </div>
        <div className="navbar-links"> {/* 메뉴 버튼들 */}
          <Link to="/feedback">Feedback</Link>
          <Link to="/mypage">Mypage</Link>
          {/* Chatbot 메뉴 */}
          <span className="navbar-chatbot" onClick={toggleChatbot}>
            Chatbot
          </span>
          <Link to="/login">Login</Link>
        </div>
      </nav>
      {isChatbotOpen && <Chatbot />} {/* Chatbot을 조건부로 렌더링 */}
    </>
  );
}

export default Navbar;
