import React, { useEffect, useState } from 'react';
import UserInfoBox from '../components/UserInfoBox'; // 분리된 컴포넌트 import
import UserRankingBox from '../components/UserRankingBox';

import '../styles/Mypage.css';

interface UserData {
  name: string;
  points: number;
  level: 'Bronze' | 'Silver' | 'Gold';
}

const MyPage: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      // 세션에서 사용자 정보 가져오기
      const user = JSON.parse(sessionStorage.getItem('user') || '{}');
      const userId = user._id;

      if (!userId) {
        console.error('세션에 사용자 ID가 없습니다.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://143.248.194.196:3000/users/${userId}`);
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

  if (loading) return <div>로딩 중...</div>;
  if (!userData) return <div>사용자 정보를 가져올 수 없습니다. 다시 시도해주세요.</div>;

  const { name, points, level } = userData;

  return (
    <div className="my-page">
      <UserInfoBox name={name} points={points} level={level} />
      <UserRankingBox />
    </div>
  );
};

export default MyPage;