"use client";

import Image from "next/image";
import newproduct from "@/assets/new-products.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Fragment, useEffect, useState } from "react";
import ProductType from "@/types/product";
import SwiperCard from "../card/products/SwiperCard";
import request from "@/server";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./style.scss";

const NewProducts = () => {
  const [products, setProducts] = useState([] as ProductType[]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getLatestProducts();
  }, []);

  async function getLatestProducts() {
    setLoading(true)
    try {
      const { data } = await request.get<ProductType[]>("last-products");
      setProducts(data);
    setLoading(false);

    } catch (error) {
      console.error("Error fetching latest products: ", error);
    }finally {
    setLoading(false)
  }
  }

  return (
    <Fragment>
      <div className="container row">
        <div className="title">
          <h1>
            <Image src={newproduct} alt="newproducts" /> Yangi Maxsulotlar
          </h1>
        </div>
        <div className="carousel">
          <Swiper
            loop
            modules={[Autoplay]}
            spaceBetween={10}
            slidesPerView={3.5}
            autoplay={{
              delay: 800,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            breakpoints={{
              350: {
                width: 450,
                slidesPerView: 1,
              },
              450: {
                width: 576,
                slidesPerView: 1.5,
              },
              576: {
                width: 950,
                slidesPerView: 2.5,
              },
              950: {
                width: 1280,
                slidesPerView: 3,
              },
              1280: {
                width: 1340,
                slidesPerView: 3.5,
              },
            }}
            className="mySwiper"
          >
            {products.map((product) => (
              <SwiperSlide key={product?._id}>
                <SwiperCard {...product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProducts;
