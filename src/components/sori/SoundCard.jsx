import { motion } from "framer-motion";
import SoundBlobShape from "./SoundBlobShape";

const cardVariants = {
  rest: { 
    scale: 1, 
    y: 0, 
    boxShadow: "0 4px 20px rgba(37, 38, 79, 0.02)",
    borderColor: "#d6d5f48f",
    transition: { type: "spring", stiffness: 150, damping: 22 } 
  },
  hover: { 
    scale: 1.02, 
    y: -5, 
    boxShadow: "0 16px 36px rgba(37, 38, 79, 0.08)",
    borderColor: "#dbdaff", 
    transition: { type: "spring", stiffness: 150, damping: 22 } 
  }
};

function SoundCard({ card }) {
  return (
    <motion.article 
      className="sori_card" 
      initial="rest" 
      animate="rest" 
      whileHover="hover"
      variants={cardVariants}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "440px",
        background: "#fff",
        boxSizing: "border-box"
      }}
    >
      <div className="sori_card_top" style={{ padding: "36px 32px 0" }}>
        <h2 style={{ fontSize: "26px", color: "#1f272a", margin: "0 0 12px 0", fontWeight: "700" }}>
          {card.word}
        </h2>
        <p style={{ color: "#667482", fontSize: "16px", margin: 0 }}>
          | {card.meaning}
        </p>
      </div>
      
      <div
        className="sori_visual"
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          height: "152px",      
          width: "calc(100% - 64px)",
          margin: "15px 32px",
          overflow: 'hidden', 
          borderRadius: "16px",
          background: "transparent",
          position: "relative"
        }}
      >
        <SoundBlobShape blobPreset={card.blobPreset} motionType={card.motion} />
      </div>
      
      <dl style={{ padding: "0 32px 36px", margin: 0 }}>
        <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", marginBottom: "10px", fontSize: "14px" }}>
          <dt style={{ color: "#a4a5b8" }}>日本語</dt>
          <dd style={{ color: "#25264f", fontWeight: "500" }}>{card.expressions[0]}</dd>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", marginBottom: "10px", fontSize: "14px" }}>
          <dt style={{ color: "#a4a5b8" }}>中文</dt>
          <dd style={{ color: "#25264f", fontWeight: "500" }}>{card.expressions[1]}</dd>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", fontSize: "14px" }}>
          <dt style={{ color: "#a4a5b8" }}>English</dt>
          <dd style={{ color: "#25264f", fontWeight: "500" }}>{card.expressions[2]}</dd>
        </div>
      </dl>
    </motion.article>
  );
}

export default SoundCard;