import "../styles/adblock.css"

const AdBlock = ({ position }) => {
  return (
    <div className={`ad-block ad-${position}`}>
      {/* AdSense code will go here later */}
      <div className="ad-placeholder">
        Advertisement
      </div>
    </div>
  );
};

export default AdBlock;
