import React from 'react';
import "./Datatable.scss"

function Datatable({ searchResults, userData, setSelectedUser}) {

  const showSelectedUser = (user) => {
    setSelectedUser(user)
  }
  return (
    <div className="container">
        <table className="user-table">
          <tr>
            <th>Id</th>
            <th>Avatar</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Contact</th>
            <th>Email</th>
          </tr>
          {searchResults.length !== 0
            ? searchResults.map((user) => (
                <tr key={user.id} onClick={() => showSelectedUser(user)}>
                  <td>{user.id}</td>
                  <td>
                    <img
                      src={`${user.picture_thumbnail}`}
                      className="imageData"
                    />
                  </td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.gender}</td>
                  <td>{user.cell}</td>
                  <td>{user.email}</td>
                </tr>
              ))
            : userData.map((user) => (
                <tr key={user.id} onClick={() => showSelectedUser(user)}>
                  <td>{user.id}</td>
                  <td>
                    <img
                      src={`${user.picture_thumbnail}`}
                      className="imageData"
                    />
                  </td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.gender}</td>
                  <td>{user.cell}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
        </table>
      </div>
  );
}

export default Datatable;