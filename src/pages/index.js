import Head from "next/head";
import AntdLayout from "../components/AntdLayout";
import AntdSelect from "../components/AntdSelect";
import SearchBox from "../components/SearchBox";
import { Col, Row } from "antd";
import styles from "../styles/menuSearch.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import AntdCard from "../components/AntdCard";

const getProducts = async () => {
  try {
    const response = await axios.get(
      "https://api.mercadolibre.com/sites/MLA/search?category=MLA1055"
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };
    fetchProducts();
  }, []);
  return (
    <div>
      <Head>
        <title>Gavafue - Free Market</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AntdLayout>
        <div className={styles.menu}>
          <AntdSelect options={["Mobile", "Refrigerator", "TV"]} />
          <AntdSelect options={["Mercado Libre", "Buscapé"]} />
          <SearchBox />
        </div>

        <div>
          <h1>Cell Phones</h1>
          <Row gutter={[16, 16]}>
            {products.map((product) => {
              console.log(product);
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
