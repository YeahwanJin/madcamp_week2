// 피드백 페이지 컴포넌트 정의
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 훅 가져오기
import '../styles/Feedback.css'; // 스타일 파일 가져오기
import PostSearch from '../components/Search'; // Search 컴포넌트 가져오기
import Post from "../components/Post"; // Post 컴포넌트 가져오기
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Font Awesome 아이콘 라이브러리 가져오기
import { faPlus } from "@fortawesome/free-solid-svg-icons"; // "+" 아이콘 가져오기

// 게시물 데이터 타입 정의
interface PostType {
    username: string; // 게시물 작성자의 이름
    title: string; // 게시물 제목
    content: string; // 게시물 내용
    _id: string; // 게시물 고유 ID
    authorId: string;
}

// Feedback 컴포넌트 정의
const Feedback = () => {
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수 초기화
    const [posts, setPosts] = useState<PostType[]>([]); // 게시물 데이터를 저장하는 상태 초기화

    // 컴포넌트가 렌더링될 때 실행되는 useEffect
    useEffect(() => {
        // 백엔드에서 게시물 데이터를 가져오는 함수
        fetch("http://143.248.194.196:3000/posts") // 실제 API URL로 데이터를 요청
            .then((response) => response.json()) // 응답을 JSON으로 변환
            .then((data) => setPosts(data)) // 데이터를 posts 상태에 저장
            .catch((error) => console.error("Error fetching posts:", error)); // 에러 발생 시 로그 출력
    }, []); // 빈 의존성 배열로 한 번만 실행

    return (
        <div className="feedback-page">
            {/* 검색 바 영역 */}
            <div className="search-bar">
                <input type="text" placeholder="검색" /> {/* 검색 입력 필드 */}
                <div className="create-post">
                    {/* 글 작성 버튼 */}
                    <button onClick={() => navigate("/write")}>
                        <FontAwesomeIcon icon={faPlus} className="icon" /> 글 작성
                    </button>
                </div>
            </div>
            
            <h1>Feedback</h1> {/* 페이지 제목 */}

            {/* 게시물 리스트 영역 */}
            <div className="post-list">
                {posts.length > 0 ? ( // posts 상태에 데이터가 있을 경우
                    posts.map((post) => (
                        <Post
                            key={post._id} // 각 게시물에 고유한 키 설정 (_id 사용)
                            _id={post._id} // 게시물의 고유 ID
                            username={post.username} // 작성자 이름
                            title={post.title} // 게시물 제목
                            content={post.content} // 게시물 내용
                        />
                    ))
                ) : (
                    // posts 상태가 비어 있는 경우 표시
                    <p>게시물이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default Feedback; // Feedback 컴포넌트를 외부에서 사용할 수 있도록 export
