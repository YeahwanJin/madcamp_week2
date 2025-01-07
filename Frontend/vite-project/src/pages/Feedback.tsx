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
  imageUrl?: string; // 이미지 URL 필드 추가
  likes: number;
  likedBy: string[];
  authorId: {
    _id: string;
    name: string;
  };
}

const Feedback: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(""); // 검색어 상태 관리
  const [isSearching, setIsSearching] = useState<boolean>(false); // 검색 상태 관리

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://143.248.194.196:3000/posts");
        const data = await response.json();

        // 이미지 URL을 서버 경로와 함께 설정
        const updatedPosts = data.map((post: PostType) => ({
          ...post,
          imageUrl: post.imageUrl
            ? `http://143.248.194.196:3000${post.imageUrl}`
            : undefined,
        }));

        setPosts(updatedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      // 검색어가 비어있다면 전체 게시물 다시 가져오기
      setIsSearching(false);
      try {
        const response = await fetch("http://143.248.194.196:3000/posts");
        const data = await response.json();

        const updatedPosts = data.map((post: PostType) => ({
          ...post,
          imageUrl: post.imageUrl
            ? `http://143.248.194.196:3000${post.imageUrl}`
            : undefined,
        }));

        setPosts(updatedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      return;
    }

    setIsSearching(true); // 검색 상태 활성화

    try {
      const response = await fetch(
        `http://143.248.194.196:3000/posts/search?query=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();

      const updatedPosts = data.map((post: PostType) => ({
        ...post,
        imageUrl: post.imageUrl
          ? `http://143.248.194.196:3000${post.imageUrl}`
          : undefined,
      }));

      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error searching posts:", error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch(); // Enter 키로 검색 실행
    }
  };

  return (
    <div className="feedback-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // 검색어 상태 업데이트
          onKeyDown={handleKeyDown} // Enter 키 이벤트 처리
        />
 
        <div className="create-post">
          <button onClick={() => navigate("/write")}>
            <FontAwesomeIcon icon={faPlus} className="icon" /> 글 작성
          </button>
        </div>
      </div>

      <h1>Feedback</h1>
      <div className="post-list">
        {isSearching && posts.length === 0 ? (
          <p>검색 결과가 없습니다.</p>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              _id={post._id}
              username={post.authorId.name}
              authorId={post.authorId._id}
              title={post.title}
              content={post.content}
              imageUrl={post.imageUrl} // 이미지 URL 전달
              likes={post.likes}
              likedBy={post.likedBy}
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