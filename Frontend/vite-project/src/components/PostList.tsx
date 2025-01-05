import React, { useEffect, useState } from "react";
import axios from "axios";

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://143.248.194.196:3000/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleSearch = async () => {
    if (query) {
      try {
        const response = await axios.get("http://143.248.194.196:3000/posts/search", {
          params: { query },
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to search posts:", error);
      }
    }
  };

  return (
    <div>
      <h1>포스트 목록</h1>
      <input
        type="text"
        placeholder="검색어를 입력하세요..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>검색</button>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <a href={`/posts/${post._id}`}>{post.title}</a>
            <p>{new Date(post.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;