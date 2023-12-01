import { ProductProps } from 'interfaces/product/Product'
import iconDelete from '../../../../assets/icon/icon_del.svg'

function ProductCard({ productImage, productName, productPrice, productQuantity, onClickDel, onClickEdit }: ProductProps) {
  return (
    <div className='product-card'>
      <button className="btn-del" onClick={onClickDel}>
        <img src={iconDelete} alt="Cross icon" className='icon-del' />
      </button>
      <div className="product-wrapper">
        <div className="product-img">
          <img src={productImage} alt={productName} className='img-item' />
        </div>
        <div className="product-content">
          <p className="product-name">{productName}</p>
          <div className="product-detail">
            {productPrice}
            <div className="separate"></div>
            {productQuantity} Bowls
          </div>
        </div>
      </div>
      <button className='btn-edit' onClick={onClickEdit}>
        <p className="edit-text">Edit dish</p>
      </button>
    </div>
  )
}

export default ProductCard
