import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  videoUrl?: string;
  authorId: string;
}

interface Comment {
  _id: string;
  content: string;
  createdAt: string;
  pointsGiven: number;
}

const PostDetails: React.FC = () => {
  const { id: postId } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentContent, setCommentContent] = useState("");
  const [pointsGiven, setPointsGiven] = useState<number>(5);
  const commenterId = "677a32f4ae0a8ba26c65c9f0"; // 고정된 commenterId

  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        try {
          const response = await axios.get(`http://143.248.194.196:3000/posts/${postId}`);
          setPost(response.data);
        } catch (error) {
          console.error("Failed to fetch post:", error);
        }
      }
    };

    fetchPost();
  }, [postId]);

  const handleCommentSubmit = async () => {
    try {
      if (!commentContent.trim()) {
        alert("댓글 내용을 입력해주세요.");
        return;
      }

      if (!post || !post.authorId) {
        alert("게시글 정보를 불러오는 데 실패했습니다.");
        return;
      }

      const payload = {
        postId: postId, // 요청에 postId 포함
        commenterId,
        content: commentContent,
        pointsGiven,
        postAuthorId: post.authorId, // 요청에 postAuthorId 포함
      };

      const response = await axios.post(
        `http://143.248.194.196:3000/posts/${postId}/comments`,
        payload
      );

      // 댓글 추가 후 클라이언트 측 업데이트
      setComments((prev) => [...prev, response.data.comment]);
      setCommentContent(""); // 입력 필드 초기화
      setPointsGiven(5); // 포인트 값 초기화
    } catch (error) {
      console.error("Failed to submit comment:", error);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  if (!post) {
    return <p>로딩 중...</p>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{new Date(post.createdAt).toLocaleDateString()}</p>
      <p>{post.content}</p>

      <hr />

      <h2>댓글</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <p>{comment.content}</p>
            <p>포인트: {comment.pointsGiven}</p>
            <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>

      <hr />

      <h3>댓글 작성</h3>
      <textarea
        placeholder="댓글 내용을 입력하세요..."
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        rows={3}
      />
      <input
        type="number"
        value={pointsGiven}
        onChange={(e) => setPointsGiven(Number(e.target.value))}
        min={1}
        max={5}
        placeholder="포인트를 입력하세요"
      />
      <button onClick={handleCommentSubmit}>댓글 작성</button>
    </div>
  );
};

export default PostDetails;