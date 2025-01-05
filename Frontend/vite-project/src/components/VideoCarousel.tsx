import React from "react";
import "../styles/VideoCarousel.css";

const videos = [
  { id: 1, url: "https://youtu.be/OD1JMTLJp-A?si=N8y03x-o_4wk2PhI" },
  { id: 2, url: "https://youtu.be/7pWOzgm6Ot8?si=z2F1HMZIMKaV_AgF" },
  { id: 3, url: "https://youtu.be/aywfSR_uUD4?si=voxhx41HMwy0PubY" },
  { id: 4, url: "https://youtu.be/9b3wtTpoCQA?si=bWwpGRM9rWcpqg3H" },
  { id: 5, url: "https://youtube.com/shorts/JqZxCBFXZKI?si=8slMtwToSfDGjEDW" },
];

const extractVideoId = (url: string) => {
  const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
  return match ? match[1] : null;
};

const VideoCarousel: React.FC = () => {
  const scrollContainer = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="video-carousel">
      {/* 왼쪽 스크롤 버튼 */}
      <button className="scroll-button left" onClick={scrollLeft}>
        &#9664;
      </button>
      {/* 영상 리스트 */}
      <div className="carousel-container" ref={scrollContainer}>
        {videos.map((video) => {
          const videoId = extractVideoId(video.url);
          return (
            <div key={video.id} className="video-item">
              <a href={video.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
                  alt="Video Thumbnail"
                />
              </a>
            </div>
          );
        })}
      </div>
      {/* 오른쪽 스크롤 버튼 */}
      <button className="scroll-button right" onClick={scrollRight}>
        &#9654;
      </button>
    </div>
  );
};

export default VideoCarousel;
