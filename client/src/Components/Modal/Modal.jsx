import React from 'react';
import "./Modal.scss";

function Modal({ user, setSelectedUser }) {

  const handleClose = (e) => {
    e.preventDefault();
    setSelectedUser(null);
  };

  return (
    <div className="modal">
      <div className="modal-content">
      <button className="close-button" onClick={handleClose}>X</button>
        <div className="user-page">
          <div className="user-profile">
            <img src={user.picture_large} alt={`${user.first_name} ${user.last_name}`} className="user-image" />
            <h2>{`${user.title} ${user.first_name} ${user.last_name}`}</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Date of Birth:</strong> {new Date(user.dob).toLocaleDateString()}</p>
            <p><strong>Registered:</strong> {new Date(user.registered).toLocaleDateString()}</p>
          </div>

          <div className="user-contact">
            <h3>Contact Information</h3>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Cell:</strong> {user.cell}</p>
            <p><strong>Country:</strong> {user.country}</p>
            <p><strong>City:</strong> {user.city}</p>
            <p><strong>Street:</strong> {user.street_number} {user.street_name}</p>
            <p><strong>State:</strong> {user.state}</p>
            <p><strong>Postcode:</strong> {user.postcode}</p>
            <p><strong>Nationality:</strong> {user.nat}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
