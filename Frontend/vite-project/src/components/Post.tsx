// Post.tsx
import React from "react";
import "../styles/Feedback.css"; // 필요 시 CSS 가져오기

interface PostProps { /*Post인터페이스 정의
    질문: postType과 함께 있어도 되는가*/
    username: string;
    title: string;
    content: string;
}
/* 함수형 컴포넌트, props 객체에서 username, title, content 추출*/
const Post: React.FC<PostProps> = ({ username, title, content }) => {
    return (
        <div className="post">
            <h3>{username}</h3>
            <p>{title}</p>
            <p>{content}</p>
        </div>
    );
};

export default Post;
