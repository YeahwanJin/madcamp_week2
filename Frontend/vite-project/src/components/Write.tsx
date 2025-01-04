import React, { useState } from "react";
import "../styles/Write.css"; // CSS 파일 가져오기

const Write: React.FC = () => {
  // 상태 관리
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");

  // 임의의 고정된 authorId
  const authorId = "6777ba30edfac6e2bdcf5ef2";

  // 제목 입력 핸들러
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // 내용 입력 핸들러
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // 비디오 URL 입력 핸들러
  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
  };

  // 게시물 업로드 핸들러
  const handleUpload = async () => {
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요!");
      return;
    }

    // 전송 데이터 생성
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
    } catch (error) {
      console.error("Error:", error);
      alert("업로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="write-container">
      <h2>글 작성</h2>
      <div className="input-container">
        <label>제목 입력</label>
        <input
          className="title-input"
          type="text"
          placeholder="제목 입력"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="textarea-container">
        <label>내용 입력</label>
        <textarea
          className="content-input"
          placeholder="내용 입력"
          value={content}
          onChange={handleContentChange}
        ></textarea>
      </div>
      <div className="input-container">
        <label>비디오 URL 입력</label>
        <input
          className="title-input"
          type="text"
          placeholder="비디오 URL 입력"
          value={videoUrl}
          onChange={handleVideoUrlChange}
        />
      </div>
      <button className="upload-button" onClick={handleUpload}>
        업로드
      </button>
    </div>
  );
};

export default Write;