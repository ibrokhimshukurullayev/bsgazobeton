import Image from "next/image";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="cart-item">
      <div className="item-info">
        <Image src={item.image} alt={item.name} width={80} height={48} />
        <div className="item-text">
          <div className="name">{item.name}</div>
          <div className="desc">{item.desc}</div>
        </div>
      </div>

      <div className="item-price">
        {item.price} UZS{item.unit && `/${item.unit}`}
      </div>

      <div className="item-quantity">
        <button onClick={onDecrease}>−</button>
        <span>{item.quantity}</span>
        <button onClick={onIncrease}>+</button>
      </div>

      <div className="remove-item">
        <p className="item-total">{item.total} UZS</p>
        <button onClick={onRemove}>×</button>
      </div>
    </div>
  );
};

export default CartItem;
