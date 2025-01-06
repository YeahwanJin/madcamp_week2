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
    const updateAllUserLevels = async () => {
      try {
        const response = await fetch('http://143.248.194.196:3000/users/update-levels', {
          method: 'PATCH',
        });
        if (!response.ok) throw new Error('레벨 업데이트 실패');
        console.log('모든 유저 레벨 업데이트 성공');
      } catch (error) {
        console.error('모든 유저 레벨 업데이트 중 에러 발생:', error);
      }
    };

    const fetchUserData = async () => {
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

    const initializePage = async () => {
      await updateAllUserLevels(); // 모든 유저의 레벨 업데이트
      await fetchUserData(); // 현재 유저 데이터 가져오기
    };

    initializePage();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (!userData) return <div>로그인을 먼저 해주세요</div>;

  const { name, points, level } = userData;

  return (
    <div className="my-page">
      <UserInfoBox name={name} points={points} level={level} />
      <UserRankingBox />
    </div>
  );
};

export default MyPage;