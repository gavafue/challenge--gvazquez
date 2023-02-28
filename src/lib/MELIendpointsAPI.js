import axios from "axios";
// Constants for MercadoLibre categories
export const CELLPHONES_CATEGORY_MELI = "MLA1055";
export const REFRIGERATOR_CATEGORY_MELI = "MLA5726";
export const TV_CATEGORY_MELI = "MLA1000";

// Base URL for MercadoLibre search API
const MELI_SEARCH_BOX = "https://api.mercadolibre.com/sites/MLA/search?q=";
const MELI_CATEGORY_NAME = "https://api.mercadolibre.com/categories/";
const MELI_CATEGORIES_LINK = "https://api.mercadolibre.com/sites/MLA/search?category=";

/**
 * Returns an array of products based on the specified category ID.
 * @param {string} idCategory - The ID of the MercadoLibre category.
 * @returns {array} - An array of products.
 */
export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${MELI_CATEGORIES_LINK}${categoryId}&limit=24`);

    const resultArray = response.data.results.map((product) => {
      return {
        id: product.id,
        category_id: product.categoryID,
        currency_id: `$ ${product.currency_id}`,
        title: product.title.trim(),
        price: product.price,
        site: "MELI",
        permalink: product.permalink,
        thumbnail: product.thumbnail,
      };
    });

    return resultArray;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Returns an array of products based on the specified search input.
 * @param {string} inputValue - The search input.
 * @returns {array} - An array of products.
 */
export const getProductsBySearchInput = async (inputValue) => {
  try {
    const products = await axios.get(`${MELI_SEARCH_BOX}${inputValue}`);

    const resultArray = products.data.results.map((product) => {
      return {
        id: product.id,
        category_id: product.categoryID,
        currency_id: `$ ${product.currency_id}`,
        title: product.title.trim(),
        price: product.price,
        site: "MELI",
        permalink: product.permalink,
        thumbnail: product.thumbnail,
      };
    });

    return resultArray;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Returns the plain text description of a product based on the specified product ID.
 * @param {string} productId - The ID of the MercadoLibre product.
 * @returns {string} - The plain text description of the product.
 */
export const getProductDescription = async (productId) => {
  try {
    const response = await axios.get(`https://api.mercadolibre.com/items/${productId}/description`, {
      validateStatus: false,
    });

    return response.data.plain_text || "Description not available";
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Returns the name of a category based on the specified category ID.
 * @param {string} categoryID - The ID of the MercadoLibre category.
 * @returns {string} - The name of the category.
 */
export const getCategoryName = async (categoryID) => {
  try {
    const response = await axios.get(`${MELI_CATEGORY_NAME}${categoryID}&limit=24`, {
      validateStatus: false,
    });
    return response.data.name;
  } catch (error) {
    console.error(error);
    return [];
  }
};
