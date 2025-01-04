//리액트 컴포넌트 정의
import React, { useState } from "react";
import "../styles/Write.css";

function Write() {
//제목, 내용, 사진 저장(상태 관리)
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
//제목 입력 핸들러
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
//내용 입력 핸들러
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
//이미지 선택 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
//업로드 핸들러
  const handleUpload = () => {
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요!");
      return;
    }

    // FormData로 데이터 생성
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    // 백엔드로 데이터 전송
    fetch("http://143.248.194.196:3000", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert("글이 성공적으로 업로드되었습니다!");
        setTitle("");
        setContent("");
        setImage(null);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("업로드 중 문제가 발생했습니다.");
      });
  };

  return (
    <div className="write-container">
      <h2>글 작성</h2>
      <div className="input-container">
        <input
          type="text"
          className="title-input"
          placeholder="제목 입력*"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="textarea-container">
        <textarea
          className="content-input"
          placeholder="내용 입력*"
          value={content}
          onChange={handleContentChange}
        ></textarea>
        <label htmlFor="image-upload" className="image-icon">
          <img src="/image-icon.png" alt="첨부 아이콘" />
        </label>
        <input
          type="file"
          id="image-upload"
          className="file-input"
          onChange={handleImageChange}
          accept="image/*"
        />
      </div>
      <button className="upload-button" onClick={handleUpload}>
        업로드
      </button>
    </div>
  );
}

export default Write;
