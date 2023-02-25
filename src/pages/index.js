import Head from "next/head";
import AntdLayout from "../components/AntdLayout";
import AntdSelect from "../components/AntdSelect";
import SearchBox from "../components/SearchBox";
import { Col, Row } from "antd";
import styles from "../styles/menuSearch.module.css";
import { useState, useEffect } from "react";
import AntdCard from "../components/AntdCard";
import {
  cellphonesMELI,
  refrigeratorMELI,
  TVMELI,
  getProductsByCategoryMELI,
} from "./endpointsAPI/MELI";
import Spinner from "@/components/Spinner";

export default function Home() {
  const [siteSearch, setSiteSearch] = useState("MELI");
  const [category, setCategory] = useState("Cellphones");
  const [products, setProducts] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  /**
   * Retrieves products from the specified category and updates the state with the result.
   * @param {string} category_id - The ID of the category from which to retrieve the products.
   */
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
      setPageLoading(true);
      getProductsByCategoryMELI(category_id).then((result) =>
        setProducts(result)
      );
      setPageLoading(false);
    } else setProducts([]);
  }, [siteSearch, category]);

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
          <h2>{category}</h2>
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
      {pageLoading && <Spinner />}
    </div>
  );
}
