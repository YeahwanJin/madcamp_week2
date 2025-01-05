import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 라이브러리
import { faStar, faCrown, faMedal, faUser } from '@fortawesome/free-solid-svg-icons'; // 아이콘 가져오기
import '../styles/Mypage.css'; // 스타일링 파일

interface UserData {
  name: string;
  points: number;
  level: 'Bronze' | 'Silver' | 'Gold'; // 레벨 값 (문자열 리터럴)
}

const MyPage: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null); // 사용자 데이터 상태
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://143.248.194.196:3000/users/6777ba3cedfac6e2bdcf5ef4'); // 실제 API URL
        if (!response.ok) throw new Error('API 호출 실패');
        const data: UserData = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('사용자 데이터를 가져오는 중 에러 발생:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // 레벨에 따른 아이콘 결정 함수
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

  if (loading) return <div>로딩 중...</div>;
  if (!userData)
    return <div>사용자 정보를 가져올 수 없습니다. 다시 시도해주세요.</div>;

  const { name, points, level } = userData;
  const { icon, color } = getUserIcon(level);

  return (
    <div className="my-page">
      
      <div className="user-info">
        <FontAwesomeIcon icon={icon} className="user-icon" style={{ color }} />
        <p><strong>이름:</strong> { name}</p>
        <p><strong>포인트:</strong> { points}</p>
        <p><strong>등급:</strong> { level}</p>
      </div>
    </div>
  );
};

export default MyPage;