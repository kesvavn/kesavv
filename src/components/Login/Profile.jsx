import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };

    getProfile();
  }, []);

  return (
    <div>
      <h2>Profile</h2>

      {user && (
        <>
          <p>ID: {user.id}</p>
          <p>Email: {user.email}</p>
        </>
      )}
    </div>
  );
}

export default Profile;