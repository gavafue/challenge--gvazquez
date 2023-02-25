import React from "react";
import { Card } from "antd";
import { useEffect, useState } from "react";
import {
  getDescriptionProductMELI,
  getImageProductMELI,
} from "@/pages/endpointsAPI/MELI";
import { Button } from "antd";
import Image from "next/legacy/image";
const ProductCard = ({ product, site }) => {
  const [productDescription, setProductDescription] = useState("");

  const { title, price, category_id, permalink, productId, thumbnail } =
    product;
  useEffect(() => {
    if (site === "MELI") {
      getDescriptionProductMELI(productId).then((result) =>
        setProductDescription(result)
      );
    }
  }, [productId, site]);
  return (
    <Card
      hoverable
      cover={
        <Image
          src={thumbnail}
          alt={`Image from ${title}`}
          width={200}
          height={200}
          layout="responsive"
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
          srcSet={thumbnail}
        />
      }
    >
      <Card.Meta title={title} />
      <div>Category: {category_id}</div>
      <div>Price: {price}</div>
      <div className="descriptionCard">Description: {productDescription}</div>
      <Button block href={permalink}>
        Go to product
      </Button>
    </Card>
  );
};

export default ProductCard;
