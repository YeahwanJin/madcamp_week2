import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/TrainerDetail.css";
import call from "../assets/phonecall.png";

interface Trainer {
  _id: string; // MongoDB에서 생성된 고유 ID
  name: string;
  gender: string;
  category: string;
  image: string;
  shortDescription: string;
  detailedDescription: string;
}

const TrainerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState<Trainer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const storedUser = sessionStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://143.248.194.196:3000/trainers/${id}`
        );
        setTrainer(response.data);
      } catch (err) {
        console.error("Error fetching trainer:", err);
        setError("Failed to load trainer details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainer();
  }, [id]);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!user || !trainer) return;
      try {
        const response = await axios.get(
          `http://143.248.194.196:3000/users/${user._id}/favoriteTrainers`
        );
        const favoriteTrainers = response.data;
        setIsFavorite(favoriteTrainers.some((fav) => fav._id === trainer._id)); // _id로 확인
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    checkFavoriteStatus();
  }, [trainer, user]);

  const handleAddToFavorites = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await axios.post(
        `http://143.248.194.196:3000/users/${user._id}/favoriteTrainers/${trainer?._id}`
      );
      setIsFavorite(true);
      alert("트레이너가 관심 목록에 등록되었습니다.");
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("관심 트레이너 등록에 실패했습니다.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !trainer) {
    return <div>{error || "Trainer not found."}</div>;
  }

  return (
    <div className="trainer-detail">
      <div className="introduce-section">
        <button className="back-button" onClick={() => navigate(-1)}>
          Back
        </button>
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
            <button
              className={`favorite-button ${isFavorite ? "favorited" : ""}`}
              onClick={handleAddToFavorites}
              disabled={isFavorite} // 비활성화 처리
            >
              {isFavorite ? "Already Added" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>

      <div className="prim-info-box">
        <div className="prim-content">
          <img src={call} className="prim-icon" />
          <p>
            구매 후 호스트 연락처를 카톡 또는 문자로 보내드립니다.
            <br />
            구매 전 문의사항은 페이지 하단 연락처를 이용해주세요.
          </p>
        </div>
      </div>

      <div className="trainer-detailed-description">
        <h2>Detail</h2>
        <p>{trainer.detailedDescription}</p>
      </div>

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