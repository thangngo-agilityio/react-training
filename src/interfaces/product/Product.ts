export interface ProductProps {
  product: Product
  onClickDel: (productId: string) => void
  onClickEdit: (product: Product) => void
}

export interface Product {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export type ProductCard = Omit<Product, 'id'>
