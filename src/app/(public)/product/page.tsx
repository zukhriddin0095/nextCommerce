"use client";
import { Fragment, useEffect, useState } from "react";
import ProductType from "@/types/product";
import request from "@/server";
import ProductsCard from "@/components/card/productsCard/ProductsCard";

import "./style.scss";
const ProductsPage = () => {
  const [Allproduct, setAllProduct] = useState<ProductType[] | null>(null);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function getAllproducts() {
      try {
        const {
          data: { total, products },
        } = await request.get(`product`);
        setAllProduct(products);
        setTotal(total);
      } catch (error) {
        console.log(error);
      }
    }
    getAllproducts();
  }, []);

  async function handleSearch(e: React.MouseEvent) {
    e.preventDefault()
    try {
     const {
       data: { total, products },
     } = await request.get(`product?search=${searchQuery}`);
     setAllProduct(products);
     setTotal(total)
    } catch (error) {
      
    }
  }

  return (
    <Fragment>
      <div className="container">
        <div className="wrapper">
          <div className="header__search">
            <form>
              <input
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Search . . ."
              />
              <button onClick={handleSearch} type="submit">
                🔍
              </button>
            </form>
          </div>
          <div className="wrapper__title">
            <h3>All Product</h3>
            <h3>Total: ({total})</h3>
          </div>
          <div className="wrapper__cards">
            {Allproduct?.map((product) => (
              <ProductsCard key={product._id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductsPage;
