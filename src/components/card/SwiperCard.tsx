import Image from "next/image";
import card from "@/assets/card.jpg"


import "./style.scss"
const SwiperCard = () => {
  return (
    <div className="card">
      <div className="card__img">
        <Image src={card} alt="card photo" />
      </div>
      <div className="card__title">
        <h3>Phone</h3>
      </div>
    </div>
  );
}

export default SwiperCard