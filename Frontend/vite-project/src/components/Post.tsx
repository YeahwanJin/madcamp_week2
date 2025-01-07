import React, { useState, useEffect } from "react";
import "../styles/Post.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons";
import Minilog1 from "../assets/minilogo1.png";
import Minilog2 from "../assets/minilogo2.png";
import Minilog3 from "../assets/minilogo3.png";


interface PostProps {
  _id: string;
  username: string;
  authorId: string; // 작성자 ID 추가
  title: string;
  content: string;
  likes: number;
  likedBy: string[];
  imageUrl?: string;
}

const Post: React.FC<PostProps> = ({
  _id,
  username,
  authorId,
  title,
  content,
  likes,
  likedBy,
  imageUrl,
}) => {
  const navigate = useNavigate();
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(false);
  const [authorLevel, setAuthorLevel] = useState<string>(""); // 작성자 레벨 상태 추가

  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

  useEffect(() => {
    if (user?._id && likedBy.includes(user._id)) {
      setLiked(true);
    }
  }, [likedBy, user?._id]);

  // 작성자 레벨 가져오기
  useEffect(() => {
    const fetchAuthorLevel = async () => {
      try {
        const response = await axios.get(
          `http://143.248.194.196:3000/users/${authorId}/level`
        );
        setAuthorLevel(response.data.level);
      } catch (error) {
        console.error("작성자 레벨 가져오기 실패:", error);
      }
    };

    fetchAuthorLevel();
  }, [authorId]);

  const handleClick = () => {
    navigate(`/posts/${_id}`, { state: { username, title, content, imageUrl } });
  };

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
      const response = await axios.patch(
        `http://143.248.194.196:3000/posts/${_id}/like`,
        { userId: user._id }
      );
      setLikeCount(response.data.likes);
      setLiked(true);
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
    }
  };

  const getAvatarImage = (level: string) => {
    switch (level) {
      case "Gold":
        return Minilog1;
      case "Silver":
        return Minilog3;
      case "Bronze":
        return Minilog2;
      default:
        return Minilog2;
    }
  };

  return (
    <div className="post" onClick={handleClick}>
      <div className="post-header">
        <img
          src={getAvatarImage(authorLevel)}
          alt="작성자 레벨 아이콘"
          className="user-avatar"
        />
        <span className="username">{username}</span>
      </div>
      <div className="post-content">
        <p className="title">{title}</p>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Post"
            className="post-list-image"
          />
        )}
        <p className="content">{content}</p>
        <div className="post-footer">
          <button
            className={`like-button ${liked ? "liked" : ""}`}
            onClick={handleLike}
          >
            <FontAwesomeIcon icon={faThumbsUp} className="icon" /> {likeCount} Likes
          </button>
          <button
            className="comment-button"
            onClick={(event) => event.stopPropagation()}
          >
            <FontAwesomeIcon icon={faComment} className="icon" /> Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;