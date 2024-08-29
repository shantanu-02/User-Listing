import React from "react";
import "./Navbar.scss";

function Navbar({ fetchData, currentPage, searchValue, handleSearch }) {
  const handleNewUsers = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/users/fetch-random-users/"
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        fetchData(`http://127.0.0.1:8000/users/?page=${currentPage}`);
      } else {
        console.error("Failed to fetch and store new users.");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="logo">User Listing</div>
        <div className="navbar-actions">
          <div className="searchbar">
            <input
              type="text"
              className="input"
              placeholder="Search for users by ID/Name/Gender/Contact/Email"
              value={searchValue}
              onChange={handleSearch}
            />
          </div>
          <div className="addUsers">
            <button className="add-button" onClick={handleNewUsers}>
              Add New Users
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
