import React from 'react';
import '../styles/UserInfoBox.css'; // 별도 CSS 파일 생성
import Logo1 from "../assets/logo1.png";
import Logo2 from "../assets/logo2.png";
import Logo3 from "../assets/logo3.png";

interface UserInfoBoxProps {
  name: string;
  points: number;
  level: 'Bronze' | 'Silver' | 'Gold';
}

const UserInfoBox: React.FC<UserInfoBoxProps> = ({ name, points, level }) => {
  // 등급에 따라 이미지를 선택하는 함수
  const getUserImage = (level: 'Bronze' | 'Silver' | 'Gold') => {
    switch (level) {
      case 'Gold':
        return Logo1; // Gold에 해당하는 로고
      case 'Silver':
        return Logo3; // Silver에 해당하는 로고
      case 'Bronze':
        return Logo2; // Bronze에 해당하는 로고
      default:
        return Logo2; // 기본 로고 (Bronze로 설정)
    }
  };
  
  const getUserTitle = (level: 'Bronze' | 'Silver' | 'Gold') => {
    switch (level) {
      case 'Gold':
        return '프로 보디빌더';
      case 'Silver':
        return '헬창';
      case 'Bronze':
        return '헬린이';
      default:
        return '';
    }
  };

  const userImage = getUserImage(level);

  return (
    <div className="user-info">
      <div className="user-row">
        <img
          className="user-icon"
          src={userImage}
          alt={`${level} logo`}
          style={{
            borderRadius: "50px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
          }}
        />
        <div className="user-meta">
          <p className="user-name">{name}</p>
          <div className="user-level-points">
            <p className="user-level">{getUserTitle(level)}</p>
            <p className="user-points">프로틴: {points}g</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoBox;