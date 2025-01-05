import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Postpage.css";

interface Comment {
    id: number;
    content: string;
    pointsGiven: number;
    authorId: string; 
    username: string;
}

const Postpage: React.FC = () => {
    const location = useLocation();
    const { username, title, content } = location.state || {};

    // 임의의 고정된 authorId
  const authorId = "677a32f4ae0a8ba26c65c9f0";

    const [commentInput, setCommentInput] = useState<string>(""); // 댓글 입력 필드 상태
    const [selectedPoint, setSelectedPoint] = useState<number | null>(null); // 선택한 포인트
    const [comments, setComments] = useState<Comment[]>([]); // 댓글 목록

    // 백엔드에서 댓글 데이터 가져오기
    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await fetch("http://143.248.194.196:3000/posts/677a3d5bd10892c517a9e0e2/comments");
            const data = await response.json();
            setComments(data); // 백엔드에서 받은 댓글 데이터 설정
        } catch (error) {
            console.error("Failed to fetch comments:", error);
        }
    };

    // 댓글 추가 핸들러
    const handleAddComment = async () => {
        if (!commentInput.trim() || selectedPoint === null) {
            alert("댓글 내용과 포인트를 입력해주세요.");
            return;
        }

        try {
            const newComment = {
                postId: "677a3d5bd10892c517a9e0e2",
                content: commentInput,
                pointsGiven: selectedPoint,
                username: "현재 사용자", // 사용자 이름을 동적으로 설정
                authorId,
            };

            const response = await fetch("http://143.248.194.196:3000/posts/677a3d5bd10892c517a9e0e2/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newComment),
            });

            if (response.ok) {
                // 댓글 추가 성공 시 목록 갱신
                fetchComments();
                setCommentInput(""); // 입력 필드 초기화
                setSelectedPoint(null); // 포인트 초기화
            } else {
                alert("댓글 추가에 실패했습니다.");
            }
        } catch (error) {
            console.error("Failed to add comment:", error);
        }
    };

    // 댓글 입력 취소 핸들러
    const handleCancelComment = () => {
        setCommentInput(""); // 입력 필드 초기화
        setSelectedPoint(null); // 포인트 초기화
    };

    return (
        <div className="post-page">
            <div className="post-header">
                <div className="user-avatar"></div>
                <div className="user-info">
                    <p className="username">{username}</p>
                    <p className="user-level">User Level</p>
                </div>
            </div>
            <div className="post-details">
                <h3 className="post-title">{title}</h3>
                <p className="post-content">{content}</p>
            </div>
            <div className="post-actions">
                <span className="like-icon">👍</span>
                <span className="comment-icon">💬</span>
            </div>
            <div className="comment-section">
                <input
                    type="text"
                    className="comment-input"
                    placeholder="댓글 입력*"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                />
                <div className="point-selection">
                    <label>지급할 포인트:</label>
                    {[1, 2, 3, 4, 5].map((point) => (
                        <button
                            key={point}
                            className={`point-button ${
                                selectedPoint === point ? "selected" : ""
                            }`}
                            onClick={() => setSelectedPoint(point)}
                        >
                            {point}
                        </button>
                    ))}
                </div>
                <div className="comment-buttons">
                    <button
                        className="cancel-button"
                        onClick={handleCancelComment}
                    >
                        취소
                    </button>
                    <button
                        className="add-comment-button"
                        onClick={handleAddComment}
                    >
                        + 댓글추가
                    </button>
                </div>
                <div className="comment-list">
                    {comments.map((comment) => (
                        <div key={comment.id} className="comment-item">
                            <p>
                                <strong>{comment.username}</strong>: {comment.content}
                            </p>
                            <p>포인트: {comment.pointsGiven}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Postpage;
