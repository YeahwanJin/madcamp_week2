import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Postpage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  likes: number;
  likedBy: string[];
  authorId: {
    _id: string;
    name: string;
  };
}

interface Comment {
  _id: string;
  content: string;
  createdAt: string;
  pointsGiven: number;
  commenterId: {
    _id: string;
    name: string;
  };
}

const Postpage1: React.FC = () => {
  const { id: postId } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentContent, setCommentContent] = useState("");
  const [pointsGiven, setPointsGiven] = useState<number>(1); // 기본값은 1
  const [liked, setLiked] = useState(false);
  const [pointOptions, setPointOptions] = useState<number[]>([1]); // 선택 가능한 포인트 옵션

  const storedUser = sessionStorage.getItem("user");
  const commenter = storedUser ? JSON.parse(storedUser) : null;
  const commenterId = commenter?._id ?? "677a32f4ae0a8ba26c65c9f0";

  useEffect(() => {
    // 사용자 레벨 가져오기 및 포인트 옵션 설정
    const fetchUserLevel = async () => {
      try {
        const response = await axios.get(
          `http://143.248.194.196:3000/users/${commenterId}/level`
        );
        const userLevel = response.data.level; // 레벨 정보 가져오기

        // 레벨에 따라 포인트 옵션 설정
        if (userLevel === "Gold") {
          setPointOptions([1, 2, 3, 4, 5]);
        } else if (userLevel === "Silver") {
          setPointOptions([1, 2, 3]);
        } else {
          setPointOptions([1]);
        }
      } catch (error) {
        console.error("Failed to fetch user level:", error);
      }
    };

    fetchUserLevel();
  }, [commenterId]);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      if (postId) {
        try {
          const postResponse = await axios.get(
            `http://143.248.194.196:3000/posts/${postId}`
          );
          const fetchedPost = postResponse.data;

          if (fetchedPost.likedBy.includes(commenterId)) {
            setLiked(true);
          }

          setPost(fetchedPost);

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
  }, [postId, commenterId]);

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

      setComments((prev) => [...prev, response.data.comment]);
      setCommentContent("");
      setPointsGiven(1);
    } catch (error) {
      console.error("Failed to submit comment:", error);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  const handleCancelComment = () => {
    setCommentContent("");
    setPointsGiven(1);
  };

  const handleLike = async () => {
    if (!commenterId) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (liked) {
      alert("이미 좋아요를 눌렀습니다.");
      return;
    }

    try {
      const response = await axios.patch(
        `http://143.248.194.196:3000/posts/${postId}/like`,
        { userId: commenterId }
      );

      setPost((prev) =>
        prev ? { ...prev, likes: response.data.likes } : prev
      );
      setLiked(true);
    } catch (error) {
      console.error("Failed to like the post:", error);
    }
  };

  if (!post) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className="post-page">
      <div className="post-header">
        <div className="user-avatar"></div>
        <p className="post-author">{post.authorId.name}</p>
        <p className="post-date">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
      <h1 className="post-title">{post.title}</h1>
      <p className="post-content">{post.content}</p>

      <div className="post-likes">
        <button
          className={`like-button ${liked ? "liked" : ""}`}
          onClick={handleLike}
        >
          ❤️ {post.likes} Likes
        </button>
      </div>

      <div className="comment-section">
        <h3>댓글 작성</h3>
        <textarea
          className="comment-input"
          placeholder="댓글 내용을 입력하세요..."
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          rows={3}
        />
        <div className="point-selection">
          <label>지급할 단백질:</label>
          {pointOptions.map((point) => (
            <button
              key={point}
              className={`point-button ${
                pointsGiven === point ? "selected" : ""
              }`}
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

        <h2>댓글</h2>
        <ul className="comment-list">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <li key={comment._id} className="comment-item">
                <div className="comment-header">
                  <div className="user-avatar"></div>
                  <p>작성자: {comment.commenterId.name}</p>
                  <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
                </div>
                <p>{comment.content}</p>
                <div className="point-info">
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="point-icon"
                  />{" "}
                  <span>{comment.pointsGiven}</span>
                </div>
              </li>
            ))
          ) : (
            <p>아직 댓글이 없습니다. 첫 댓글을 작성해보세요!</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Postpage1;