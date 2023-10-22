import Image from "next/image";

import "./style.scss";
import ProductType from "@/types/product";
import Link from "next/link";
const SwiperCard = ({ title, image, _id }: ProductType) => {
  return (
    <div className="card__latest">
      <div className="card__latest__img">
        <Image src={image?.url} alt={title} width={350} height={200} />
      </div>
      <div className="card__latest__title">
        <Link href={`product/${_id}`}>
          <h5>{title}</h5>
        </Link>
      </div>
    </div>
  );
};

export default SwiperCard;
