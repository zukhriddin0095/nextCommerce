import MainCategory from "@/components/categories/MainCategory";
import NewProducts from "@/components/newproducts/NewProducts";

export default function Home() {
  return (
    <main >
      <div className="newProducts">
      <NewProducts />
      </div>
      <div className="category">
        <MainCategory />
      </div>
    </main>
  )
}
