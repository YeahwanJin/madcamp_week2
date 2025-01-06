import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Feedback.css";
import Post from "../components/Post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface PostType {
  _id: string;
  title: string;
  content: string;
  likes: number; // 좋아요 수 추가
  likedBy: string[]; // 좋아요 누른 유저 목록
  authorId: {
    _id: string;
    name: string; // 작성자 이름
  };
}

const Feedback: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    fetch("http://143.248.194.196:3000/posts")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched posts:", data); // API 응답 데이터 확인
        setPosts(data);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div className="feedback-page">
      <div className="search-bar">
        <input type="text" placeholder="검색" />
        <div className="create-post">
          <button onClick={() => navigate("/write")}>
            <FontAwesomeIcon icon={faPlus} className="icon" /> 글 작성
          </button>
        </div>
      </div>
      <h1>Feedback</h1>
      <div className="post-list">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              _id={post._id}
              username={post.authorId.name}
              title={post.title}
              content={post.content}
              likes={post.likes}
              likedBy={post.likedBy} // 좋아요 누른 유저 목록 전달
            />
          ))
        ) : (
          <p>게시물이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Feedback;