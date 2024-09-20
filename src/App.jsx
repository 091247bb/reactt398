import { useState, useRef } from 'react';
import './index.css'; // Import your CSS file


export default function App() {
  const [level, setLevel] = useState(0);
  const [mainImage, setMainImage] = useState("https://image.cdn2.seaart.ai/2023-07-30/50701957550149/ab30250bc859337a6448ea079ac2faee4943ac53_high.webp");
  const [animation, setAnimation] = useState("");

  // Refs for images
  const watermelonRef = useRef(null);
  const pumpkinRef = useRef(null);
  const grassRef = useRef(null);

  const increaseLevel = (amount, imageType, ref) => {
    setLevel((prevLevel) => {
      const newLevel = prevLevel + amount;
      if (newLevel >= 100) {
        setMainImage("https://scontent.fcnx3-1.fna.fbcdn.net/v/t39.30808-6/369341045_1347973109088470_1981630285928631407_n.jpg?stp=c0.119.1440.1440a_dst-jpg_s552x414&_nc_cat=109&ccb=1-7&_nc_sid=50ad20&_nc_ohc=Z7RO2wKdJOIQ7kNvgFl5xj5&_nc_ht=scontent.fcnx3-1.fna&_nc_gid=AC_9Uz3T0g1eR2L1C1XtsXR&oh=00_AYChbIgU8lQhFqK7CicgfiIJIKaTZFvYEzb_cWRTldyIng&oe=66F32AAF");
      }
      triggerAnimation(imageType);
      scrollToImage(ref);
      return newLevel;
    });
  };

  const triggerAnimation = (imageType) => {
    setAnimation(imageType);
    setTimeout(() => setAnimation(""), 600); // Adjust this duration based on CSS
  };

  const scrollToImage = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const resetLevel = () => {
    setLevel(0);
    setMainImage("https://image.cdn2.seaart.ai/2023-07-30/50701957550149/ab30250bc859337a6448ea079ac2faee4943ac53_high.webp");
  };

  const imageSize = `${Math.min(500, 100 + level * 1.5)}px`; // Adjust size calculation

  return (
    <div className="container">
      <div className="main-image-container">
        <div className="game-title">เกมเลี้ยงหมูเด้ง</div> {/* Added title here */}
        <div className="level-display">Level {level}</div>
        <img src={mainImage} alt="Main" style={{ width: imageSize, height: imageSize }} />
      </div>

      <div className="image-row">
        <div className="image-button-container" ref={watermelonRef}>
          <img
            src="https://media.istockphoto.com/id/973930836/th/เวคเตอร์/แตงโมการ์ตูน.jpg?s=612x612&w=0&k=20&c=r34WkcjjH5uQQZuQmT3E-Qh4IjOVkczURvR1qCwOTz4="
            alt="แตงโม"
            className={`small-image ${animation === 'watermelon' ? 'animate' : ''}`}
          />
          <button onClick={() => increaseLevel(5, 'watermelon', watermelonRef)}> Watermelon (5)</button>
        </div>
        <div className="image-button-container" ref={pumpkinRef}>
          <img
            src="https://www.pngbie.com/assets/images/icon/Pngbie-ภาพฟรี-20230921002712.png"
            alt="ฟักทอง"
            className={`small-image ${animation === 'pumpkin' ? 'animate' : ''}`}
          />
          <button onClick={() => increaseLevel(10, 'pumpkin', pumpkinRef)}> Pumpkin (10)</button>
        </div>
        <div className="image-button-container" ref={grassRef}>
          <img
            src="https://png.pngtree.com/element_our/20240724/185261ca52494578ec6f53c989f8de41.png"
            alt="หญ้า"
            className={`small-image ${animation === 'grass' ? 'animate' : ''}`}
          />
          <button onClick={() => increaseLevel(20, 'grass', grassRef)}> Grass (20)</button>
        </div>
      </div>

      <button className="reset-button" onClick={resetLevel}>Reset Level</button>
    </div>
  );
}
