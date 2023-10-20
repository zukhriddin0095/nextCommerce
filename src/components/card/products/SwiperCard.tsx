import Image from "next/image";

import "./style.scss";
import ProductType from "@/types/product";
import Link from "next/link";
const SwiperCard = ({ title, image, _id }: ProductType) => {
  return (
    <div className="card">
      <div className="card__img">
        <Image src={image?.url} alt={title} width={300} height={200} />
      </div>
      <div className="card__title">
        <Link href={`products/${_id}`}>
          <h5>{title}</h5>
        </Link>
      </div>
    </div>
  );
};

export default SwiperCard;
