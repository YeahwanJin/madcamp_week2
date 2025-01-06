import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import trainerData from '../data/trainers.json';
import '../styles/Trainers.css';

const Trainers: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<string>('all'); // 성별 필터
  const [selectedCategory, setSelectedCategory] = useState<string>('all'); // 카테고리 필터

  const filteredTrainers = trainerData.filter((trainer) => {
    const matchesGender = selectedGender === 'all' || trainer.gender === selectedGender;
    const matchesCategory = selectedCategory === 'all' || trainer.category === selectedCategory;
    return matchesGender && matchesCategory;
  });

  return (
    <div className="trainers-page">
      <h1>Our Trainers</h1>

      {/* 성별 필터 버튼 */}
      <div className="filter-buttons">
        <button className={selectedGender === 'all' ? 'active' : ''} onClick={() => setSelectedGender('all')}>
          All Genders
        </button>
        <button className={selectedGender === 'male' ? 'active' : ''} onClick={() => setSelectedGender('male')}>
          Male
        </button>
        <button className={selectedGender === 'female' ? 'active' : ''} onClick={() => setSelectedGender('female')}>
          Female
        </button>
      </div>

      {/* 카테고리 필터 버튼 */}
      <div className="filter-buttons">
        <button className={selectedCategory === 'all' ? 'active' : ''} onClick={() => setSelectedCategory('all')}>
          All Categories
        </button>
        <button className={selectedCategory === 'rehabilitation' ? 'active' : ''} onClick={() => setSelectedCategory('rehabilitation')}>
          Rehabilitation
        </button>
        <button className={selectedCategory === 'strength' ? 'active' : ''} onClick={() => setSelectedCategory('strength')}>
          Strength
        </button>
        <button className={selectedCategory === 'diet' ? 'active' : ''} onClick={() => setSelectedCategory('diet')}>
          Diet
        </button>
      </div>

      {/* 트레이너 목록 */}
      <div className="trainer-grid">
        {filteredTrainers.map((trainer) => (
          <Link to={`/trainer/${trainer.id}`} key={trainer.id} className="trainer-card">
            <img src={trainer.image} alt={trainer.name} />
            <h3>{trainer.name}</h3>
            <p>{trainer.shortDescription}</p> {/* 이름 아래 소개글 추가 */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Trainers;
