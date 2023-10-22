"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import CategoryCard from "../card/categoryCard/CategoryCard";
import CategoryType from "@/types/category";
import request from "@/server";
import icons from "@/assets/icon-category.png"

import "./style.scss";
import Image from "next/image";
const CategorySection: React.FC = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await request.get<CategoryType[]>("category");
        setCategories(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(error.response?.data);
        } else {
          console.error((error as Error).message);
        }
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container border">
      <div className="title">
        <h2> <Image src={icons} alt="icons" /> Maxsulotlar Categoriyasi</h2>
      </div>
      <div className="category__wrapper">
        {categories.map((category) => (
          <CategoryCard key={category._id} {...category} />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
