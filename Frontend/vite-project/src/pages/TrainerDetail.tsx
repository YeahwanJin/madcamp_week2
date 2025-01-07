import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import trainerData from "../data/trainers.json";
import "../styles/TrainerDetail.css";
import call from '../assets/phonecall.png';

const TrainerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const trainer = trainerData.find((trainer) => trainer.id === Number(id));

  if (!trainer) {
    return <div>Trainer not found.</div>;
  }

  return (
    <div className="trainer-detail">
  
      {/* Introduce 섹션 */}
      <div className="introduce-section">
        {/* 뒤로가기 버튼 */}
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
        {/* Introduce 헤더 */}
        <h1>트레이너 소개</h1>
        <div className="introduce-content">
        <img src={trainer.image} alt={trainer.name} className="trainer-image" />
        <div className="trainer-info">
          <h2 className="trainer-name">{trainer.name}</h2>
          <p className="trainer-short-description">{trainer.shortDescription}</p>
          <p className="trainer-details">
            성별: {trainer.gender} <br />
            전문: {trainer.category}
          </p>
        </div>
        </div>
        </div>
      {/* 프림 소개 박스 */}
      <div className="prim-info-box">
        <div className="prim-content">
          <img src={call} className="prim-icon" />
          <p>
            구매 후 호스트 연락처를 카톡 또는 문자로 보내드립니다.<br />
            구매 전 문의사항은 페이지 하단 연락처를 이용해주세요.
          </p>
        </div>
      </div>
  
      {/* Detailed Description */}
      <div className="trainer-detailed-description">
        <h2>Detail</h2>
        <p>{trainer.detailedDescription}</p>
      </div>
  
      {/* Additional Info Section (1:1 문의, 유의 사항, 환불 정책) */}
      <div className="additional-info">
        <div className="info-item">
          <span>전화: 010-4051-4573</span>
        </div>
        <div className="info-item">
          <span>주소: 대전광역시 유성구 대학로 291 카이스트 본원 교수회관 114호</span>
        </div>
        <div className="info-item">
          <span>e-mail: yehwanji8@gmail.com</span>
        </div>
      </div>
    </div>
  );
  
};

export default TrainerDetail;
