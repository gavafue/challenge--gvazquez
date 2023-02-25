import Head from "next/head";
import AntdLayout from "../components/AntdLayout";
import AntdSelect from "../components/AntdSelect";
import SearchBox from "../components/SearchBox";
import { Col, Row } from "antd";
import styles from "../styles/menuSearch.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import AntdCard from "../components/AntdCard";
import {
  cellphonesMELI,
  refrigeratorMELI,
  TVMELI,
  MELICategoriesLink,
  getProductsByCategoryMELI,
} from "./endpointsAPI/MELI";

export default function Home() {
  const [siteSearch, setSiteSearch] = useState("MELI");
  const [category, setCategory] = useState("cellphones");
  const [products, setProducts] = useState([]);

  /**
   * Retrieves products from the specified category and updates the state with the result.
   * @param {string} category_id - The ID of the category from which to retrieve the products.
   */
  useEffect(() => {
    if (siteSearch === "MELI") {
      let category_id;
      switch (category) {
        case "cellphones":
          category_id = cellphonesMELI;
          break;
        case "refrigerator":
          category_id = refrigeratorMELI;
          break;
        case "TV":
          category_id = TVMELI;
          break;
      }
      getProductsByCategoryMELI(category_id).then((result) =>
        setProducts(result)
      );
    } else setProducts([]);
  }, [siteSearch, category]);
  const categoriesSelect = [
    {
      value: "cellphones",
      label: "Cellphones",
    },
    {
      value: "refrigerator",
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
    },
  ];

  const handleSelectSite = (value) => setSiteSearch(value);
  const handleSelectCategory = (value) => setCategory(value);
  return (
    <div>
      <Head>
        <title>Gavafue - Free Market</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AntdLayout>
        <div className={styles.menu}>
          <AntdSelect
            value={category}
            handleChange={handleSelectCategory}
            options={categoriesSelect}
          />
          <AntdSelect
            handleChange={handleSelectSite}
            value={siteSearch}
            options={siteSelect}
          />
          <SearchBox />
        </div>

        <div>
          <h1>Cell Phones</h1>
          <Row gutter={[16, 16]}>
            {products?.map((product) => {
              return (
                <Col key={product.id} span={6}>
                  <AntdCard
                    product={{
                      productId: product.id,
                      title: product.title,
                      price: `$ ${product.price}`,
                      thumbnail: product.thumbnail,
                      category_id: product.category_id,
                      permalink: product.permalink,
                    }}
                  />
                </Col>
              );
            })}
          </Row>
        </div>
      </AntdLayout>
    </div>
  );
}
