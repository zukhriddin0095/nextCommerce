import CategoryCard from "../card/categoryCard/CategoryCard";



import "./style.scss"
const MainCategory = () => {
  return (
    <div className="container">
      <div className="title">
        <h2>Maxsulotlar Categoriyasi</h2>
      </div>
      <div className="category__wrapper">
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </div>
    </div>
  );
}

export default MainCategory