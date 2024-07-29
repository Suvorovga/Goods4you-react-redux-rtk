import { IProductInCart } from "./product.model"

export interface ICartsResponse {
  carts: ICart[]
  total: number
  skip: number
  limit: number
}

export interface ICart {
  id: number
  products: IProductInCart[]
  total: number
  discountedTotal: number
  userId: number
  totalProducts: number
  totalQuantity: number
}
