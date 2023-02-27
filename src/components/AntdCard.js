import React from "react";
import { Card } from "antd";
import { useEffect, useState } from "react";
import {
  getProductDescription,
  getCategoryName,
} from "@/lib/MELIendpointsAPI";
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
    Promise.all([
      getProductDescription(productId),
      getCategoryName(category_id),
    ])
      .then(([description, categoryName]) => {
        setProductDescription(description);
        setNameOfCategory(categoryName);
      })
      .catch((error) => console.error(error));
  }, [productId, site]);
  return (
    <Card
      hoverable
      cover={
        <>
          <Image
            className="imageCardProduct"
            src={thumbnail}
            alt={`Image from ${title}`}
            width={120}
            height={120}
          />
        </>
      }
      actions={[
        price,
        <Button
          className="buttonCardProduct"
          style={{ color: "white !important" }}
          type="primary"
          href={permalink}
        >
          <ShoppingCartOutlined />
        </Button>,
        <HeartOutlined />,
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
