import "../styles/VideoModal.css"

// import "./VideoModal.css"

const VideoModal = ({ videoUrl, onClose }) => {
  if (!videoUrl) return null

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div
        className="video-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="video-modal-close" onClick={onClose}>
          ✕
        </button>

        <iframe
          src={videoUrl}
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}

export default VideoModal


