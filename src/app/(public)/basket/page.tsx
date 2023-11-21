"use client";
import { Fragment, useEffect, useState } from "react";
import ProductType from "@/types/product";
import Image from "next/image";

import "./style.scss";
const ShoppingCard = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("cards");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setProducts(parsedData);
      }
    }
  }, []);

  const removeProduct = (id: string) => {
    const updatedCard = products.filter((el) => el._id !== id);
    localStorage.setItem("cards", JSON.stringify(updatedCard));
    setProducts(updatedCard);
  };

  const handeIncriments = function (id: string) {
    const updatedCard = products.map((el) => {
      if (el._id === id) {
        return {
          ...el,
          soni: el.soni + 1,
        };
      }
      return el;
    });
    localStorage.setItem("cards", JSON.stringify(updatedCard));
    setProducts(updatedCard);
  };

  const handeDecriment = function (id: string) {
    const existProduct = products.find((el) => el._id === id);
    if (existProduct?.soni === 1) {
      const updatedCard = products.filter((el) => el._id !== id);
      localStorage.setItem("cards", JSON.stringify(updatedCard));
      setProducts(updatedCard);
    } else {
      const updatedCard = products.map((el) => {
        if (el._id === id) {
          return {
            ...el,
            soni: el.soni - 1,
          };
        }
        return el;
      });
      localStorage.setItem("cards", JSON.stringify(updatedCard));
      setProducts(updatedCard);
    }
  };

  return (
    <Fragment>
      <main>
        <div className="container">
          <div className="shopping__box">
            <div className="wrapper__wopping__card">
              {products.map((el) => (
                <div key={el?._id} className="shoppingCard">
                  <div className="shoppingCard__img">
                    <Image
                      src={el?.image?.url}
                      alt="shopping-card"
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="shoppingCard__title">
                    <h3>{el?.title}</h3>
                    <h5>{el.description}</h5>
                  </div>
                  <div className="shoppingCard__quantity">
                    <button onClick={() => handeDecriment(el._id)}>-</button>
                    <h3>{el.soni}</h3>
                    <button onClick={() => handeIncriments(el._id)}>+</button>
                  </div>
                  <div className="shoppingCard__price">
                    <h3>{el.price} sum</h3>
                  </div>
                  <button
                    onClick={() => removeProduct(el._id)}
                    className="deleteProduct"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>

            <div className="bside__shopping">
              <div className="bside__shopping__Subtotal">
                <h3>Subtotal</h3>
                <h3>1604$</h3>
              </div>
              <div className="bside__shopping__Shipping">
                <h3>Shipping</h3>
                <h3>4 $</h3>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default ShoppingCard;
