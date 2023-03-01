import { getProductsBySearchInput } from "@/lib/MELIendpointsAPI";
import { Input } from "antd";
import axios from "axios";

const { Search } = Input;

/**
 * A search box component that allows users to search for products.
 *
 * @param {Function} setProducts - Function to set the list of products returned by the search.
 * @param {Function} setPageLoading - Function to set whether the page is currently loading.
 * @param {string} searchValue - The current search value entered by the user.
 * @param {Function} setSearchValue - Function to set the search value entered by the user.
 * @param {Function} setHeaderOfProducts - Function to set the header of the products returned by the search.
 * @param {Function} setSiteSearch - Function to set the site search used by the search.
 * @param {Function} setCategory - Function to set the category used by the search.
 * @param {string} className - The CSS class name for the search box component.
 *
 * @returns {JSX.Element} The search box component.
 */
function SearchBox({
  setCategory,
  setProducts,
  setPageLoading,
  searchValue,
  setSearchValue,
  setHeaderOfProducts,
  className,
  siteSearch,
}) {
  /**
   * Handles the search event when the user presses enter or clicks the search button.
   *
   * @param {string} value - The search value entered by the user.
   */
  const handleSearch = async (value) => {
    setPageLoading(true);
    setCategory("");
    setHeaderOfProducts(value);
    if (siteSearch === "MELI") {
      try {
        const response = await axios.post("/api/searchOnTheDatabase", {
          search: value,
          site: "MELI",
        });
        if (response.data.data.length > 0) {
          setProducts(response.data.data[0].searchListResults);
        } else {
          const results = await getProductsBySearchInput(value);
          setProducts(results);
          const responseAddNewSearchToDatabase = await axios.post(
            "/api/addNewSearchToDatabase",
            {
              searchInput: value,
              site: "MELI",
              searchListResults: results,
            }
          );
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (siteSearch === "BUSCAPE") {
      try {
        const response = await axios.post("/api/searchOnTheDatabase", {
          search: value,
          site: "BUSCAPE",
        });
        if (response.data.data.length > 0) {
          setProducts(response.data.data[0].searchListResults);
        } else {
          const response = await axios.post("/api/searchOnAllBuscapeProducts", {
            searchInput: value,
          });
          const data = response.data.data;

          setProducts(data);
          const responseAddNewSearchToDatabase = await axios.post(
            "/api/addNewSearchToDatabase",
            {
              searchInput: value,
              site: "BUSCAPE",
              searchListResults: results,
            }
          );
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (siteSearch === "ANY") {
      try {
        const response = await axios.post("/api/searchOnTheDatabase", {
          search: value,
        });
        if (response.data.data.length > 0) {
          setProducts(response.data.data[0].searchListResults);
        } else {
          const responseBuscape = await axios.post(
            "/api/searchOnAllBuscapeProducts",
            {
              searchInput: value,
              site: "ANY",
            }
          );
          const data = responseBuscape.data.data;
          const responseMELI = await getProductsBySearchInput(value);
          const joinArrays = data.concat(responseMELI);
          const result = joinArrays;
          setProducts(result);
          const responseAddNewSearchToDatabase = await axios.post(
            "/api/addNewSearchToDatabase",
            {
              searchInput: value,
              site: "ANY",
              searchListResults: result,
            }
          );
        }
      } catch (e) {
        console.error(e);
      }
    }
    setPageLoading(false);
  };

  /**
   * Handles the change event when the user enters a new search value.
   *
   * @param {Event} e - The change event.
   */
  const handleChange = (e) => {
    setCategory("");
    setSearchValue(e.target.value);
  };

  return (
    <Search
      className={className}
      placeholder="Search"
      value={searchValue}
      onChange={handleChange}
      onSearch={handleSearch}
      enterButton
    />
  );
}

export default SearchBox;
