import axios from "axios";

// Constants for MercadoLibre categories
export const cellphonesMELI = "MLA1055";
export const refrigeratorMELI = "MLA5726";
export const TVMELI = "MLA1000";

// Base URL for MercadoLibre search API
const MELICategoriesLink =
  "https://api.mercadolibre.com/sites/MLA/search?category=";

/**
 * Returns an array of products based on the specified category ID.
 * @param {string} idCategory - The ID of the MercadoLibre category.
 * @returns {array} - An array of products.
 */
export const getProductsByCategoryMELI = async (idCategory) => {
  try {
    const products = await axios.get(MELICategoriesLink + idCategory);
    return products.data.results;
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
export const getDescriptionProductMELI = async (productId) => {
  try {
    const response = await axios.get(
      `https://api.mercadolibre.com/items/${productId}/description`
    );
    return response.data.plain_text;
  } catch (error) {
    console.error(error);
  }
};
