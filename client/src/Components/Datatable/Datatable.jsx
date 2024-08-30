import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Datatable.scss";

function Datatable({ searchResults, userData, searchValue }) {
  const [isDescending, setIsDescending] = useState(true);
  const [sortedData, setSortedData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedUser) {
      navigate(`/users/${selectedUser.id}`);
    }
  }, [selectedUser]);

  useEffect(() => {
    setSortedData(searchResults.length !== 0 ? searchResults : userData);
  }, [searchResults, userData]);

  const showSelectedUser = (user) => {
    setSelectedUser(user);
  };

  const highlightText = (text, searchValue) => {
    if (!searchValue) return text;

    const lowerText = text.toLowerCase();
    const lowerSearchValue = searchValue.toLowerCase();
    const parts = [];
    let currentIndex = 0;

    while (currentIndex < text.length) {
      const index = lowerText.indexOf(lowerSearchValue, currentIndex);

      if (index === -1) {
        parts.push(text.substring(currentIndex));
        break;
      }

      if (currentIndex !== index) {
        parts.push(text.substring(currentIndex, index));
      }

      parts.push(
        <span key={index} className="highlight">
          {text.substring(index, index + searchValue.length)}
        </span>
      );

      currentIndex = index + searchValue.length;
    }

    return parts;
  };

  const sortUsers = (field, e) => {
    e.preventDefault();

    const sorted = [...sortedData];

    sorted.sort((a, b) => {
      if (typeof a[field] === "string") {
        if (isDescending) {
          return b[field].localeCompare(a[field]);
        } else {
          return a[field].localeCompare(b[field]);
        }
      } else {
        if (isDescending) {
          return b[field] - a[field];
        } else {
          return a[field] - b[field];
        }
      }
    });

    setSortedData(sorted);
    setIsDescending(!isDescending);
  };

  return (
    <div className="container">
      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th onClick={(e) => sortUsers("id", e)}>Id</th>
              <th>Avatar</th>
              <th onClick={(e) => sortUsers("first_name", e)}>First Name</th>
              <th onClick={(e) => sortUsers("last_name", e)}>Last Name</th>
              <th onClick={(e) => sortUsers("gender", e)}>Gender</th>
              <th onClick={(e) => sortUsers("cell", e)}>Contact</th>
              <th onClick={(e) => sortUsers("email", e)}>Email</th>
            </tr>
          </thead>
          {searchValue && searchResults.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan="7" className="no-results">
                  No results found...
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {sortedData.map((user) => (
                <tr key={user.id} onClick={() => showSelectedUser(user)}>
                  <td>{highlightText(user.id.toString(), searchValue)}</td>
                  <td>
                    <img
                      src={`${user.picture_thumbnail}`}
                      className="imageData"
                      alt="User Avatar"
                    />
                  </td>
                  <td>{highlightText(user.first_name, searchValue)}</td>
                  <td>{highlightText(user.last_name, searchValue)}</td>
                  <td>{highlightText(user.gender, searchValue)}</td>
                  <td>{highlightText(user.cell, searchValue)}</td>
                  <td>{highlightText(user.email, searchValue)}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default Datatable;
