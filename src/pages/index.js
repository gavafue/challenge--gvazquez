// Import the Head component from Next.js
import Head from "next/head";

// Import custom components
import AntdLayout from "../components/AntdLayout";
import AntdSelect from "../components/AntdSelect";
import SearchBox from "../components/SearchBox";
import AntdCard from "../components/AntdCard";
import Spinner from "@/components/Spinner";

// Import Ant Design components
import { Col, Row } from "antd";
import { Card } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

// Import custom functions
import {
  getProductsByCategory,
  CELLPHONES_CATEGORY_MELI,
  REFRIGERATOR_CATEGORY_MELI,
  TV_CATEGORY_MELI,
} from "../lib/MELIendpointsAPI";
import dbConnect from "./api/dataBaseConection";
import Search from "../models/Search";

// Import React hooks
import { useState, useEffect } from "react";

// Import CSS styles
import styles from "../styles/menuSearch.module.css";
import axios from "axios";

// Define the Home component
export default function Home({ mobiles, refrigerator, TV }) {
  // Define state variables for the search form
  const [siteSearch, setSiteSearch] = useState("");
  const [category, setCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [headerOfProducts, setHeaderOfProducts] = useState("");

  // Define state variables for the product list
  const [products, setProducts] = useState([]);
  const [pageLoading, setPageLoading] = useState(undefined);
  const updateProductList = async (categoryId, site) => {
    setPageLoading(true);
    if (site === "MELI") {
      const result = await getProductsByCategory(categoryId);
      setProducts(result || []);
    }
    if (site === "BUSCAPE") {
      if (category === "Cellphones") {
        const result = await axios.get("/api/getCellphonesBuscape");
        setProducts(result.data.data || []);
      }
      if (category === "TV") {
        const result = await axios.get("/api/getTVBuscape");
        setProducts(result.data.data || []);
      }
      if (category === "Refrigerator") {
        const result = await axios.get("/api/getRefrigeratorsBuscape");
        setProducts(result.data.data || []);
      }
    }
    setPageLoading(false);
  };

  useEffect(() => {
    const objectMeliCategoriesID = {
      Cellphones: CELLPHONES_CATEGORY_MELI,
      Refrigerator: REFRIGERATOR_CATEGORY_MELI,
      TV: TV_CATEGORY_MELI,
    };
    if (siteSearch === "MELI") {
      const categoryId = objectMeliCategoriesID[category];
      updateProductList(categoryId, "MELI");
    }
    if (siteSearch === "BUSCAPE") {
      updateProductList("", "BUSCAPE");
    }
  }, [siteSearch, category]);

  // Define options for the category and site select inputs
  const categoriesSelect = [
    {
      value: "Cellphones",
      label: "Cellphones",
    },
    {
      value: "Refrigerator",
      label: "Refrigerator",
    },
    {
      value: "TV",
      label: "TV",
    },
  ];

  const siteSelect = [
    {
      value: "MELI",
      label: "Free Market",
    },
    {
      value: "BUSCAPE",
      label: "Buscapé",
      disabled: true,
    },
  ];

  // Define event handlers for the category and site select inputs
  const handleSelectSite = (value) => {
    setSiteSearch(value);
    setSearchValue("");
  };
  const handleSelectCategory = (value) => {
    setCategory(value);
    setSearchValue("");
    setHeaderOfProducts(value);
  };

  //Button to remove all filters
  const removeFilters = () => {
    setSearchValue("");
    setProducts([]);
    setSiteSearch("");
    setCategory("");
  };
  return (
    <>
      <div>
        <Head>
          <title>Gavafue - Free Market</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <AntdLayout>
          <div className={styles.menu}>
            <AntdSelect
              placeholder={"Select a category"}
              className={styles.select}
              value={category}
              handleChange={handleSelectCategory}
              options={categoriesSelect}
            />
            <AntdSelect
              placeholder={"Select a site"}
              className={styles.select}
              handleChange={handleSelectSite}
              value={siteSearch}
              options={siteSelect}
            />
            <SearchBox
              setCategory={setCategory}
              siteSearch={siteSearch}
              className={styles.searchBox}
              setHeaderOfProducts={setHeaderOfProducts}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              setPageLoading={setPageLoading}
              setProducts={setProducts}
            />
            <DeleteOutlined
              className={styles.removeButton}
              style={{
                lineHeight: "100%",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={() => removeFilters()}
            />
          </div>

          <div>
            <h2>{products?.length > 0 && headerOfProducts}</h2>
            {!products?.length && (
              <Card title="Welcome">
                Please select a category and platform or search a product on the
                searchbox to show products
              </Card>
            )}
            <Row gutter={[16, 16]}>
              {products?.map((product) => {
                return (
                  <Col key={product.id + 1} xs={24} sm={12} md={8} lg={6}>
                    <AntdCard
                      product={{
                        productId: product.id || "",
                        title: product.title || "",
                        price: `${product.currency_id}  ${product.price}` || "",
                        thumbnail: product.thumbnail || "",
                        category_id: product.category_id || "",
                        permalink: product.permalink || "",
                        site: product.site,
                      }}
                    />
                  </Col>
                );
              })}
            </Row>
          </div>
        </AntdLayout>
      </div>
      {pageLoading && <Spinner />}
    </>
  );
}
/**
This function retrieves data from the server-side before rendering the component.
It connects to the database and retrieves all data from the "Search" collection.
@returns {object} An object containing the "Search" data as a prop.
*/
export async function getServerSideProps() {
  try {
    // Connect to the database
    await dbConnect();
    // Retrieve data from the "Search" collection
    const res = await Search.find({});
    // Return the "Search" data as a prop
    return { props: {} };
  } catch (error) {
    // Log any errors that occur and return an empty object to ensure something is returned even if an error occurs
    console.error("Error:", error);
    return { props: {} };
  }
}
