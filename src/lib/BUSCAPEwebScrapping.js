import axios from "axios";
import * as cheerio from "cheerio";
const BUSCAPE_URL = "https://www.buscape.com.br";

const CATEGORY_CELLPHONES = "Cellphones";
const CATEGORY_TV = "TV";
const CATEGORY_REFRIGERATOR = "Refrigerator";

// This function is used to get mobiles from
//  Buscape. It uses axios and cheerio to make a
//  GET request to the Buscape URL for celular,
//  then parses the response data using cheerio.
//  It loops through each div with data-testid
//  "product-card" and creates an object with
//  the product information such as name, price, thumbnail,
//   category_id, currency_id and permalink. The objects are
//   then pushed into an array and returned. If there is an error it
//   will throw a new Error with a message.

export const getMobilesBuscape = async () => {
  const url = `${BUSCAPE_URL}/celular`;
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const mobiles = [];

    $('div[data-testid="product-card"]').each((i, el) => {
      const link = $(el)
        .find('a[data-testid="product-card::card"]')
        .attr("href");
      const name = $(el).find('h2[data-testid="product-card::name"]').text();
      const price = $(el).find('p[data-testid="product-card::price"]').text();
      const thumbnail = $(el)
        .find('div[data-testid="product-card::image"] span img')
        .attr("src");
      mobiles.push({
        id: i,
        title: name.trim(),
        price: price.trim(),
        thumbnail,
        category_id: CATEGORY_CELLPHONES,
        currency_id: "",
        permalink: `${BUSCAPE_URL}${link}`,
        site: "BUSCAPE",
      });
    });

    return mobiles;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch mobiles from Buscape." + error);
  }
};

// This function is an asynchronous function that uses axios and cheerio to get refrigerator
// data from Buscape. It makes a GET request to the BUSCAPE_URL with the path '/geladeira'
// and then uses cheerio to parse the response data. It then loops through each
// 'div[data-testid="product-card"]' element, extracting the link, name, price,
// and thumbnail of each refrigerator. Finally, it returns an array of refrigerators with
//  their respective information.

export const getRefrigeratorBuscape = async () => {
  const url = `${BUSCAPE_URL}/geladeira`;
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const refrigerators = [];

    $('div[data-testid="product-card"]').each((i, el) => {
      const link = $(el)
        .find('a[data-testid="product-card::card"]')
        .attr("href");
      const name = $(el).find('h2[data-testid="product-card::name"]').text();
      const price = $(el).find('p[data-testid="product-card::price"]').text();
      const thumbnail = $(el)
        .find('div[data-testid="product-card::image"] span img')
        .attr("src");
      refrigerators.push({
        id: i,
        category_id: CATEGORY_REFRIGERATOR,
        currency_id: "",
        title: name.trim(),
        price: price.trim(),
        permalink: `${BUSCAPE_URL}${link}`,
        thumbnail,
        site: "BUSCAPE",
      });
    });

    return refrigerators;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch refrigerators from Buscape.");
  }
};

// This code is an asynchronous function that uses the axios and cheerio libraries to fetch TVs
// from Buscape. It first defines the url, then uses axios.get() to make a request to the url.
// It then uses cheerio.load() to parse the response data, and creates an array of TVs.
// For each element in the array, it finds the link, name, price, and thumbnail of each
// TV and pushes it into the TVs array as an object with its corresponding values. Finally,
// it returns the TVs array. If there is an error in making the request or parsing the response
//  data, it will throw an error message "Failed to fetch TVs from Buscape."

export const getTVBuscape = async () => {
  const url = `${BUSCAPE_URL}/tv`;
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const TVs = [];

    $('div[data-testid="product-card"]').each((i, el) => {
      const link = $(el)
        .find('a[data-testid="product-card::card"]')
        .attr("href");
      const name = $(el).find('h2[data-testid="product-card::name"]').text();
      const price = $(el).find('p[data-testid="product-card::price"]').text();
      const thumbnail = $(el)
        .find('div[data-testid="product-card::image"] span img')
        .attr("src");
      TVs.push({
        id: i,
        category_id: CATEGORY_TV,
        currency_id: "",
        title: name.trim(),
        price: price.trim(),
        permalink: `${BUSCAPE_URL}${link}`,
        thumbnail,
        site: "BUSCAPE",
      });
    });

    return TVs;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch TVs from Buscape.");
  }
};

// This code is an asynchronous function that uses the axios and cheerio libraries to search
// for products on the Buscape website. It takes a searchValue parameter and returns an array
// of objects containing product information. The function first creates a URL based on the
//  searchValue parameter, then it uses axios to make a GET request to the URL.
//  The response data is then loaded into cheerio, which is used to select elements from the
//  page and extract product information such as name, price, link, and thumbnail.
//  This information is stored in an array of objects which is then returned by the function.

export const getBuscapeSearch = async (searchValue) => {
  const url = `https://www.buscape.com.br/search?q=${searchValue}`;
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const productsSearched = [];

    $('div[data-testid="product-card"]').each((i, el) => {
      const link = $(el)
        .find('a[data-testid="product-card::card"]')
        .attr("href");
      const name = $(el).find('h2[data-testid="product-card::name"]').text();
      const price = $(el).find('p[data-testid="product-card::price"]').text();
      const thumbnail = $(el)
        .find('div[data-testid="product-card::image"] span img')
        .attr("src");
      productsSearched.push({
        id: i,
        category_id: "",
        currency_id: "",
        title: name.trim(),
        price: price.trim(),
        permalink: `${BUSCAPE_URL}${link}`,
        thumbnail,
        site: "BUSCAPE",
      });
    });

    return productsSearched;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to search on Buscape.");
  }
};
