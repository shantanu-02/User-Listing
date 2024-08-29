import React from 'react'
import "./Navbar.scss"

function Navbar({searchValue, handleSearch, handleNewUsers}) {
  return (
    <div>
    <div className="navbar">
      <div className="logo">User Listing</div>
      <div className="navbar-actions">
        <div className="searchbar">
          <input
            type="text"
            className="input"
            placeholder="Search for users by ID/Name/Gender"
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
        <div className="addUsers">
          <button className="add-button" onClick={handleNewUsers}>Add New Users</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Navbar