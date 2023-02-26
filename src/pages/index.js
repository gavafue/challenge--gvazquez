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
  getProductsByCategoryMELI,
  cellphonesMELI,
  refrigeratorMELI,
  TVMELI,
} from "../lib/MELIendpointsAPI";
import dbConnect from "./api/dataBaseConection";
import Search from "../models/Search";

// Import React hooks
import { useState, useEffect } from "react";

// Import CSS styles
import styles from "../styles/menuSearch.module.css";

// Define the Home component
export default function Home() {
  // Define state variables for the search form
  const [siteSearch, setSiteSearch] = useState("");
  const [category, setCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [headerOfProducts, setHeaderOfProducts] = useState("");

  // Define state variables for the product list
  const [products, setProducts] = useState([]);
  const [pageLoading, setPageLoading] = useState(undefined);

  // Define a function to retrieve products from the specified category
  const updateProductList = async (category_id) => {
    try {
      setPageLoading(true);
      const result = await getProductsByCategoryMELI(category_id);
      setProducts(result);
    } catch (error) {
      console.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  // Define an effect to update the product list when the site or category changes
  useEffect(() => {
    if (siteSearch === "MELI") {
      let category_id;
      switch (category) {
        case "Cellphones":
          category_id = cellphonesMELI;
          break;
        case "Refrigerator":
          category_id = refrigeratorMELI;
          break;
        case "TV":
          category_id = TVMELI;
          break;
      }
      updateProductList(category_id);
    } else setProducts([]);
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
              className={styles.searchBox}
              setSiteSearch={setSiteSearch}
              setCategory={setCategory}
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
              onClick={() => {
                setProducts([]);
                setCategory("");
                setSiteSearch("");
              }}
            />
          </div>

          <div>
            <h2>{products.length > 0 && headerOfProducts}</h2>
            {!products.length && (
              <Card title="Welcome">
                Please select a category and platform or search a product on the
                searchbox to show products
              </Card>
            )}
            <Row gutter={[16, 16]}>
              {products?.map((product) => {
                return (
                  <Col key={product.id} span={6}>
                    <AntdCard
                      site={siteSearch}
                      product={{
                        productId: product.id,
                        title: product.title,
                        price: `$ ${product.currency_id} ${product.price}`,
                        thumbnail: product.thumbnail,
                        category_id: product.category_id,
                        permalink: product.permalink,
                        site: siteSearch,
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
    return { props: { Search: JSON.stringify(res) } };
  } catch (error) {
    // Log any errors that occur and return an empty object to ensure something is returned even if an error occurs
    console.log("Error:", error);
    return { props: {} };
  }
}
