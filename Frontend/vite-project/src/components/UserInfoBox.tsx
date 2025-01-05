import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCrown, faMedal, faUser } from '@fortawesome/free-solid-svg-icons';
import '../styles/UserInfoBox.css'; // 별도 CSS 파일 생성

interface UserInfoBoxProps {
  name: string;
  points: number;
  level: 'Bronze' | 'Silver' | 'Gold';
}

const UserInfoBox: React.FC<UserInfoBoxProps> = ({ name, points, level }) => {
  const getUserIcon = (level: 'Bronze' | 'Silver' | 'Gold') => {
    switch (level) {
      case 'Gold':
        return { icon: faCrown, color: '#FFD700' }; // 금색 왕관
      case 'Silver':
        return { icon: faMedal, color: '#C0C0C0' }; // 은색 메달
      case 'Bronze':
        return { icon: faStar, color: '#CD7F32' }; // 동색 별
      default:
        return { icon: faUser, color: '#000000' }; // 기본 아이콘
    }
  };

  const { icon, color } = getUserIcon(level);

  return (
    <div className="user-info">
      <FontAwesomeIcon icon={icon} className="user-icon" style={{ color }} />
      <div className="user-details">
        <p><strong>이름:</strong> {name}</p>
        <p><strong>포인트:</strong> {points}</p>
        <p><strong>등급:</strong> {level}</p>
      </div>
    </div>
  );
};

export default UserInfoBox;