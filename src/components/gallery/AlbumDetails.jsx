import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:5000";

function AlbumDetails() {
  const { album } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchPhotos();
  }, [album]);

  const fetchPhotos = async () => {
    try {
      const res = await axios.get(
        `${API}/api/photos/album/${encodeURIComponent(album)}`
      );
      setPhotos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container py-5">
      <h2>{album}</h2>

      <div className="row">
        {photos.map((photo) => (
          <div className="col-md-4 mb-4" key={photo._id}>
            <img
              src={`${API}${photo.image}`}
              className="img-fluid rounded"
              alt={photo.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlbumDetails;