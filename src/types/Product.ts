export type ProductProps = {
  product: Product;
  onDelete: (id: string) => void;
  onEdit: (product: Product) => void;
};

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  createdAt: Date;
}

export type ProductCard = Omit<Product, 'id'>;
