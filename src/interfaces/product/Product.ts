export interface ProductProps {
  product: Product
  onClickDel?: React.MouseEventHandler<HTMLButtonElement>
  onClickEdit?: React.MouseEventHandler<HTMLButtonElement>
}

export interface Product {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export type ProductCard = Omit<Product, 'id'>
