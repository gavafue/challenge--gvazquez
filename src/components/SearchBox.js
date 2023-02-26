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
  setProducts,
  setPageLoading,
  searchValue,
  setSearchValue,
  setHeaderOfProducts,
  setSiteSearch,
  setCategory,
  className,
}) {
  /**
   * Handles the search event when the user presses enter or clicks the search button.
   *
   * @param {string} value - The search value entered by the user.
   */
  const handleSearch = async (value) => {
    setPageLoading(true);
    setCategory("default");
    setSiteSearch("default");
    setHeaderOfProducts(value);
    try {
      const response = await axios.post("/api/searchOnTheDatabase", {
        search: value,
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
            searchListResults: results,
          }
        );
        console.log(responseAddNewSearchToDatabase);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setPageLoading(false);
    }
  };
  
  /**
   * Handles the change event when the user enters a new search value.
   *
   * @param {Event} e - The change event.
   */
  const handleChange = (e) => {
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
