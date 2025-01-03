//마이페이지
import React, { useEffect, useState } from 'react';

interface PointsData {
  points: number;
}

const MyPage: React.FC = () => {
  const [points, setPoints] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await fetch('/api/points'); // 실제 API 엔드포인트로 변경
        if (!response.ok) throw new Error('API 호출 실패');
        const data: PointsData = await response.json();
        setPoints(data.points);
        setLoading(false);
      } catch (error) {
        console.error('포인트 데이터를 가져오는 중 에러 발생:', error);
        setLoading(false);
      }
    };

    fetchPoints();
  }, []);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div>
      <h1>마이페이지</h1>
      <p>현재 포인트: {points !== null ? points : '정보 없음'}</p>
    </div>
  );
};

export default MyPage;
