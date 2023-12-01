export interface ProductProps {
  product: Food
  onClickDel?: React.MouseEventHandler<HTMLButtonElement>
  onClickEdit?: React.MouseEventHandler<HTMLButtonElement>
}

export interface Food {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}
