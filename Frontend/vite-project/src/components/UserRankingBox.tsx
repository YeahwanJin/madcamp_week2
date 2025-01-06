import React, { useEffect, useState } from 'react';
import '../styles/UserRankingBox.css';
import Minilog1 from "../assets/minilogo1.png";
import Minilog2 from "../assets/minilogo2.png";
import Minilog3 from "../assets/minilogo3.png";

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

  // 레벨에 따른 이미지 결정 함수
  const getLevelImage = (level: 'Bronze' | 'Silver' | 'Gold') => {
    switch (level) {
      case 'Gold':
        return Minilog1;
      case 'Silver':
        return Minilog3;
      case 'Bronze':
        return Minilog2;
      default:
        return Minilog2; // 기본값
    }
  };

  if (loading) return <div className="ranking-loading">랭킹 로딩 중...</div>;

  return (
    <div className="ranking-box">
      <h2>유저 랭킹</h2>
      <ul>
        {rankings.map((user, index) => {
          const levelImage = getLevelImage(user.level);
          return (
            <li key={index}>
              <div className="info-left">
                <span>{index + 1}.</span>
                <img
                  className="user-logo"
                  src={levelImage}
                  alt={`${user.level} Logo`}
                  style={{
                    borderRadius: "5px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
                  }}
                />
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