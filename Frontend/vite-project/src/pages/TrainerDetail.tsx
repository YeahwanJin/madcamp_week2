import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import trainerData from '../data/trainers.json';
import '../styles/TrainerDetail.css';

const TrainerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const trainer = trainerData.find((trainer) => trainer.id === Number(id));

  if (!trainer) {
    return <div>Trainer not found.</div>;
  }

  return (
    <div className="trainer-detail">
      <button onClick={() => navigate(-1)}>Back</button>
      <img src={trainer.image} alt={trainer.name} />
      <h1>{trainer.name}</h1>
      <p>{trainer.detailedDescription}</p> {/* 광고 문구 출력 */}
    </div>
  );
};

export default TrainerDetail;
