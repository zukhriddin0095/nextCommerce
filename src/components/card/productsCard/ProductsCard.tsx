import ProductType from "@/types/product";
import Image from "next/image";
import { Fragment } from "react";

import "./style.scss";
import Link from "next/link";
const ProductsCard = ({
  image,
  title,
  description,
  price,
  quantity,
  updatedAt,
  _id,
}: ProductType) => {
  return (
    <Fragment>
      <div className="card">
        <div className="card__img">
          <Image src={image?.url} alt={title} width={350} height={200} />
        </div>
        <div className="card__title">
          <div className="card__title__desc">
            <p>Narhi: {price} sum</p>
            <p>Qancha borligi: {quantity} dona</p>
          </div>
          <Link href={`/product/${_id}`}>
            <h3>{title}</h3>
          </Link>
          <h5>{description}</h5>
        </div>
        <div className="card__btn">
          <button>В корзину</button>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductsCard;
