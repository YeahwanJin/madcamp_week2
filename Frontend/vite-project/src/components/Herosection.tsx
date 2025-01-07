import React from 'react';
import { useNavigate } from 'react-router-dom'; // 네비게이션 추가
import '../styles/HeroSection.css';
import dumbellImage from '../assets/dumbell2.png'; // 이미지 임포트

const HeroSection: React.FC = () => {
  const navigate = useNavigate(); // 네비게이션 함수

  const handleStartClick = () => {
    navigate('/trainers'); // Trainers 페이지로 이동
  };

  return (
    <div className="hero-section">
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/videos/fitnessvideo.mp4" type="video/mp4" />
        오른쪽 하단 이미지 추가
      </video>
      <div className="hero-overlay">
        <h1>한계를 넘어서라</h1>
        <p>최고의 트레이너들과 함께 운동을 시작하세요</p>
        <button className="hero-button" onClick={handleStartClick}>
          시작하기
        </button>
        
      </div>
    </div>
  );
};

export default HeroSection;
