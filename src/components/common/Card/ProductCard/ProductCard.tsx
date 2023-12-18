//
import { ProductProps } from 'types';
// Component
import Button from '@components/common/Button/Button';
// Css
import './product-card.css';
// Icon image
import iconDelete from '@assets/icon/icon_del.svg';

const ProductCard = ({ product, onDelete, onEdit }: ProductProps) => {
  const handleDeleteProduct = () => {
    onDelete(product.id);
  };

  const handleEditProduct = () => {
    onEdit(product);
  };

  return (
    <div className="product-card">
      <Button
        classButton="btn-del"
        type="button"
        onClick={handleDeleteProduct}
        children={<img src={iconDelete} alt="Cross icon" className="icon-del" />}
      />
      <div className="product-wrapper">
        <div className="product-img">
          <img src={product.image} alt={product.name} className="img-item" />
        </div>
        <div className="product-content">
          <p className="product-name">{product.name}</p>
          <div className="product-detail">
            {product.price}
            <div className="separate"></div>
            {product.quantity} Bowls
          </div>
        </div>
      </div>
      <Button classButton="btn-edit" onClick={handleEditProduct} type="button">
        <p className="edit-text" data-id={product.id}>
          Edit dish
        </p>
      </Button>
    </div>
  );
};

export default ProductCard;
