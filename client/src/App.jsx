import { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar/Navbar";
import Datatable from "./Components/Datatable/Datatable";
import Modal from "./Components/Modal/Modal";
import lodash from "lodash"
import "./App.scss";

function App() {
  const [userData, setUserData] = useState([]);
  const [searchResults, setSearchResults] = useState([])
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    fetchData(`http://127.0.0.1:8000/users/?page=${currentPage}`);
  }, [currentPage]);

  
  const fetchData = async (url) => {
    if (!url) {
      return;
    }

    try {
      const response = await fetch(url);
      const result = await response.json();
      setUserData(result.results);
      setTotalPages(result.count ? Math.ceil(result.count / 5) : 1);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const debouncedSearch = useCallback(
    lodash.debounce(async (value) => {
      if (value === "") {
        setSearchResults("");
        fetchData("http://127.0.0.1:8000/users/?page=1");
        return;
      }

      try {
        const searchResponse = await fetch(
          `http://127.0.0.1:8000/users/search/?query=${value}`
        );
        const searchResult = await searchResponse.json();
        setSearchResults(searchResult.results)
      } catch (error) {
        console.log("Error:", error);
      }
    }, 1000),
    []
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  const handleNewUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/users/fetch-random-users/");
      console.log(response)

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


  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchResults("");
  };

  return (
    <>
      <Navbar searchValue={searchValue} handleSearch={handleSearch} handleNewUsers={handleNewUsers}/>
      <Datatable searchResults={searchResults} userData={userData} totalPages={totalPages} handlePageChange={handlePageChange} currentPage={currentPage} setSelectedUser={setSelectedUser}/>
      {searchResults == "" && <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>}
      {selectedUser && <Modal user={selectedUser} setSelectedUser={setSelectedUser}/>}
    </>
  );
}

export default App;
