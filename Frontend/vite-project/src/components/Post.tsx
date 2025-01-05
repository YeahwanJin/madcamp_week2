import React from "react";
import "../styles/Post.css"; // 스타일 파일 가져오기
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 훅 가져오기

// Post 컴포넌트의 Props 인터페이스 정의
interface PostProps {
    username: string; // 게시물 작성자 이름
    title: string; // 게시물 제목
    content: string; // 게시물 내용
    _id?: string; // 게시물 고유 ID (선택적 필드)
    authorId : string;
}

// Post 컴포넌트 정의
const Post: React.FC<PostProps> = ({ username, title, content }) => {
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수 초기화

    // 게시물을 클릭했을 때 호출되는 함수
    const handleClick = () => {
        // "/postpage1" 페이지로 이동하면서 게시물 데이터를 state로 전달
        navigate("/postpage1", { state: { username, title, content } });
    };

    return (
        // 게시물 전체를 클릭 가능한 div로 정의
        <div className="post" onClick={handleClick}>
            {/* 사용자 아바타 영역 (현재는 비어 있음) */}
            <div className="user-avatar"></div>
            
            {/* 게시물 내용 영역 */}
            <div className="post-content">
                <h3>{username}</h3> {/* 작성자 이름 출력 */}
                <p className="title">{title}</p> {/* 게시물 제목 출력 */}
                <p className="content">{content}</p> {/* 게시물 내용 출력 */}
            </div>
        </div>
    );
};

export default Post; // Post 컴포넌트를 외부에서 사용할 수 있도록 export
