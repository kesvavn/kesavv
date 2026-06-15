import { useState } from "react";
import { Container } from "react-bootstrap";
import "./VideoSection.css";

function VideoSection() {
  const [play, setPlay] = useState(false);

  return (
    <div className="video-section">
      <Container>

        <div className="video-wrapper">

          {!play ? (
            <div
              className="video-thumbnail"
              onClick={() => setPlay(true)}
              role="button"
              aria-label="Play Video"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setPlay(true)}
            >
              <img
                src="https://eventsmanagementkerala.com/wp-content/uploads/2024/11/ECP01217-scaled.jpg"
                alt="Event video thumbnail"
                className="thumbnail-img"
              />

              <div className="play-btn">
                <i className="fas fa-play"></i>
              </div>
            </div>
          ) : (
            <iframe
              src="https://www.youtube.com/embed/hTor-Ed8e50?autoplay=1&rel=0"
              title="Event Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}

        </div>

      </Container>
    </div>
  );
}

export default VideoSection;