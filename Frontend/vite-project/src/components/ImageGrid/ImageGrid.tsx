import React from 'react';
import './ImageGrid.css';

interface ImageGridProps {
  images: string[]; // 외부에서 이미지 배열을 받을 수 있도록 설정
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  return (
    <div className="image-grid">
      {images.map((src, index) => (
        <div key={index} className="image-item">
          <img src={src} alt={`Trainer ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
