//피드백페이지 컴포넌트 정의
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import '../styles/Feedback.css';
import PostSearch from '../components/Search'; // Search.tsx 파일 가져오기
import Post from "../components/Post"; // Post 컴포넌트 가져오기

interface PostType {
    id: number; // 게시물 ID
    username: string; // 사용자 이름
    title: string; // 게시물 제목
    content: string; // 게시물 내용
}

const Feedback = () => {
    const navigate = useNavigate(); //usernavigate 초기화
    const [posts, setPosts] = useState<PostType[]>([]);

    useEffect(() => { //
        // 백엔드에서 게시물 데이터를 가져오는 예제 (fetch 또는 axios 사용 가능)
        fetch("http://143.248.194.196:3000/posts") // 여기에 실제 API URL을 입력
            .then((response) => response.json())
            .then((data) => setPosts(data))
            .catch((error) => console.error("Error fetching posts:", error));
    }, []);

    return (
        <div className="feedback-page">
            <div className="search-bar">
                <input type="text" placeholder="검색" />
                <button>검색</button>
                <PostSearch /> {/*PostSearch 컴포턴트*/}
            </div>
            <div className="create-post">
                <button onClick={() => navigate("/write")}>글 작성</button>
            </div>
            <h1>Feedback</h1>
            <div className="post-list">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <Post
                            key={post.id} // Post 컴포넌트, 각 게시물에 고유한 키 사용
                            username={post.username}
                            title={post.title}
                            content={post.content}
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
