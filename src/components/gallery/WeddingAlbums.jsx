import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "http://localhost:5000";

function WeddingAlbums() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const res = await axios.get(`${API}/api/photos/albums`);
      setAlbums(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Wedding Albums</h2>

      <div className="row">
        {albums.map((album) => (
          <div className="col-md-4 mb-4" key={album._id}>
            <Link
              to={`/wedding-album/${encodeURIComponent(album._id)}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="card shadow-sm h-100">
                <img
                  src={`${API}${album.coverImage}`}
                  alt={album._id}
                  className="card-img-top"
                  style={{ height: "250px", objectFit: "cover" }}
                />

                <div className="card-body text-center">
                  <h5>{album._id}</h5>
                  <p>{album.count} Photos</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {albums.length === 0 && (
        <div className="text-center mt-5">
          <h5>No Wedding Albums Found</h5>
        </div>
      )}
    </div>
  );
}

export default WeddingAlbums;