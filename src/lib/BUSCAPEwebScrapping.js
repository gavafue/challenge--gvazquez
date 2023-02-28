// Constants to define the categories of products being fetched
const BUSCAPE_URL = "https://www.buscape.com.br";
const CATEGORY_CELLPHONES = "Cellphones";
const CATEGORY_TV = "TV";
const CATEGORY_REFRIGERATOR = "Refrigerator";

// Function to fetch mobile phones from Buscape
export const getMobilesBuscape = async () => {
  const url = `${BUSCAPE_URL}/celular`;
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const mobiles = [];

    // Extract data for each mobile phone product
    $('div[data-testid="product-card"]').each((i, el) => {
      const link = $(el)
        .find('a[data-testid="product-card::card"]')
        .attr("href");
      const name = $(el).find('h2[data-testid="product-card::name"]').text();
      const price = $(el).find('p[data-testid="product-card::price"]').text();
      const thumbnail = $(el)
        .find('div[data-testid="product-card::image"] span img')
        .attr("src");

      // Push the extracted data as an object into the mobiles array
      mobiles.push({
        id: Math.random(),
        title: name.trim(),
        price: price.trim(),
        thumbnail,
        category_id: CATEGORY_CELLPHONES,
        currency_id: "",
        permalink: `${BUSCAPE_URL}${link}`,
      });
    });

    return mobiles;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch mobiles from Buscape." + error);
  }
};

// Function to fetch refrigerators from Buscape
export const getRefrigeratorBuscape = async () => {
  const url = `${BUSCAPE_URL}/geladeira`;
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const refrigerators = [];

    // Extract data for each refrigerator product
    $('div[data-testid="product-card"]').each((i, el) => {
      const link = $(el)
        .find('a[data-testid="product-card::card"]')
        .attr("href");
      const name = $(el).find('h2[data-testid="product-card::name"]').text();
      const price = $(el).find('p[data-testid="product-card::price"]').text();
      const thumbnail = $(el)
        .find('div[data-testid="product-card::image"] span img')
        .attr("src");

      // Push the extracted data as an object into the refrigerators array
      refrigerators.push({
        id: Math.random(),
        category_id: CATEGORY_REFRIGERATOR,
        currency_id: "",
        title: name.trim(),
        price: price.trim(),
        permalink: `${BUSCAPE_URL}${link}`,
        thumbnail,
      });
    });

    return refrigerators;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch refrigerators from Buscape.");
  }
};

// Get all TVs from Buscape
export const getTVBuscape = async () => {
  // Create the URL for TVs
  const url = `${BUSCAPE_URL}/tv`;
  try {
    // Fetch the HTML page for TVs
    const response = await axios.get(url);
    // Load the HTML page using cheerio
    const $ = cheerio.load(response.data);
    // Create an array to store the TVs
    const TVs = [];

    // Loop through each product card and extract the data
    $('div[data-testid="product-card"]').each((i, el) => {
      const link = $(el)
        .find('a[data-testid="product-card::card"]')
        .attr("href");
      const name = $(el).find('h2[data-testid="product-card::name"]').text();
      const price = $(el).find('p[data-testid="product-card::price"]').text();
      const thumbnail = $(el)
        .find('div[data-testid="product-card::image"] span img')
        .attr("src");
      // Add the TV data to the array
      TVs.push({
        id: Math.random(),
        category_id: CATEGORY_TV,
        currency_id: "",
        title: name.trim(),
        price: price.trim(),
        permalink: `${BUSCAPE_URL}${link}`,
        thumbnail,
      });
    });

    // Return the array of TVs
    return TVs;
  } catch (error) {
    // Handle any errors and throw an error
    console.error(error);
    throw new Error("Failed to fetch TVs from Buscape.");
  }
};

// Search for products on Buscape
export const getBuscapeSearch = async (searchValue) => {
  // Create the URL for the search
  const url = `${BUSCAPE_URL}/search?q=${searchValue}`;
  try {
    // Fetch the HTML page for the search
    const response = await axios.get(url);
    // Load the HTML page using cheerio
    const $ = cheerio.load(response.data);
    // Create an array to store the products
    const productsSearched = [];

    // Loop through each product card and extract the data
    $('div[data-testid="product-card"]').each((i, el) => {
      const link = $(el)
        .find('a[data-testid="product-card::card"]')
        .attr("href");
      const name = $(el).find('h2[data-testid="product-card::name"]').text();
      const price = $(el).find('p[data-testid="product-card::price"]').text();
      const thumbnail = $(el)
        .find('div[data-testid="product-card::image"] span img')
        .attr("src");
      // Add the product data to the array
      productsSearched.push({
        id: Math.random(),
        category_id: "",
        currency_id: "",
        title: name.trim(),
        price: price.trim(),
        permalink: `${BUSCAPE_URL}${link}`,
        thumbnail,
      });
    });

    // Return the array of products
    return productsSearched;
  } catch (error) {
    // Handle any errors and throw an error
    console.error(error);
    throw new Error("Failed to fetch products from Buscape.");
  }
};
