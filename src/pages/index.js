import Head from "next/head";
import AntdLayout from "../components/AntdLayout";
import AntdSelect from "../components/AntdSelect";
import SearchBox from "../components/SearchBox";
import { Col, Row } from "antd";
import styles from "../styles/menuSearch.module.css";
import { useState, useEffect } from "react";
import AntdCard from "../components/AntdCard";
import {
  getProductsByCategoryMELI,
  cellphonesMELI,
  refrigeratorMELI,
  TVMELI,
} from "../lib/MELIendpointsAPI";
import Spinner from "@/components/Spinner";
import dbConnect from "./api/dataBaseConection";
import Search from "../models/Search";
import { Card } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export default function Home() {
  const [siteSearch, setSiteSearch] = useState("default");
  const [category, setCategory] = useState("default");
  const [products, setProducts] = useState([]);
  const [pageLoading, setPageLoading] = useState(undefined);
  const [searchValue, setSearchValue] = useState("");
  const [headerOfProducts, setHeaderOfProducts] = useState("");
  console.log(products);
  /**
   * Retrieves products from the specified category and updates the state with the result.
   * @param {string} category_id - The ID of the category from which to retrieve the products.
   */

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

  const categoriesSelect = [
    { value: "default", label: "Category", disabled: true },
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
    { value: "default", label: "Platform", disabled: true },
    {
      value: "MELI",
      label: "Free Market",
    },
    {
      value: "BUSCAPE",
      label: "Buscapé",
    },
  ];

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
              className={styles.select}
              value={category}
              handleChange={handleSelectCategory}
              options={categoriesSelect}
            />
            <AntdSelect
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
                setCategory("default");
                setSiteSearch("default");
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
export async function getServerSideProps() {
  try {
    await dbConnect();
    const res = await Search.find({});
    return { props: { Search: 123 } };
  } catch (error) {
    console.log("error", error);
    return { props: {} }; // added return statement here to ensure something is returned even if an error occurs
  }
}
