import React from "react";
import "../styles/Post.css"; // 스타일 파일 가져오기
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 훅 가져오기

// Post 컴포넌트의 Props 인터페이스 정의
interface PostProps {
  _id: string; // 게시물의 고유 ID
  username: string; // 게시물 작성자의 이름
  title: string; // 게시물 제목
  content: string; // 게시물 내용
}

// Post 컴포넌트 정의
const Post: React.FC<PostProps> = ({ _id, username, title, content }) => {
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수 초기화

  // 게시물을 클릭했을 때 호출되는 함수
  const handleClick = () => {
    // "/posts/:id" 페이지로 이동, 게시물 데이터를 state로 전달
    navigate(`/posts/${_id}`, { state: { username, title, content } });
  };

  return (
    <div className="post" onClick={handleClick}> {/* 게시물 클릭 시 handleClick 호출 */}
      <div className="user-avatar"></div>
      <div className="post-content">
        <h3>작성자:{username}</h3> {/* 작성자 이름 */}
        <p className="title">{title}</p> {/* 게시물 제목 */}
        <p className="content">{content}</p> {/* 게시물 내용 */}
      </div>
    </div>
  );
};

export default Post;
