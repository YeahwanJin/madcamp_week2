import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Trainers.css';

interface Trainer {
  id: number;
  name: string;
  gender: string;
  category: string;
  image: string;
  shortDescription: string;
}

const Trainers: React.FC = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]); // 트레이너 데이터 상태
  const [selectedGender, setSelectedGender] = useState<string>('all'); // 성별 필터
  const [selectedCategory, setSelectedCategory] = useState<string>('all'); // 카테고리 필터
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  // 데이터 가져오기
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get('http://143.248.194.196:3000/trainers'); // 백엔드 엔드포인트 호출
        setTrainers(response.data); // 데이터 설정
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch trainers:', err);
        setError('Failed to load trainers.');
        setIsLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  // 필터링된 트레이너
  const filteredTrainers = trainers.filter((trainer) => {
    const matchesGender = selectedGender === 'all' || trainer.gender === selectedGender;
    const matchesCategory = selectedCategory === 'all' || trainer.category === selectedCategory;
    return matchesGender && matchesCategory;
  });

  return (
    <div className="trainers-page">
      <h1>Our Trainers</h1>

      {/* 로딩 중 상태 처리 */}
      {isLoading && <p>Loading trainers...</p>}
      {error && <p className="error-message">{error}</p>}

      {!isLoading && !error && (
        <>
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
            <button
              className={selectedCategory === 'rehabilitation' ? 'active' : ''}
              onClick={() => setSelectedCategory('rehabilitation')}
            >
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
        </>
      )}
    </div>
  );
};

export default Trainers;