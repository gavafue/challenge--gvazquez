import axios from "axios";
import * as cheerio from "cheerio";
const BUSCAPE_URL = "https://www.buscape.com.br";

const CATEGORY_CELLPHONES = "Cellphones";
const CATEGORY_TV = "TV";
const CATEGORY_REFRIGERATOR = "Refrigerator";

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
      });
    });

    return mobiles;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch mobiles from Buscape." + error);
  }
};

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
      });
    });

    return refrigerators;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch refrigerators from Buscape.");
  }
};

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
      });
    });

    return TVs;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch TVs from Buscape.");
  }
};
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
      });
    });

    return productsSearched;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch TVs from Buscape.");
  }
};
