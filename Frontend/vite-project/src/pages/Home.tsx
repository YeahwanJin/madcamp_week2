import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VideoCarousel from "../components/VideoCarousel"; // 비디오 캐러셀 임포트

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");
    const email = urlParams.get("email");
    const picture = urlParams.get("picture");
    const userId = urlParams.get("_id");

    if (name && email && picture && userId) {
      sessionStorage.setItem("user", JSON.stringify({ name, email, picture, _id: userId }));
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <div>
      <VideoCarousel />
    </div>
  );
};

export default Home;