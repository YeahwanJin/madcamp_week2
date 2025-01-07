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
  imageUrl?: string; // 이미지 URL 추가
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
    const fetchPostAndComments = async () => {
      if (postId) {
        try {
          const postResponse = await axios.get(
            `http://143.248.194.196:3000/posts/${postId}`
          );
          const fetchedPost = postResponse.data;

          // 이미지 경로 처리
          if (fetchedPost.imageUrl) {
            fetchedPost.imageUrl = `http://143.248.194.196:3000${fetchedPost.imageUrl}`;
          }

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
      {post.imageUrl && (
        <img
          className="post-image"
          src={post.imageUrl}
          alt="Post"
          style={{
            width: "100%",
            maxWidth: "600px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        />
      )}
      <p className="post-content">{post.content}</p>

      <div className="post-likes">
        <button
          className={`like-button ${liked ? "liked" : ""}`}
          onClick={() => console.log("Like button clicked!")}
        >
          ❤️ {post.likes} Likes
        </button>
      </div>

      {/* Comments Section */}
      <div className="comment-section">
        {/* Add other parts of the component */}
      </div>
    </div>
  );
};

export default Postpage1;