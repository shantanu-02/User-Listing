import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import "./User.scss";

function User() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/users/${id}/`);
        if (response.ok) {
          const result = await response.json();
          setUser(result);
        } else {
          console.error("Failed to fetch user.");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleClose = (e) => {
    e.preventDefault();
    navigate("/");
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="back-button" onClick={handleClose}>
          <IoMdArrowRoundBack />
        </button>
        <div className="user-page">
          <div className="user-profile">
            <img
              src={`${user.picture_large}`}
              alt={`${user.first_name} ${user.last_name}`}
              className="user-image"
            />
            <h2>{`${user.title} ${user.first_name} ${user.last_name}`}</h2>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Gender:</strong> {user.gender}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {new Date(user.dob).toLocaleDateString()}
            </p>
            <p>
              <strong>Registered:</strong>{" "}
              {new Date(user.registered).toLocaleDateString()}
            </p>
          </div>

          <div className="user-contact">
            <h3>Contact Information</h3>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Cell:</strong> {user.cell}
            </p>
            <p>
              <strong>Country:</strong> {user.country}
            </p>
            <p>
              <strong>City:</strong> {user.city}
            </p>
            <p>
              <strong>Street:</strong> {user.street_number} {user.street_name}
            </p>
            <p>
              <strong>State:</strong> {user.state}
            </p>
            <p>
              <strong>Postcode:</strong> {user.postcode}
            </p>
            <p>
              <strong>Nationality:</strong> {user.nat}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
