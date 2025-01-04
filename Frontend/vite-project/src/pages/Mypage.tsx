//마이페이지 컴포넌트 정의
import React, { useEffect, useState } from 'react';

interface PointsData { // pointsdata 객체, 숫자 형태이고 fetch로 받은 데이터가 올바른지 확인
  points: number;
}

const MyPage: React.FC = () => {
  const [points, setPoints] = useState<number | null>(null); // 상태관리 훅, points 상태가 숫자 or NULL 상태 가질 수 있음
  const [loading, setLoading] = useState<boolean>(true); // 상태관리 훅, points 상태가 True or False 상태 가질 수 있음

  useEffect(() => { // 컴포넌트 랜더링, fetchpoint 함수 호출
    const fetchPoints = async () => {
      try {
        const response = await fetch('http://143.248.194.196:3000/users/67777656ef3c105029c06a2e'); // 실제 API 엔드포인트로 변경
        if (!response.ok) throw new Error('API 호출 실패');
        const data: PointsData = await response.json();
        setPoints(data.points); //성공하면 JSON으로 파싱하고, points 상태에 저장
        setLoading(false);// loading 상태를 false로 변경하여 "로딩 중..."을 숨기고 데이터를 표시
      } catch (error) {
        console.error('포인트 데이터를 가져오는 중 에러 발생:', error);
        setLoading(false);  
      }
    };

    fetchPoints();
  }, []);

  if (loading) return <div>로딩 중...</div>; //조건부 랜더링: 데이터가 아직 로딩 중일 때, "로딩 중..."이라는 메시지를 보여줌

  return ( //데이터 랜더링이 완료된 후: points가 null이 아니면 그 값을 표시하고, null이면 "정보 없음"을 표시
    <div>
      <h1>마이페이지</h1>
      <p>현재 포인트: {points !== null ? points : '정보 없음'}</p>
    </div>
  );
};

export default MyPage;
