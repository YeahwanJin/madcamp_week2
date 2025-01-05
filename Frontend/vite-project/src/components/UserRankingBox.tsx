import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCrown, faMedal } from '@fortawesome/free-solid-svg-icons';
import '../styles/UserRankingBox.css';

interface RankingData {
  name: string;
  points: number;
  level: 'Bronze' | 'Silver' | 'Gold';
}

const UserRankingBox: React.FC = () => {
  const [rankings, setRankings] = useState<RankingData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await fetch('http://143.248.194.196:3000/users/rankings');
        if (!response.ok) throw new Error('랭킹 데이터 호출 실패');
        const data: RankingData[] = await response.json();
        setRankings(data);
        setLoading(false);
      } catch (error) {
        console.error('랭킹 데이터를 가져오는 중 에러 발생:', error);
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  // 레벨에 따른 아이콘 결정 함수
  const getLevelIcon = (level: 'Bronze' | 'Silver' | 'Gold') => {
    switch (level) {
      case 'Gold':
        return { icon: faCrown, color: '#FFD700' };
      case 'Silver':
        return { icon: faMedal, color: '#C0C0C0' };
      case 'Bronze':
        return { icon: faStar, color: '#CD7F32' };
      default:
        return { icon: faStar, color: '#000000' };
    }
  };

  if (loading) return <div className="ranking-loading">랭킹 로딩 중...</div>;

  return (
    <div className="ranking-box">
      <h2>유저 랭킹</h2>
      <ul>
        {rankings.map((user, index) => {
          const { icon, color } = getLevelIcon(user.level);
          return (
            <li key={index}>
              <div className="info-left">
                <span>{index + 1}.</span>
                <FontAwesomeIcon icon={icon} style={{ color }} />
                <span>{user.name}</span>
              </div>
              <div className="info-right">
                <span>{user.points} points</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserRankingBox;