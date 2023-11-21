"use client";
import ProductType from "@/types/product";
import Image from "next/image";
import { Fragment, useState, useEffect } from "react";

import "./style.scss";
import Link from "next/link";
import request from "@/server";
import { message } from "antd";
const ProductsCard = ({
  image,
  title,
  description,
  price,
  quantity,
  updatedAt,
  _id,
}: ProductType) => {
  const [product, setProduct] = useState<ProductType[]>([]);
  const [id, setId] = useState("");


  async function handleBasket(id: string) {
    setId(id);
    const product: ProductType[] =
      JSON.parse(localStorage.getItem("cards") as string) || [];
    const isExistProduct = product.find((el) => el?._id === id);
    if (isExistProduct) {
      const updatedData = product.map((el) => {
        if (el?._id === id) {
          return {
            ...el,
            soni: el.soni + 1,
          };
        }
        return el;
      });
      localStorage.setItem("cards", JSON.stringify(updatedData));
    } else {
      const data = [
        ...product,
        { _id, soni: 1, description, image, price, quantity, title, updatedAt },
      ];
      localStorage.setItem("cards", JSON.stringify(data));
    }
    message.success("Product added to your bag!!");
  }

  useEffect(() => {
    async function getProduct() {
      console.log(id);

      try {
        const { data } = await request.get(`product/${id}`);
        setProduct(data);
      } catch (err) {
        message.error("server error: " + err);
      }
    }
    getProduct();
  }, []);

  return (
    <Fragment>
      <div className="card__products">
        <div className="card__products__img">
          <Image src={image?.url} alt={title} width={350} height={200} />
        </div>
        <div className="card__products__title">
          <div className="card__products__title__desc">
            <p>Narhi: {price} sum</p>
            <p>Qancha borligi: {quantity} dona</p>
          </div>
          <Link href={`/product/${_id}`}>
            <h3>{title}</h3>
          </Link>
          <h5>{description}</h5>
        </div>
        <div className="card__products__btn">
          <button onClick={() => handleBasket(_id)}>В корзину</button>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductsCard;
