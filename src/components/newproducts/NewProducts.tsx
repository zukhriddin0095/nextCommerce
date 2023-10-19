"use client";
import Image from "next/image";
import newproduct from "@/assets/new-products.png";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./style.scss";
import SwiperCard from "../card/SwiperCard";
const NewProducts = () => {
  return (
    <>
      <div className="container row">
        <div className="title">
          <h1>
            <Image src={newproduct} alt="newproducts" /> Yangi Maxsulotlar
          </h1>
        </div>
        <div className="carausel">
          <Swiper
            spaceBetween={0}
            slidesPerView={3.5}
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
                spaceBetween: 10,
              },
              950: {
                width: 1280,
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1280: {
                width: 1340,
                slidesPerView: 3.5,
              },
            }}
          >
            <SwiperSlide>
              <SwiperCard />
            </SwiperSlide>
            <SwiperSlide>
              <SwiperCard />
            </SwiperSlide>
            <SwiperSlide>
              <SwiperCard />
            </SwiperSlide>
            <SwiperSlide>
              <SwiperCard />
            </SwiperSlide>
            <SwiperSlide>
              <SwiperCard />
            </SwiperSlide>
            <SwiperSlide>
              <SwiperCard />
            </SwiperSlide>
            <SwiperSlide>
              <SwiperCard />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default NewProducts;
