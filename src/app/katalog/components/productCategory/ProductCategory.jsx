import "./productCategory.scss";
import ProductCard from "../productCard/ProductCard";

const ProductCategory = ({ title, products }) => (
  <div className="product-category">
    <h2>{title}</h2>
    <div className="product-grid">
      {products.map((p, i) => (
        <ProductCard key={i} product={p} />
      ))}
    </div>
  </div>
);

export default ProductCategory;
