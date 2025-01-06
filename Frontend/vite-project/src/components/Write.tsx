import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 가져오기
import "../styles/Write.css"; // CSS 파일 가져오기
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Font Awesome 아이콘 가져오기
import { faPlus } from "@fortawesome/free-solid-svg-icons"; // "+" 아이콘 가져오기

const Write: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const navigate = useNavigate(); // useNavigate 초기화
  
  const author=JSON.parse(sessionStorage.getItem("user") || "{}");
  const authorId = author._id || null; // 사용자 ID 추출
  //const authorId = "677a32f4ae0a8ba26c65c9f0";

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
  };

  const handleUpload = async () => {
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요!");
      return;
    }

    const postData = {
      title,
      content,
      videoUrl,
      authorId,
    };

    try {
      const response = await fetch("http://143.248.194.196:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("게시물 업로드 실패");
      }

      const data = await response.json();
      alert("게시물이 성공적으로 업로드되었습니다!");
      console.log("서버 응답:", data);

      // 상태 초기화
      setTitle("");
      setContent("");
      setVideoUrl("");

      // /feedback 페이지로 이동
      navigate("/feedback");
    } catch (error) {
      console.error("Error:", error);
      alert("업로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="write-container">
      <h2>글 작성</h2>
      <div className="input-container">
        <input
          className="title-input"
          type="text"
          placeholder="제목 입력"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="textarea-container">
        <textarea
          className="content-input"
          placeholder="내용 입력"
          value={content}
          onChange={handleContentChange}
        ></textarea>
      </div>
      <div className="input-container">
        <input
          className="title-input"
          type="text"
          placeholder="비디오 URL 입력"
          value={videoUrl}
          onChange={handleVideoUrlChange}
        />
      </div>
      <button className="upload-button" onClick={handleUpload}>
        <FontAwesomeIcon icon={faPlus} className="icon" /> 업로드
      </button>
    </div>
  );
};

export default Write;