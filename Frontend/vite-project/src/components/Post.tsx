import React, { useState, useEffect } from "react";
import "../styles/Post.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface PostProps {
  _id: string;
  username: string;
  title: string;
  content: string;
  likes: number;
  likedBy: string[]; // 좋아요 누른 유저 목록 추가
}

const Post: React.FC<PostProps> = ({ _id, username, title, content, likes, likedBy }) => {
  const navigate = useNavigate();
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(false); // 좋아요 상태 관리

  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

  useEffect(() => {
    if (user?._id && likedBy.includes(user._id)) {
      setLiked(true); // 이미 좋아요를 누른 경우 초기화
    }
  }, [likedBy, user?._id]);

  // 게시물 클릭 시 상세 페이지로 이동
  const handleClick = () => {
    navigate(`/posts/${_id}`, { state: { username, title, content } });
  };

  // 좋아요 버튼 클릭
  const handleLike = async (event: React.MouseEvent) => {
    event.stopPropagation();

    if (!user || !user._id) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (liked) {
      alert("이미 좋아요를 눌렀습니다.");
      return;
    }

    try {
      const response = await axios.patch(`http://143.248.194.196:3000/posts/${_id}/like`, {
        userId: user._id,
      });
      setLikeCount(response.data.likes); // 좋아요 수 업데이트
      setLiked(true); // 좋아요 상태 업데이트
    } catch (error) {
      console.error("좋아요 처리 중 오류:", error);
    }
  };

  return (
    <div className="post" onClick={handleClick}>
      <div className="user-avatar"></div>
      <div className="post-content">
        <h3>작성자: {username}</h3>
        <p className="title">{title}</p>
        <p className="content">{content}</p>
        <div className="post-footer">
          <button
            className={`like-button ${liked ? "liked" : ""}`}
            onClick={handleLike}
          >
            ❤️ {likeCount} Likes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;