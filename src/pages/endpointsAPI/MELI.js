import axios from "axios";

export const cellphonesMELI = "MLA1055";
export const refrigeratorMELI = "MLA5726";
export const TVMELI = "MLA1000";
export const MELICategoriesLink =
  "https://api.mercadolibre.com/sites/MLA/search?category=";

/**
This function makes a GET request to the Mercado Libre Argentina API to retrieve products
 from a specific category.
@param {string} idCategory - The ID of the category from which to retrieve the products.
@returns {Promise<Array>} - An array of products from the specified category. If no products were found or an error occurred, an empty array is returned.
*/
export const getProductsByCategoryMELI = async (idCategory) => {
  try {
    const products = await axios.get(MELICategoriesLink + idCategory);
    const result = products.data.results;
    return result;
  } catch {
    console.error(error);
    return [];
  }
};
