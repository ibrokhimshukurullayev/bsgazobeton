import Image from "next/image";
import "./productCard.scss";
import compare from "../../../../assets/images/compare.png";

const ProductCard = ({ product }) => (
  <div className="product__box">
    <div className="product__card">
      <Image
        className="product__card__img"
        src={product.image}
        alt={product.name}
      />
      <h3>{product.name}</h3>
      <div className="product__card__text">
        <p>Og‘irligi:</p>
        <p>{product.weight}</p>
      </div>
      <div className="product__card__list">
        <p>1 m3 da bloklar soni: </p>
        <p>{product.size}</p>
      </div>
      <div className="product__card__end">
        <p>1 paddonda bloklar soni:</p>
        <p>{product.number}</p>
      </div>
      <h4 className="product__price">{product.price}UZS/m3</h4>
      <button className="add-to-cart">Savatga qo‘shish</button>
      <p className="product__card__compare">
        <Image src={compare} alt="compare" width={24} height={24} />
        Taqqoslashga qo‘shish
      </p>
    </div>
  </div>
);

export default ProductCard;
