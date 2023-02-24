import React from "react";
import { Card } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "antd";
import Image from "next/image";
const ProductCard = ({ product }) => {
  const [productDescription, setProductDescription] = useState("");
  const { title, price, thumbnail, category_id, permalink, productId } =
    product;
  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const response = await axios.get(
          `https://api.mercadolibre.com/items/${productId}/description`
        );
        setProductDescription(response.data.plain_text);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDescription();
  }, [productId]);
  return (
    <Card
      hoverable
      cover={
        <Image
          src={thumbnail}
          alt={`Image from ${title}`}
          width={800}
          height={600}
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
      <Button href={permalink}>Go to product</Button>
    </Card>
  );
};

export default ProductCard;
