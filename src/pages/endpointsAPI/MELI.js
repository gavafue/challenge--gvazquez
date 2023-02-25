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
export const getProductsByCategoryMELI = async (idCategory, setPageLoading) => {
  setPageLoading(true);
  try {
    const products = await axios.get(MELICategoriesLink + idCategory);
    const result = products.data.results;
    setPageLoading(false);
    return result;
  } catch {
    console.error(error);
    setPageLoading(false);
    return [];
  }
};

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
