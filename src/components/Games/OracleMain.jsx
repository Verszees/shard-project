import React, { useEffect, useRef } from 'react';
import './Games.css';

const OracleMain = ({ onClick, onReady }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div
      className="oracle-card-hero active:scale-[0.97] transition-all duration-300 cursor-pointer transform-gpu"
      onClick={onClick}
      style={{ isolation: 'isolate' }}
    >
      <div className="oracle-visual-layer">
        <video
          ref={videoRef}
          className="oracle-main-video"
          loop
          muted
          playsInline
          autoPlay
          preload="auto"
          onLoadedData={onReady}
        >
          <source src="/VideoTr.mp4#t=0.001" type="video/mp4" />
        </video>
        <div className="oracle-overlay-shadow"></div>
      </div>

      <div className="oracle-content-layer">
        <div className="oracle-main-info-group">
          <div className="oracle-badge">
            <span className="oracle-pulse-dot"></span>
            LIVE PREDICTIONS
          </div>
          <h2 className="oracle-main-title">THE<br />ORACLE</h2>
          <p className="oracle-event-tag">BET ON EVENTS!</p>
        </div>
      </div>

      {/* Добавляем легкий блик при нажатии для пущего эффекта */}
      <div className="absolute inset-0 bg-white/5 opacity-0 active:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[32px]" />
    </div>
  );
};

export default OracleMain;