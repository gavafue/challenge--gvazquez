import React from "react";
import { Card } from "antd";
import { useEffect, useState } from "react";
import { getProductDescription, getCategoryName } from "@/lib/MELIendpointsAPI";
import { Button } from "antd";
import Image from "next/legacy/image";
import buscape_logo from "../assets/buscape_logo.png";
import meli_logo from "../assets/meli_logo.jpg";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
const ProductCard = ({ product }) => {
  const [productDescription, setProductDescription] = useState("");
  const [nameOfCategory, setNameOfCategory] = useState("");
  const { title, price, category_id, permalink, productId, thumbnail, site } =
    product;
  useEffect(() => {
    if (site === "MELI") {
      Promise.all([
        getProductDescription(productId),
        getCategoryName(category_id),
      ])
        .then(([description, categoryName]) => {
          setProductDescription(description);
          setNameOfCategory(categoryName);
        })
        .catch((error) => console.error(error));
    }
    if (site === "BUSCAPE") {
      setNameOfCategory(category_id);
    }
  }, [productId, site, category_id]);
  return (
    <Card
      hoverable
      cover={
        <>
          <Image
            className="imageCardProduct"
            src={
              thumbnail ||
              "https://f.fcdn.app/imgs/c10fb0/multiplast.com.uy/multuy/d2fc/original/catalogo/2438_2438_1/2000-2000/azul-francia-azul-francia.jpg"
            }
            alt={`Image from ${title}`}
            width={120}
            height={120}
          />
        </>
      }
      actions={[
        <p key="55">{price}</p>,
        <Button
          key="56"
          className="buttonCardProduct"
          style={{ color: "white !important" }}
          type="primary"
          href={permalink}
        >
          <ShoppingCartOutlined />
        </Button>,
        <HeartOutlined key="57" />,
      ]}
    >
      <div className="iconSite">
        <Image
          src={site === "MELI" ? meli_logo : buscape_logo}
          alt={`Logo from website`}
          width={40}
          height={40}
        />
      </div>
      <Card.Meta title={title} />
      <div
        style={{
          textAlign: "center",
          textTransform: "uppercase",
          fontSize: "10px",
        }}
      >
        {nameOfCategory && nameOfCategory}
      </div>
      <div className="descriptionCard"> {productDescription}</div>
    </Card>
  );
};

export default ProductCard;
