"use client";

import Loading from "@/app/loading";
import ProductsCard from "@/components/card/productsCard/ProductsCard";
import Pagination from "@/components/pagination/Pagination";
import request from "@/server";
import ProductType from "@/types/product";
import { Fragment, useEffect, useState } from "react";

// import { Fragment, useEffect, useState } from "react";
// import ProductType from "@/types/product";
// import request from "@/server";
// import ProductsCard from "@/components/card/productsCard/ProductsCard";
// import Loading from "@/app/loading";

import "./style.scss";
// import Pagination from "@/components/pagination/Pagination";
// const ProductsPage = () => {

//   const [Allproduct, setAllProduct] = useState<ProductType[] | null>(null);
//   const [total, setTotal] = useState(0);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     async function getAllproducts() {
//       try {
//         const {
//           data: { total, products },
//         } = await request.get(`product`);
//         setAllProduct(products);
//         setTotal(total);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     getAllproducts();
//   }, []);

//   async function handleSearch(e: React.MouseEvent) {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const {
//         data: { total, products },
//       } = await request.get(`product?search=${searchQuery}`);
//       setAllProduct(products);
//       setTotal(total);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   if (!Allproduct) {
//     return <Loading />;
//   }

//   return (
//     <Fragment>
//       <div className="container">
//         <div className="wrapper">
//           <div className="header__search">
//             {loading ? (
//               <Loading />
//             ) : (
//               <form>
//                 {" "}

//                 <input
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   type="text"
//                   placeholder="Search . . ."
//                 />{" "}
//                 <button onClick={handleSearch} type="submit">
//                   🔍
//                 </button>{" "}
//               </form>
//             )}
//           </div>
//           <div className="wrapper__title">
//             <h3>All Product</h3>
//             <h3>Total: ({total})</h3>
//           </div>
//           <div className="wrapper__cards">
//             {Allproduct?.map((product) => (
//               <ProductsCard key={product._id} {...product} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default ProductsPage;

// ... (yuklama va importlar)

const ProductsPage = () => {
  const [Allproduct, setAllProduct] = useState<ProductType[] | null>(null);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Joriy sahifa raqami

  useEffect(() => {
    async function getAllproducts() {
      setLoading(true);
      try {
        const {
          data: { total, products },
        } = await request.get(`product?page=${currentPage}`);
        setAllProduct(products);
        setTotal(total);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getAllproducts();
  }, []);

  async function handleSearch(e: React.MouseEvent) {
    e.preventDefault()
    setLoading(true);
    try {
      const {
        data: { total, products },
      } = await request.get(
        `product?search=${searchQuery}&page=${currentPage}`
      );
      setAllProduct(products);
      setTotal(total);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  // Sahifa o'zgariqqa qaramaydi
  const onPageChange: (pageNumber: number) => void = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // ... (qolgan komponent kodlari)

  return (
    <Fragment>
      <div className="container">
        <div className="wrapper__products">
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
          <div className="wrapper__products__title">
            <h3>All Product</h3>
            <h3>Total: ({total})</h3>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <div className="wrapper__products__cards">
              {Allproduct?.map((product) => (
                <ProductsCard key={product._id} {...product} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="container">
        <Pagination
          total={total}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </Fragment>
  );
};

export default ProductsPage;
