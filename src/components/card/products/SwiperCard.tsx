"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProductType from "@/types/product";
import Link from "next/link";
import { message } from "antd";

import "./style.scss";
import request from "@/server";
const SwiperCard = ({
  title,
  image,
  _id,
  price,
  quantity,
  description,
  updatedAt,
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
        {
          _id,
          soni: 1,
          description,
          image,
          price,
          quantity,
          title,
          updatedAt,
        },
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
  }, [id]);
  return (
    <div className="card__latest">
      <div className="card__latest__img">
        <Image src={image?.url} alt={title} width={350} height={200} />
      </div>
      <div className="card__latest__title">
        <Link href={`product/${_id}`}>
          <h5>{title}</h5>
          <button id="plus" onClick={() => handleBasket(_id)}>+</button>
        </Link>
      </div>
    </div>
  );
};

export default SwiperCard;
