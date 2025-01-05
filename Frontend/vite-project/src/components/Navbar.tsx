import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // 스타일 파일 추가


function Navbar() {




  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/" className="home-button"></Link> {/* 회색 동그라미 버튼 */}
        </div>
        <div className="navbar-links"> {/* 메뉴 버튼들 */}
         
          <Link to="/posts">posts</Link>
          
          <Link to="/mypage">Mypage</Link>

          <Link to="/login">Login</Link>

          <Link to="/chat">Chat</Link>
        </div>
      </nav>
  
    </>
  );
}

export default Navbar;
