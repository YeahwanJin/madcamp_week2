import React from "react";
import "../styles/Post.css"; // 스타일 가져오기
import { useNavigate } from "react-router-dom";

interface PostProps {
    username: string;
    title: string;
    content: string;
    _id: string; 
}

const Post: React.FC<PostProps> = ({ username, title, content }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Postpage로 이동하면서 state로 데이터를 전달
        navigate("/postpage1", { state: { username, title, content } });
    };

    return (
        <div className="post" onClick={handleClick}>
            <div className="user-avatar"></div>
            <div className="post-content">
                <h3>{username}</h3>
                <p className="title">{title}</p>
                <p className="content">{content}</p>
            </div>
        </div>
    );
};

export default Post;
