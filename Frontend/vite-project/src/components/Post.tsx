import React from "react";
import "../styles/Post.css";
import { useNavigate } from "react-router-dom";

interface PostProps {
  _id: string;
  username: string;
  title: string;
  content: string;
}

const Post: React.FC<PostProps> = ({ _id, username, title, content }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/posts/${_id}`, { state: { username, title, content } });
  };

  return (
    <div className="post" onClick={handleClick}>
      <div className="post-header">
        <div className="user-avatar"></div>
        <span className="username">{username}</span>
      </div>
      <div className="post-content">
        <p className="title">{title}</p>
        <p className="content">{content}</p>
      </div>
    </div>
  );
};

export default Post;
