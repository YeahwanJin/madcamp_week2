import React, { useState, useEffect } from "react";
import axios from "axios";

const News = () => {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState("건강"); // 기본 검색어
  const [loading, setLoading] = useState(false);

  const fetchNews = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await axios.get("http://143.248.194.196:3000/news", {
        params: { query: searchQuery, sort: "sim" }, // 관련도 정렬
      });
      setNews(response.data.items);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(query); // 초기 검색
  }, [query]);

  const handleTagClick = (tag) => {
    setQuery(tag); // 태그 클릭 시 검색어 변경
  };

  // HTML 엔티티를 디코딩하는 함수
  const decodeHtmlEntities = (str) => {
    return str.replace(/&quot;/g, '"');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>News</h1>

      {/* 태그 버튼 */}
      <div style={styles.tagContainer}>
        {["헬스", "운동", "건강", "보디빌딩", "필라테스"].map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            style={{
              ...styles.tagButton,
              backgroundColor: query === tag ? "#000" : "#fff",
              color: query === tag ? "#fff" : "#000",
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={styles.loadingText}>로딩 중...</p>
      ) : (
        <ul style={styles.newsList}>
          {news.map((item) => (
            <li key={item.link} style={styles.newsItem}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.newsTitle}
              >
                {decodeHtmlEntities(item.title.replace(/<\/?[^>]+(>|$)/g, ""))}
              </a>
              <p style={styles.newsDescription}>
                {decodeHtmlEntities(item.description.replace(/<\/?[^>]+(>|$)/g, ""))}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
    container: {
      borderRadius: "8px",
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "'Arial', sans-serif",
      backgroundColor: "#f5f5f5",
      color: "#000",
      marginTop: "80px", // 네비게이션 바 높이에 맞춘 여백 추가
    },
    heading: {
      textAlign: "center",
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    tagContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      marginBottom: "20px",
    },
    tagButton: {
      padding: "10px 20px",
      border: "1px solid #000",
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.3s, color 0.3s",
    },
    loadingText: {
      textAlign: "center",
      fontSize: "16px",
      fontStyle: "italic",
    },
    newsList: {
      listStyle: "none",
      padding: "0",
      margin: "0",
    },
    newsItem: {
      marginBottom: "20px",
      padding: "15px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      textAlign: "left", // 뉴스 항목 왼쪽 정렬
    },
    newsTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#000",
      textDecoration: "none",
      marginBottom: "8px",
      display: "block",
      textAlign: "center"
    },
    newsDescription: {
      fontSize: "14px",
      color: "#333",
      lineHeight: "1.6",
      textAlign: "left", // 뉴스 설명 왼쪽 정렬
    },
  };

export default News;