import { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar/Navbar";
import Datatable from "./Components/Datatable/Datatable";
import User from "./Components/User/User";
import lodash from "lodash";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.scss";

function App() {
  const Layout = () => {
    const [userData, setUserData] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

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
        setTotalPages(result.count ? Math.ceil(result.count / 10) : 1);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    const debouncedSearch = useCallback(
      lodash.debounce(
        async (value) => {
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
            setSearchResults(searchResult.results);
          } catch (error) {
            console.log("Error:", error);
          }
        },
        1000,
        { leading: true }
      ),
      []
    );

    const handleSearch = (e) => {
      const value = e.target.value;
      setSearchValue(value);
      debouncedSearch(value);
      setCurrentPage(1);
    };

    const handlePageChange = (page) => {
      setCurrentPage(page);
      setSearchResults("");
    };

    return (
      <>
        <Navbar
          searchValue={searchValue}
          handleSearch={handleSearch}
          fetchData={fetchData}
          currentPage={currentPage}
        />
        <Datatable
          searchResults={searchResults}
          userData={userData}
          searchValue={searchValue}
        />
        {!searchValue && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          path: "/",
          element: <Layout />,
        },
        {
          path: "/users/:id",
          element: <User />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
