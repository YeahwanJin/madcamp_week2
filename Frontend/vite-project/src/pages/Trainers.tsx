import React from 'react';
import ImageGrid from '../components/ImageGrid/ImageGrid'; // ImageGrid 컴포넌트를 가져옵니다.
import image4 from '../assets/image4.jpg'; // Vite-friendly 방식으로 이미지 불러오기

const trainerImages = [
  image4, // 불러온 이미지를 배열에 추가
];

const Trainers: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Our Trainers</h1>
      <p style={{ textAlign: 'center', marginBottom: '40px' }}>
        Meet our professional trainers who are here to guide you.
      </p>
      {/* ImageGrid 컴포넌트에 이미지 배열 전달 */}
      <ImageGrid images={trainerImages} />
    </div>
  );
};

export default Trainers;
