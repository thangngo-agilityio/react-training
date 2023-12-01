export interface ProductProps {
  productImage?: string
  productName?: string
  productPrice?: number
  productQuantity?: number
  onClickDel?: React.MouseEventHandler<HTMLButtonElement>
  onClickEdit?: React.MouseEventHandler<HTMLButtonElement>
}
