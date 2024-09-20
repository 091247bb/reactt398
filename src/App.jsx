import { useState, useRef } from 'react';
import './index.css'; // Import your CSS file


export default function App() {
  const [level, setLevel] = useState(0);
  const [mainImage, setMainImage] = useState("src/hippo.webp");
  const [animation, setAnimation] = useState("");

  // Refs for images
  const watermelonRef = useRef(null);
  const pumpkinRef = useRef(null);
  const grassRef = useRef(null);

  const increaseLevel = (amount, imageType, ref) => {
    setLevel((prevLevel) => {
      const newLevel = prevLevel + amount;
      if (newLevel >= 100) {
        setMainImage("src/Bung.jpg");
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
    setMainImage("src/hippo.webp");
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
            src="src/watermelon.png"
            alt="แตงโม"
            className={`small-image ${animation === 'watermelon' ? 'animate' : ''}`}
          />
          <button onClick={() => increaseLevel(5, 'watermelon', watermelonRef)}> Watermelon (5)</button>
        </div>
        <div className="image-button-container" ref={pumpkinRef}>
          <img
            src="src/pumpkin.png"
            alt="ฟักทอง"
            className={`small-image ${animation === 'pumpkin' ? 'animate' : ''}`}
          />
          <button onClick={() => increaseLevel(10, 'pumpkin', pumpkinRef)}> Pumpkin (10)</button>
        </div>
        <div className="image-button-container" ref={grassRef}>
          <img
            src="src/pngtree.png"
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
