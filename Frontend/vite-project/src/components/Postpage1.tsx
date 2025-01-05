import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Postpage.css";

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  authorId: string;
}

interface Comment {
  _id: string;
  content: string;
  createdAt: string;
  pointsGiven: number;
}

const Postpage1: React.FC = () => {
  const { id: postId } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null); // 게시물 데이터 상태
  const [comments, setComments] = useState<Comment[]>([]); // 댓글 데이터 상태
  const [commentContent, setCommentContent] = useState(""); // 댓글 입력 상태
  const [pointsGiven, setPointsGiven] = useState<number>(5); // 포인트 입력 상태
  const commenterId = "677a32f4ae0a8ba26c65c9f0"; // 고정된 commenterId

  // 게시물 및 댓글 데이터 가져오기
  useEffect(() => {
    const fetchPostAndComments = async () => {
      if (postId) {
        try {
          // 게시물 데이터 가져오기
          const postResponse = await axios.get(
            `http://143.248.194.196:3000/posts/${postId}`
          );
          setPost(postResponse.data);

          // 댓글 데이터 가져오기
          const commentsResponse = await axios.get(
            `http://143.248.194.196:3000/posts/${postId}/comments`
          );
          setComments(commentsResponse.data);
        } catch (error) {
          console.error("Failed to fetch post or comments:", error);
        }
      }
    };

    fetchPostAndComments();
  }, [postId]);

  // 댓글 작성 핸들러
  const handleCommentSubmit = async () => {
    if (!commentContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    if (!post || !post.authorId) {
      alert("게시글 정보를 불러오는 데 실패했습니다.");
      return;
    }

    const payload = {
      postId,
      commenterId,
      content: commentContent,
      pointsGiven,
      postAuthorId: post.authorId,
    };

    try {
      const response = await axios.post(
        `http://143.248.194.196:3000/posts/${postId}/comments`,
        payload
      );

      // 댓글 추가 후 상태 업데이트
      setComments((prev) => [...prev, response.data.comment]);
      setCommentContent(""); // 입력 필드 초기화
      setPointsGiven(5); // 포인트 초기화
    } catch (error) {
      console.error("Failed to submit comment:", error);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  // 댓글 입력 취소 핸들러
  const handleCancelComment = () => {
    setCommentContent(""); // 입력 필드 초기화
    setPointsGiven(5); // 포인트 초기화
  };

  if (!post) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className="post-page">
      {/* 게시물 정보 */}
      <div className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <p className="post-date">{new Date(post.createdAt).toLocaleDateString()}</p>
        <p className="post-content">{post.content}</p>
      </div>

      {/* 댓글 섹션 */}
      <div className="comment-section">
        <h2>댓글</h2>
        <ul className="comment-list">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <li key={comment._id} className="comment-item">
                <p>{comment.content}</p>
                <p>포인트: {comment.pointsGiven}</p>
                <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
              </li>
            ))
          ) : (
            <p>아직 댓글이 없습니다. 첫 댓글을 작성해보세요!</p>
          )}
        </ul>

        {/* 댓글 작성 UI */}
        <h3>댓글 작성</h3>
        <textarea
          className="comment-input"
          placeholder="댓글 내용을 입력하세요..."
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          rows={3}
        />
        <div className="point-selection">
          <label>지급할 포인트:</label>
          {[1, 2, 3, 4, 5].map((point) => (
            <button
              key={point}
              className={`point-button ${pointsGiven === point ? "selected" : ""}`}
              onClick={() => setPointsGiven(point)}
            >
              {point}
            </button>
          ))}
        </div>
        <div className="comment-buttons">
          <button className="cancel-button" onClick={handleCancelComment}>
            취소
          </button>
          <button className="add-comment-button" onClick={handleCommentSubmit}>
            + 댓글추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default Postpage1;
