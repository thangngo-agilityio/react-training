import { ProductProps } from 'interfaces/product/Product'
import iconDelete from '../../../../assets/icon/icon_del.svg'
import Button from '@components/common/button/Button'
import { memo, useCallback } from 'react'

function ProductCard({ product, onClickDel, onClickEdit }: ProductProps) {
  console.log(product)

  const onDeleteProduct = useCallback(() => {
    onClickDel(product.id)
  }, [onClickDel, product.id])

  const onEditProduct = useCallback(() => {
    onClickEdit(product)
  }, [onClickEdit, product])

  return (
    <div className='product-card'>
      <Button classButton='btn-del' onClick={onDeleteProduct} dataId={product.id} children={<img src={iconDelete} alt="Cross icon" className='icon-del' />} />
      <div className="product-wrapper">
        <div className="product-img">
          <img src={product.image} alt={product.name} className='img-item' />
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
      <Button classButton='btn-edit' onClick={onEditProduct} dataId={product.id} children={<p className='edit-text' data-id={product.id}>Edit dish</p>}></Button>
    </div>
  )
}

export default memo(ProductCard)
