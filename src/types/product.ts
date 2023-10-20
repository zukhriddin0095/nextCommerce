import ImageType from "./image";
import CategoryType from "./category";

interface ProductType {
  checked: boolean;
  sold: number;
  _id: string;
  title: string;
  price: number;
  description: string;
  image: ImageType;
  quantity: number;
  category: CategoryType;
  createdAt: string;
  updatedAt: string;
}

export default ProductType;
