import React, { useEffect, useState } from 'react';
import '../styles/FavoriteTrainersBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

interface Trainer {
  _id: string;
  name: string;
  category: string;
  image: string;
  shortDescription: string;
}

const FavoriteTrainersBox: React.FC = () => {
  const [favoriteTrainers, setFavoriteTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFavoriteTrainers = async () => {
      //const user = JSON.parse(sessionStorage.getItem('user') || '{}');
      //const userId = user._id;
      const userId="677a32f4ae0a8ba26c65c9f0"

      if (!userId) {
        console.error('세션에 사용자 ID가 없습니다.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://143.248.194.196:3000/users/${userId}/favoriteTrainers`
        );
        if (!response.ok) throw new Error('관심 트레이너 데이터를 호출하는 중 에러 발생');
        const data: Trainer[] = await response.json();
        setFavoriteTrainers(data);
      } catch (error) {
        console.error('관심 트레이너 데이터를 가져오는 중 에러 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteTrainers();
  }, []);

  const handleRemoveTrainer = async (trainerId: string) => {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const userId = user._id;

    if (!userId) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await fetch(
        `http://143.248.194.196:3000/users/${userId}/favoriteTrainers/${trainerId}`,
        { method: 'DELETE' }
      );

      if (!response.ok) throw new Error('트레이너 삭제 중 에러 발생');

      setFavoriteTrainers((prev) =>
        prev.filter((trainer) => trainer._id !== trainerId)
      );
      alert('트레이너가 관심 목록에서 삭제되었습니다.');
    } catch (error) {
      console.error('트레이너 삭제 중 에러 발생:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  if (loading) return <div className="favorite-loading">로딩 중...</div>;

  return (
    <div className="favorite-trainers-box">
      <h2>나의 관심 트레이너</h2>
      {favoriteTrainers.length > 0 ? (
        <ul>
          {favoriteTrainers.map((trainer) => (
            <li key={trainer._id} className="favorite-trainer-item">
              <div className="trainer-top">
                <img className="trainer-image" src={trainer.image} alt={trainer.name} />
                <button
                  className="remove-button"
                  onClick={() => handleRemoveTrainer(trainer._id)}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
              <div className="trainer-info">
                <h3>{trainer.name}</h3>
                <p>{trainer.shortDescription}</p>
                <span>전문 분야: {trainer.category}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>아직 등록된 관심 트레이너가 없습니다.</p>
      )}
    </div>
  );
};

export default FavoriteTrainersBox;