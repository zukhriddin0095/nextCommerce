import CategorySection from "@/components/category/CategorySection";
import NewProducts from "@/components/newproducts/NewProducts";

export default function Home() {
  return (
    <main>
      <div className="container">
        <div className="newProducts">
          <NewProducts />
        </div>
      </div>
      <div className="category">
        <CategorySection />
      </div>
    </main>
  );
}
